fs = require('fs');
path = require('path');

var RecursiveRead = function() {
  this.result = [];
}

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

RecursiveRead.prototype.fileSync = function(dir, _result) {
  var files = fs.readdirSync(dir);
  var i, len, file;

  if ( ! _result ) {
    _result = this.result;
  }

  for (i = 0, len = files.length; i < len; i++) {
    file = files[i];
    if (fs.statSync(path.join(dir, file)).isDirectory()) {
      arguments.callee(path.join(dir, file), _result);
    } else {
      _result.push(path.join(dir, file));
    }
  }
  return _result;
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

RecursiveRead.prototype.dirSync = function(dir, _result) {
  var files = fs.readdirSync(dir);
  var i, len, file;

  if ( ! _result ) {
    _result = this.result;
  }

  for (i = 0, len = files.length; i < len; i++) {
    file = files[i];
    if (fs.statSync(path.join(dir, file)).isDirectory()) {
      _result.push(path.join(dir, file));
      arguments.callee(path.join(dir, file), _result);
    }
  }
  return _result;
}

module.exports = RecursiveRead;
RecursiveRead.__proto__ = new RecursiveRead;