# TODO test by it

rread = require '../index.js'

console.log "++ Recursive rread.file ++"
rread.file '../', (file) ->
  console.log "#{file}"

console.log "++ Recursive rread.fileSync ++"
fs = rread.fileSync '../'
console.log fs

console.log "++ Recursive rread.dir ++"
rread.dir '../', (file) ->
  console.log "#{file}"

console.log "++ Recursive rread.dirSync ++"
ds = rread.dirSync '../'
console.log ds