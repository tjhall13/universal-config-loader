var yaml = require('yaml');
var path = require('path');
var fs = require('fs');

var parsers = {
	json: JSON.parse.bind(JSON),
	yaml: yaml.eval.bind(yaml)
};

function merge(current, update) {
	if(current && update) {
		if(typeof current == 'object' && typeof update == 'object') {
			if(Array.isArray(current)) {
				return current.concat(update);
			} else {
				var output = { };
				for(var prop in current) {
					output[prop] = merge(current[prop], update[prop]);
				}
				for(var prop in update) {
					output[prop] = merge(current[prop], update[prop]);
				}
				return output;
			}
		} else {
			return update || current;
		}
	} else {
		return update || current;
	}
}

function eval(prec) {
	return prec.reduce(function(config, file) {
		var data;

		try {
			var str = fs.readFileSync(file, { encoding: 'utf8' });
			var filetype = path.extname(file).substr(1);
			if(parsers[filetype]) {
				data = parsers[filetype](str);
			} else {
				throw new Error('Unknown file extension: ' + filetype);
			}
		} catch(e) {
			console.error('Failed to read from file: ' + file + ' (' + e.message + ')');
		} finally {
			return merge(config, data);
		}
	}, { });
}

module.exports = {
	eval: eval,
	merge: merge,
	parsers: parsers
};
