const { forwardTo } = require("prisma-binding");

const Query = {
	brands: forwardTo("db"),
	categories: forwardTo("db"),
	products: forwardTo("db"),
	productsConnection: forwardTo("db"),
	me(parent, args, ctx, info) {
		if (!ctx.request.userId) {
			return null;
		}

		return ctx.db.query.user(
			{
				where: { id: ctx.request.userId }
			},
			info
		);
	}
};

module.exports = Query;
