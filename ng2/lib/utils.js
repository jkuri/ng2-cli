'use strict';

let spinner = require('simple-spinner');

exports.startSpinner = () => {
  spinner.start(100, { 
    hideCursor: true
  });
};

exports.stopSpinner = () => {
  spinner.stop();
};

