const CheckoutPayment = props => (
	<React.Fragment>
		<h1>Payment Method</h1>
		<button onClick={() => props.nextStep(1)}>Back</button>
	</React.Fragment>
);

export default CheckoutPayment;
