/**
 * Screen Generator
 */

const screenExists = require('../utils/screenExists');

module.exports = {
  description: 'Add a screen ',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'What should it be called?',
      default: 'Form',
      validate: value => {
        if (/.+/.test(value)) {
          return screenExists(value)
            ? 'A component or screen with this name already exists'
            : true;
        }

        return 'The name is required';
      },
    },
  ],
  actions: data => {
    const actions = [
      {
        type: 'add',
        path: '../src/screens/{{properCase name}}/index.js',
        templateFile: './screen/index.js.hbs',
        abortOnFail: true,
      },
    ];

    // If they want actions and a reducer, generate actions.js, constants.js,
    // reducer.js and the corresponding tests for actions and the reducer
      // Actions
      actions.push({
        type: 'add',
        path: '../src/screens/{{properCase name}}/actions.js',
        templateFile: './screen/actions.js.hbs',
        abortOnFail: true,
      });

      // Constants
      actions.push({
        type: 'add',
        path: '../src/screens/{{properCase name}}/constants.js',
        templateFile: './screen/constants.js.hbs',
        abortOnFail: true,
      });

      // Selectors
      actions.push({
        type: 'add',
        path: '../src/screens/{{properCase name}}/selectors.js',
        templateFile: './screen/selectors.js.hbs',
        abortOnFail: true,
      });

      // Reducer
      actions.push({
        type: 'add',
        path: '../src/screens/{{properCase name}}/reducer.js',
        templateFile: './screen/reducer.js.hbs',
        abortOnFail: true,
      });



    return actions;
  },
};
