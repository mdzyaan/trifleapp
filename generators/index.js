// const fs = require("fs");
// const path = require("path");

const screenGenerator = require('./screen/index.js');
// const routesGenerator = require('./routes/index.js');

module.exports = plop => {
  plop.setGenerator('screen', screenGenerator);
  plop.addHelper('curly', (object, open) => (open ? '{' : '}'));
};
