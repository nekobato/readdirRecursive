fs = require('fs');
path = require('path');

var RecursiveRead = function() {}

RecursiveRead.prototype.file = function(dir, callback) {
  var selfArgs = arguments;

  fs.readdir(dir, function(err, files) {
    var i, len, file;
    for (i = 0, len = files.length; i < len; i++) {
      file = files[i];
      if (fs.statSync(path.join(dir, file)).isDirectory()) {
        selfArgs.callee(path.join(dir, file), callback);
      } else {
        callback(path.join(dir, file));
      }
    }
  });
}

RecursiveRead.prototype.fileSync = function(dir) {
  var result = [];

  (function(dir) {
    var files = fs.readdirSync(dir);
    var _i, _len;
    for (_i = 0, _len = files.length; _i < _len; _i++) {
      if (!files[_i]) {
        arguments.callee(path.join(dir, files[_i]));
      }
      if (fs.statSync(path.join(dir, files[_i])).isDirectory()) {
        arguments.callee(path.join(dir, files[_i]));
      } else {
        result.push(path.join(dir, files[_i]));
      }
    }
  }).call(this, dir);

  return result;
}

RecursiveRead.prototype.dir = function(dir, callback) {
  var selfArgs = arguments;

  fs.readdir(dir, function(err, files) {
    var i, len, file;
    for (i = 0, len = files.length; i < len; i++) {
      file = files[i];
      if (fs.statSync(path.join(dir, file)).isDirectory()) {
        callback(path.join(dir, file));
        selfArgs.callee(path.join(dir, file), callback);
      }
    }
  });
}

RecursiveRead.prototype.dirSync = function(dir) {
  var result = [];

  (function(dir) {
    var files = fs.readdirSync(dir);
    var _i, _len;
    for (_i = 0, _len = files.length; _i < _len; _i++) {
      if (!files[_i]) {
        arguments.callee(path.join(dir, files[_i]));
      }
      if (fs.statSync(path.join(dir, files[_i])).isDirectory()) {
        result.push(path.join(dir, files[_i]));
        arguments.callee(path.join(dir, files[_i]));
      }
    }
  }).call(this, dir);

  return result;
}

module.exports = RecursiveRead;
RecursiveRead.__proto__ = new RecursiveRead;