Readdir recursive
=================

Readdir recursively to output files or dirs.

# How to use

require

```js
rread = require('readdir-recursive');
```

### Readfiles

Callback operates each files.

```js
rread.file('./', function(file) {
  console.log(file);
}
```

### ReadfilesSync

Returns all files;

```js
files = rread.fileSync('./');
```

### ReaddirsSync

Callback operates each dirs.

```js
rread.dir('./', function(dir) {
  console.log(dir);
}
```

### ReaddirsSync

Returns all dirs;

```js
dirs = rread.dirSync('./');
```
