var configure = require('../index.js');

var config = configure.eval([
	'/etc/fake/config.yaml',
	__dirname + '/config.json'
], {
	application: {
		key1: "default",
		key4: "default"
	},
	data: {
		key1: "default",
		key2: "default"
	}
});

console.log(config);
