# TODO test by it

rread = require '../index.js'

console.log "++ Recursive readdir.file ++"
rread.file '../', (file) ->
  console.log "#{file}"

console.log "++ Recursive readdir.fileSync ++"
fs = rread.fileSync '../'
console.log fs

console.log "++ Recursive readdir.dir ++"
rread.dir '../', (file) ->
  console.log "#{file}"

console.log "++ Recursive readdir.dirSync ++"
ds = rread.dirSync '../'
console.log ds
