import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import User from "./User";
import CartProduct from "./CartProduct";
import calcTotalPrice from "../lib/calcTotalPrice";
import formatMoney from "../lib/formatMoney";

const LOCAL_STATE_QUERY = gql`
	query {
		cartOpen @client
	}
`;

const TOGGLE_CART_MUTATION = gql`
	mutation {
		toggleCart @client
	}
`;

const Cart = () => (
	<User>
		{({ data: { me } }) => {
			if (!me) return null;
			return (
				<Mutation mutation={TOGGLE_CART_MUTATION}>
					{toggleCart => (
						<Query query={LOCAL_STATE_QUERY}>
							{({ data }) => (
								<React.Fragment>
									<div
										id="blackout"
										className={
											data.cartOpen ? "visible" : ""
										}
										onClick={toggleCart}
									/>
									<div
										id="cart"
										className={
											data.cartOpen ? "visible" : ""
										}
									>
										<button onClick={toggleCart}>X</button>
										<h1>Shopping Cart</h1>
										<ul>
											{me.cart.map(cartProduct => (
												<CartProduct
													key={cartProduct.id}
													cartProduct={cartProduct}
												/>
											))}
										</ul>

										{me.cart.length > 0 && (
											<span>
												Total:{" "}
												<strong>
													{formatMoney(
														calcTotalPrice(me.cart)
													)}
												</strong>
											</span>
										)}

										{me.cart.length === 0 && (
											<div id="empty-cart">
												<img
													width="100"
													src="/static/img/cart.png"
												/>
												<h2>Your cart is empty!</h2>
												<p>Please buy something :)</p>
											</div>
										)}
									</div>
								</React.Fragment>
							)}
						</Query>
					)}
				</Mutation>
			);
		}}
	</User>
);

export default Cart;
export { LOCAL_STATE_QUERY, TOGGLE_CART_MUTATION };
