import CheckoutHeader from "../components/CheckoutHeader";
import CheckoutCart from "../components/CheckoutCart";
import CheckoutPayment from "../components/CheckoutPayment";
import CheckoutAddress from "../components/CheckoutAddress";
import CheckoutConfirmation from "../components/CheckoutConfirmation";
import CheckoutError from "../components/CheckoutError";

class Checkout extends React.Component {
	state = {
		step: 1,
		payment_id: "",
		order_data: ""
	};

	nextStep = newStep => {
		this.setState({
			step: newStep
		});
	};

	updatePayment = payment_id => {
		this.setState({
			payment_id: payment_id
		});
	};

	showError = () => {
		this.setState({
			step: -1
		});
	};

	showSuccess = data => {
		this.setState({
			step: 4,
			order_data: data
		});
	};

	renderStep() {
		switch (this.state.step) {
			case 1:
				return <CheckoutCart nextStep={this.nextStep} />;
			case 2:
				return (
					<CheckoutPayment
						nextStep={this.nextStep}
						updatePayment={this.updatePayment}
					/>
				);
			case 3:
				return (
					<CheckoutAddress
						nextStep={this.nextStep}
						card_id={this.state.payment_id}
						showError={this.showError}
						showSuccess={this.showSuccess}
					/>
				);
			case 4:
				return (
					<CheckoutConfirmation order_data={this.state.order_data} />
				);
			case -1:
				return <CheckoutError />;
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
