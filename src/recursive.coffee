fs = require 'fs'
path = require 'path'

recursive =
	file: (dir, fn) ->
		for file in fs.readdirSync(dir)
			if fs.statSync( path.join(dir, file) ).isDirectory()
				arguments.callee(path.join(dir, file), fn)
			else
				fn(file)
		@
	dir: (dir, fn) ->
		for file in fs.readdirSync(dir)
			if fs.statSync( path.join(dir, file) ).isDirectory()
				fn(path.join(dir, file))
				arguments.callee(path.join(dir, file), fn)
		@


module.exports = recursive