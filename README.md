# Universal Configuration Loader

Universal configuration loader for json and yaml data types. loaded from first to last in order setting precedence to the last in order.

## Example

```
var configure = require('universal-config-loader');

var config = configure.eval([
	'/etc/myapp/config.yaml',
	'/home/me/.myapp/config.json',
	'./config.json'
]);

console.log(config);
```
