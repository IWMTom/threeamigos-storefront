import formatMoney from "../lib/formatMoney";
import {
	UPDATE_CART_PRODUCT_MUTATION,
	REMOVE_FROM_CART_MUTATION
} from "./CartProduct";
import { CURRENT_USER_QUERY } from "./User";
import { adopt } from "react-adopt";
import { Mutation } from "react-apollo";

const Composed = adopt({
	incrementCartProduct: ({ render, id }) => (
		<Mutation
			mutation={UPDATE_CART_PRODUCT_MUTATION}
			variables={{
				id: id,
				increment: true
			}}
			refetchQueries={[
				{
					query: CURRENT_USER_QUERY
				}
			]}
		>
			{render}
		</Mutation>
	),
	decrementCartProduct: ({ render, id }) => (
		<Mutation
			mutation={UPDATE_CART_PRODUCT_MUTATION}
			variables={{
				id: id,
				increment: false
			}}
			refetchQueries={[
				{
					query: CURRENT_USER_QUERY
				}
			]}
		>
			{render}
		</Mutation>
	),
	removeFromCart: ({ render, id }) => (
		<Mutation
			mutation={REMOVE_FROM_CART_MUTATION}
			variables={{ id: id }}
			refetchQueries={[{ query: CURRENT_USER_QUERY }]}
		>
			{render}
		</Mutation>
	)
});

const CheckoutCartProduct = ({ cartProduct }) => (
	<Composed id={cartProduct.id}>
		{({ incrementCartProduct, decrementCartProduct, removeFromCart }) => {
			return (
				<div className="checkout-cart-row pure-g">
					<div className="product pure-u-3-8">
						<img src={cartProduct.product.image_url} />
						<span>{cartProduct.product.name}</span>
					</div>
					<div className="price pure-u-4-24">
						<span>{formatMoney(cartProduct.product.price)}</span>
					</div>
					<div className="quantity pure-u-5-24">
						<div className="quantity-picker">
							<button
								onClick={decrementCartProduct}
								disabled={
									decrementCartProduct.loading ||
									cartProduct.quantity === 1
								}
							>
								&ndash;
							</button>
							<em>{cartProduct.quantity}</em>
							<button
								disabled={incrementCartProduct.loading}
								onClick={incrementCartProduct}
							>
								&#43;
							</button>
						</div>
					</div>
					<div className="total pure-u-4-24">
						<span>
							{formatMoney(
								cartProduct.product.price * cartProduct.quantity
							)}
						</span>
					</div>
					<div className="remove pure-u-2-24">
						<button
							disabled={removeFromCart.loading}
							onClick={removeFromCart}
						>
							&#120;
						</button>
					</div>
				</div>
			);
		}}
	</Composed>
);

export default CheckoutCartProduct;
