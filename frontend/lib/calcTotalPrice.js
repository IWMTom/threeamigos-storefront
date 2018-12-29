export default function calcTotalPrice(cart) {
	return cart.reduce((tally, cartProduct) => {
		if (!cartProduct.product) return tally;
		return tally + cartProduct.quantity * cartProduct.product.price;
	}, 0);
}
