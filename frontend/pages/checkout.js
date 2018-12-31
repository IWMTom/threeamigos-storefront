import CheckoutHeader from "../components/CheckoutHeader";
import CheckoutCart from "../components/CheckoutCart";
import CheckoutPayment from "../components/CheckoutPayment";

class Checkout extends React.Component {
	state = {
		step: 1
	};

	nextStep = newStep => {
		this.setState({
			step: newStep
		});
	};

	renderStep() {
		switch (this.state.step) {
			case 1:
				return <CheckoutCart nextStep={this.nextStep} />;
			case 2:
				return <CheckoutPayment nextStep={this.nextStep} />;
			default:
				return null;
		}
	}

	render() {
		return (
			<React.Fragment>
				<CheckoutHeader step={this.state.step} />
				<div className="container">{this.renderStep()}</div>
			</React.Fragment>
		);
	}
}

export default Checkout;
