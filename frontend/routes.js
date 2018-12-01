const routes = require("next-routes");

module.exports = routes()
	.add("brand", "/brand/:slug")
	.add("category", "/category/:slug")
	.add("product", "/product/:slug");
