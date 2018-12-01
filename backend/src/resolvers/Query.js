const { forwardTo } = require("prisma-binding");

const Query = {
	brands: forwardTo("db"),
	categories: forwardTo("db"),
	products: forwardTo("db"),
	productsConnection: forwardTo("db")
};

module.exports = Query;
