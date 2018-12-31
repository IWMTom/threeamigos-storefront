const CheckoutHeader = props => (
	<React.Fragment>
		<div className="page-header">
			<div className="container">
				<h1>
					<i className="ic_shopping_cart" />
					<span>Checkout</span>
				</h1>
			</div>
		</div>
		<div id="checkout-steps">
			<div className="container">
				<div className="pure-g">
					<div className="pure-u-1-4">
						<div
							className={
								props.step == 1
									? "checkout-step done"
									: "checkout-step"
							}
						>
							<i className="ic_shopping_cart" />
							<div>
								<span>Step 1</span>
								<p>Shopping Cart</p>
							</div>
						</div>
					</div>
					<div className="pure-u-1-4">
						<div
							className={
								props.step == 2
									? "checkout-step done"
									: "checkout-step"
							}
						>
							<i className="ic_credit-card" />
							<div>
								<span>Step 2</span>
								<p>Payment Method</p>
							</div>
						</div>
					</div>
					<div className="pure-u-1-4">
						<div
							className={
								props.step == 3
									? "checkout-step done"
									: "checkout-step"
							}
						>
							<i className="ic_truck" />
							<div>
								<span>Step 3</span>
								<p>Delivery Address</p>
							</div>
						</div>
					</div>
					<div className="pure-u-1-4">
						<div
							className={
								props.step == 4
									? "checkout-step done"
									: "checkout-step"
							}
						>
							<i className="ic_checkmark" />
							<div>
								<span>Step 4</span>
								<p>Confirmation</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</React.Fragment>
);

export default CheckoutHeader;
