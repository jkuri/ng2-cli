'use strict';

const fs = require('fs');

exports.existsSync = (path) => {
  try {
    fs.accessSync(path);
    return true;
  } catch (e) {
    return false;
  }
};
