var configure = require('../index.js');

var config = configure.eval([
	'/etc/fake/config.yaml',
	__dirname + '/config.json'
]);

console.log(config);
