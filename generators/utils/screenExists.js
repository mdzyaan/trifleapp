/**
 * screenExists
 *
 * Check whether the given component exist in either the components or containers directory
 */

const fs = require('fs');
const path = require('path');

const screens = fs.readdirSync(path.join(__dirname, '../../src/screens'));

function screenExists(comp) {
  return screens.indexOf(comp) >= 0;
}

module.exports = screenExists;
