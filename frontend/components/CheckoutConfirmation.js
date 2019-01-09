import formatMoney from "../lib/formatMoney";

const CheckoutConfirmation = props => (
	<section id="checkout-confirmation" className="card">
		<img src="/static/img/receipt.png" width="80" />
		<h1>Your order is confirmed!</h1>
		<p>Here's a reminder of what you've bought...</p>

		<div id="receipt">
			{props.order_data.products.map(orderProduct => (
				<div className="pure-g" key={orderProduct.id}>
					<div className="pure-u-1-4">
						<img src={orderProduct.image_url} />
					</div>
					<div className="pure-u-1-2">
						<span>{orderProduct.name}</span>
					</div>
					<div className="pure-u-1-8">
						<span>
							<b>{orderProduct.quantity}</b> x{" "}
							{formatMoney(orderProduct.price)}
						</span>
					</div>
					<div className="pure-u-1-8">
						<strong>
							{formatMoney(
								orderProduct.price * orderProduct.quantity
							)}
						</strong>
					</div>
				</div>
			))}

			<span>
				Total: <strong>{formatMoney(props.order_data.total)}</strong>
			</span>
		</div>
	</section>
);

export default CheckoutConfirmation;
