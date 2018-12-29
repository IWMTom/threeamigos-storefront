const mutations = {
	async addToCart(parent, args, ctx, info) {
		const { userId } = ctx.request;
		if (!userId) {
			throw new Error("You must be signed in!");
		}

		const [existingCartProduct] = await ctx.db.query.cartProducts({
			where: {
				user: { id: userId },
				product: { id: args.id }
			}
		});

		if (existingCartProduct) {
			return ctx.db.mutation.updateCartProduct(
				{
					where: { id: existingCartProduct.id },
					data: { quantity: existingCartProduct.quantity + 1 }
				},
				info
			);
		}

		return ctx.db.mutation.createCartProduct(
			{
				data: {
					user: {
						connect: { id: userId }
					},
					product: {
						connect: { id: args.id }
					}
				}
			},
			info
		);
	},

	async updateCartProduct(parent, args, ctx, info) {
		const { userId } = ctx.request;
		if (!userId) {
			throw new Error("You must be signed in!");
		}

		const [existingCartProduct] = await ctx.db.query.cartProducts({
			where: {
				id: args.id
			}
		});

		const modifier = args.increment ? 1 : -1;

		// Disallow decrement if quantity is 1
		if (
			existingCartProduct &&
			!(existingCartProduct.quantity <= 1 && !args.increment)
		) {
			return ctx.db.mutation.updateCartProduct(
				{
					where: { id: existingCartProduct.id },
					data: { quantity: existingCartProduct.quantity + modifier }
				},
				info
			);
		}

		throw new Error("You don't have this product in your cart!");
	},

	async removeFromCart(parent, args, ctx, info) {
		const { userId } = ctx.request;
		if (!userId) {
			throw new Error("You must be signed in!");
		}

		const [existingCartProduct] = await ctx.db.query.cartProducts({
			where: {
				id: args.id
			}
		});

		if (existingCartProduct) {
			return ctx.db.mutation.deleteCartProduct(
				{
					where: { id: existingCartProduct.id }
				},
				info
			);
		}
	}
};

module.exports = mutations;
