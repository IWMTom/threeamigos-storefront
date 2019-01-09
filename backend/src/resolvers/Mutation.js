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
	},

	async addCard(parent, args, ctx, info) {
		const { userId } = ctx.request;
		if (!userId) {
			throw new Error("You must be signed in!");
		}

		let card_type;

		if (args.number.substring(0, 1) === "4") {
			card_type = "visa";
		} else if (
			args.number.substring(0, 2).match(/^(?:5[1-5])/) ||
			args.number
				.substring(0, 4)
				.match(/^(222[1-9]|2[3-6][0-9]\d{1}|27[01][0-9]|2720)/)
		) {
			card_type = "mastercard";
		}

		return ctx.db.mutation.createCardDetail(
			{
				data: {
					card_number: args.number.replace(/\s+/g, ""),
					cardholder_name: args.name,
					expiry_date: args.expiry,
					security_code: args.security,
					type: card_type,
					user: {
						connect: { id: userId }
					}
				}
			},
			info
		);
	},

	async addAddress(parent, args, ctx, info) {
		const { userId } = ctx.request;
		if (!userId) {
			throw new Error("You must be signed in!");
		}
		return ctx.db.mutation.createUserAddress(
			{
				data: {
					house_number: args.house_number,
					street_name: args.street_name,
					city: args.city,
					county: args.county,
					postcode: args.postcode,
					user: {
						connect: { id: userId }
					}
				}
			},
			info
		);
	},

	async createOrder(parent, args, ctx, info) {
		const { userId } = ctx.request;
		if (!userId) {
			throw new Error("You must be signed in!");
		}
		const user = await ctx.db.query.user(
			{ where: { id: userId } },
			`{
				cart{
					id
					quantity
					product{
						name
						price
						id
						description
						image_url
						sale
						stock
					}
				}}`
		);

		const cardDetails = await ctx.db.query.cardDetail(
			{ where: { id: args.card_id } },
			`{ user { id } }`
		);
		if (cardDetails.user.id !== userId) {
			throw new Error("You don't own that card!");
		}

		const addressDetails = await ctx.db.query.userAddress(
			{ where: { id: args.address_id } },
			`{ user { id } }`
		);
		if (addressDetails.user.id !== userId) {
			throw new Error("You don't own that address!");
		}

		if (user.cart.length === 0) {
			throw new Error("Your cart is empty!");
			return false;
		}

		// Save current copy of product as an order product
		const orderProducts = user.cart.map(cartProduct => {
			const orderProduct = {
				quantity: cartProduct.quantity,
				user: { connect: { id: userId } },
				name: cartProduct.product.name,
				description: cartProduct.product.description,
				image_url: cartProduct.product.image_url,
				price: cartProduct.product.price,
				sale: cartProduct.product.sale
			};

			if (cartProduct.product.stock < cartProduct.quantity) {
				throw new Error("Too many items!");
			}

			return orderProduct;
		});

		// Gets total order value
		const total = user.cart.reduce((tally, cartProduct) => {
			if (!cartProduct.product) return tally;
			return tally + cartProduct.quantity * cartProduct.product.price;
		}, 0);

		const order = ctx.db.mutation.createOrder(
			{
				data: {
					products: { create: orderProducts },
					total: total,
					user: {
						connect: { id: userId }
					},
					card: {
						connect: { id: args.card_id }
					},
					address: {
						connect: { id: args.address_id }
					}
				}
			},
			info
		);

		// Updates stock on all ordered items
		const updateStockPromises = user.cart.map(async cartProduct => {
			await ctx.db.mutation.updateProduct({
				data: {
					stock: cartProduct.product.stock - cartProduct.quantity
				},
				where: {
					id: cartProduct.product.id
				}
			});
		});
		await Promise.all(updateStockPromises);

		// Clears the user's cart
		const cartProductIds = user.cart.map(cartProduct => cartProduct.id);
		await ctx.db.mutation.deleteManyCartProducts({
			where: {
				id_in: cartProductIds
			}
		});

		return order;
	}
};

module.exports = mutations;
