import CheckoutCartProduct from "../components/CheckoutCartProduct";
import { Link } from "../routes";
import formatMoney from "../lib/formatMoney";
import calcTotalPrice from "../lib/calcTotalPrice";
import User from "./User";

const CheckoutCart = props => (
	<User>
		{({ data: { me } }) => {
			if (!me) return null;
			return (
				<React.Fragment>
					<section id="checkout" className="card">
						{me.cart.length === 0 && (
							<div id="empty-cart">
								<img width="100" src="/static/img/cart.png" />
								<h2>Your cart is empty!</h2>
								<p>Please buy something :)</p>
							</div>
						)}

						{me.cart.length !== 0 && (
							<div id="checkout-cart-header" className="pure-g">
								<div className="product pure-u-3-8">
									<h2>Product</h2>
								</div>
								<div className="price pure-u-4-24">
									<h2>Price</h2>
								</div>
								<div className="quantity pure-u-5-24">
									<h2>Quantity</h2>
								</div>
								<div className="total pure-u-4-24">
									<h2>Total</h2>
								</div>
								<div className="pure-u-2-24" />
							</div>
						)}

						{me.cart.map(cartProduct => (
							<CheckoutCartProduct
								key={cartProduct.id}
								cartProduct={cartProduct}
							/>
						))}

						{me.cart.length !== 0 && (
							<div id="checkout-cart-total" className="pure-g">
								<div className="pure-u-18-24" />
								<div className="pure-u-6-24">
									<span>
										Total:{" "}
										<strong>
											{" "}
											{formatMoney(
												calcTotalPrice(me.cart)
											)}
										</strong>
									</span>
								</div>
							</div>
						)}
					</section>

					{me.cart.length !== 0 && (
						<div id="checkout-buttons">
							<button
								className="btn btn-pink"
								onClick={() => props.nextStep(2)}
							>
								Continue to Payment{" "}
								<i className="ic_credit-card" />
							</button>
						</div>
					)}
				</React.Fragment>
			);
		}}
	</User>
);

export default CheckoutCart;
