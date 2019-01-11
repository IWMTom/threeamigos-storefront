import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import PropTypes from "prop-types";
import { Link } from "../routes";
import formatMoney from "../lib/formatMoney";
import { CURRENT_USER_QUERY } from "./User";
import { adopt } from "react-adopt";

const UPDATE_CART_PRODUCT_MUTATION = gql`
	mutation updateCartProduct($id: ID!, $increment: Boolean!) {
		updateCartProduct(id: $id, increment: $increment) {
			id
			quantity
		}
	}
`;

const REMOVE_FROM_CART_MUTATION = gql`
	mutation removeFromCart($id: ID!) {
		removeFromCart(id: $id) {
			id
		}
	}
`;

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
			optimisticResponse={{
				__typename: "Mutation",
				removeFromCart: {
					id: id
				}
			}}
		>
			{render}
		</Mutation>
	)
});

const CartProduct = ({ cartProduct }) => (
	<li>
		<Composed id={cartProduct.id}>
			{({
				incrementCartProduct,
				decrementCartProduct,
				removeFromCart
			}) => {
				return (
					<React.Fragment>
						<button
							disabled={removeFromCart.loading}
							onClick={removeFromCart}
							className="remove"
						>
							&#120;
						</button>
						<button
							disabled={
								incrementCartProduct.loading ||
								cartProduct.product.stock <=
									cartProduct.quantity
							}
							onClick={incrementCartProduct}
							className="increase"
						>
							&#43;
						</button>
						<button
							disabled={
								decrementCartProduct.loading ||
								cartProduct.quantity === 1
							}
							onClick={decrementCartProduct}
							className="decrease"
						>
							&ndash;
						</button>
					</React.Fragment>
				);
			}}
		</Composed>

		<Link route="product" params={{ slug: cartProduct.product.slug }}>
			<a className="view-product" />
		</Link>

		<div className="pure-g">
			<div className="pure-u-1-4">
				<img src={cartProduct.product.image_url} />
			</div>
			<div className="pure-u-3-4">
				<div className="cart-item-details">
					<h2>{cartProduct.product.name}</h2>

					<span>
						<em>{cartProduct.quantity}</em> x{" "}
						{formatMoney(cartProduct.product.price)}
					</span>
				</div>
			</div>
		</div>
	</li>
);

CartProduct.propTypes = {
	cartProduct: PropTypes.object.isRequired
};

export default CartProduct;
export { UPDATE_CART_PRODUCT_MUTATION, REMOVE_FROM_CART_MUTATION };
