var df = require('../lib/datafill');

df.execute({
	input: "../example/index.html",
	pull: true,
	adapter: "adapters/simple.js"
}, function(output) {
	console.log(output)
})
