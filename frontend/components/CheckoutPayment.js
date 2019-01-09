import Modal from "./Modal";
import Cleave from "cleave.js/react";
import ReactHtmlParser from "react-html-parser";
import gql from "graphql-tag";
import User from "./User";
import { Query, Mutation } from "react-apollo";

const CURRENT_USER_QUERY_WITH_CARDS = gql`
	query {
		me {
			id
			cardDetails {
				id
				card_number
				cardholder_name
				expiry_date
				security_code
				type
			}
		}
	}
`;

const ADD_CARD_MUTATION = gql`
	mutation addCard(
		$number: String!
		$name: String!
		$expiry: String!
		$security: String!
	) {
		addCard(
			number: $number
			name: $name
			expiry: $expiry
			security: $security
		) {
			id
		}
	}
`;

class CheckoutPayment extends React.Component {
	state = {
		selectedCard: "",
		show: false,
		card_number: "",
		cardholder_name: "",
		expiry_date: "",
		security_code: ""
	};

	selectCard = e => {
		this.setState({
			selectedCard: e.currentTarget.name
		});
	};

	toggleModal = () => {
		this.setState({ show: this.state.show ? false : true });
	};

	handleChange = e => {
		const { name, type, value } = e.target;
		const val = type == "number" ? parseFloat(value) : value;
		this.setState({ [name]: val });
	};

	formatCardNumberSegment(segment) {
		var output = "";

		var length = segment ? segment.length : 0;

		for (var i = length; i < 4; i++) {
			output += "<i>&bull;</i>";
		}

		return ReactHtmlParser(segment ? segment + output : output);
	}

	formatCardNumber(cardNumber) {
		const parts = cardNumber.split(" ");

		return (
			<React.Fragment>
				<em>{this.formatCardNumberSegment(parts[0])}</em>
				<em>{this.formatCardNumberSegment(parts[1])}</em>
				<em>{this.formatCardNumberSegment(parts[2])}</em>
				<strong>{this.formatCardNumberSegment(parts[3])}</strong>
			</React.Fragment>
		);
	}

	getCardType(cardNumber) {
		// First few characters indicate issuing network
		// https://en.wikipedia.org/wiki/Payment_card_number#Issuer_identification_number_(IIN)
		if (cardNumber.substring(0, 1) === "4") {
			return "credit-card visa";
		} else if (
			cardNumber.substring(0, 2).match(/^(?:5[1-5])/) ||
			cardNumber
				.substring(0, 4)
				.match(/^(222[1-9]|2[3-6][0-9]\d{1}|27[01][0-9]|2720)/)
		) {
			return "credit-card mastercard";
		} else {
			return "credit-card";
		}
	}

	validateForm() {
		if (
			this.state.card_number
				.replace(/\s/g, "")
				.match(
					/^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/
				)
		) {
			if (this.state.cardholder_name !== "") {
				if (this.state.security_code.length === 3) {
					const expiry = new Date();
					expiry.setFullYear(
						20 + this.state.expiry_date.substring(3, 5),
						this.state.expiry_date.substring(0, 2),
						1
					);

					if (expiry > new Date()) {
						return false;
					}
				}
			}
		}

		return true;
	}

	render() {
		return (
			<React.Fragment>
				<Modal
					styleClass="add-card"
					show={this.state.show}
					handleClose={this.toggleModal}
				>
					<button id="close" onClick={this.toggleModal}>
						<i className="ic_cross" />
					</button>
					<div className="pure-g">
						<div id="add-card-content" className="pure-u-13-24">
							<h2>Add Payment Method</h2>

							<form>
								<div className="pure-g">
									<div id="card_number" className="pure-u-1">
										<label htmlFor="card_number">
											Card Number
										</label>
										<Cleave
											options={{ creditCard: true }}
											name="card_number"
											id="card_number"
											onChange={this.handleChange}
										/>
									</div>
									<div
										id="cardholder_name"
										className="pure-u-1"
									>
										<label htmlFor="cardholder_name">
											Cardholder Name
										</label>
										<input
											type="text"
											name="cardholder_name"
											id="cardholder_name"
											maxLength="22"
											onChange={this.handleChange}
										/>
									</div>
									<div
										id="expiry_date"
										className="pure-u-1-2"
									>
										<label htmlFor="expiry_date">
											Expiry Date
										</label>
										<Cleave
											options={{
												date: true,
												datePattern: ["m", "y"]
											}}
											name="expiry_date"
											id="expiry_date"
											onChange={this.handleChange}
										/>
									</div>
									<div
										id="security_code"
										className="pure-u-1-2"
									>
										<label htmlFor="security_code">
											Security Code (CVV2)
										</label>
										<Cleave
											options={{
												numeral: true,
												stripLeadingZeroes: false
											}}
											name="security_code"
											id="security_code"
											maxLength="3"
											onChange={this.handleChange}
										/>
									</div>
								</div>
							</form>
						</div>
						<div id="add-card-sidebar" className="pure-u-11-24">
							<div
								className={this.getCardType(
									this.state.card_number
								)}
							>
								<div>
									<span>
										{this.formatCardNumber(
											this.state.card_number
										)}
									</span>

									<div>
										<span>Card Holder</span>
										<strong>
											{this.state.cardholder_name}
										</strong>
									</div>

									<div>
										<span>Expiry</span>
										<strong>
											{this.state.expiry_date}
										</strong>
									</div>
								</div>
							</div>
							<Mutation
								mutation={ADD_CARD_MUTATION}
								variables={{
									number: this.state.card_number,
									name: this.state.cardholder_name,
									expiry: this.state.expiry_date,
									security: this.state.security_code
								}}
								refetchQueries={[
									{
										query: CURRENT_USER_QUERY_WITH_CARDS
									}
								]}
							>
								{(addCard, { loading }) => (
									<button
										className="btn btn-pink"
										disabled={
											loading || this.validateForm()
										}
										onClick={e => {
											addCard();
											this.toggleModal();
										}}
									>
										Add{loading && "ing"} Card
									</button>
								)}
							</Mutation>
						</div>
					</div>
				</Modal>

				<User newQuery={CURRENT_USER_QUERY_WITH_CARDS}>
					{({ data: { me } }) => {
						if (!me) return null;
						return (
							<section id="checkout-payment" className="card">
								<div className="pure-g">
									{me.cardDetails.map(card => (
										<div
											key={card.id}
											className="pure-u-1-3"
										>
											<button
												name={card.id}
												className={
													this.state.selectedCard !==
													""
														? this.state
																.selectedCard ===
														  card.id
															? "credit-card " +
															  card.type +
															  " selected"
															: "credit-card " +
															  card.type +
															  " not-selected"
														: "credit-card " +
														  card.type
												}
												onClick={this.selectCard}
											>
												<div className="blackout" />
												<div className="selected">
													<span>SELECTED</span>
												</div>

												<div>
													<span>
														<em>
															&bull;&bull;&bull;&bull;
														</em>
														<em>
															&bull;&bull;&bull;&bull;
														</em>
														<em>
															&bull;&bull;&bull;&bull;
														</em>
														<strong>
															{card.card_number.slice(
																-4
															)}
														</strong>
													</span>

													<div>
														<span>Card Holder</span>
														<strong>
															{
																card.cardholder_name
															}
														</strong>
													</div>

													<div>
														<span>Expiry</span>
														<strong>
															{card.expiry_date}
														</strong>
													</div>
												</div>
											</button>
										</div>
									))}
									<div className="pure-u-1-3">
										<button
											className="credit-card add"
											onClick={this.toggleModal}
										>
											<div>
												<span>
													<i className="ic_plus" />
													Add a new payment method
												</span>
											</div>
										</button>
									</div>
								</div>
							</section>
						);
					}}
				</User>

				<div id="checkout-buttons">
					<button
						className="btn show-more"
						onClick={() => this.props.nextStep(1)}
					>
						Back
					</button>
					<button
						className="btn btn-pink"
						disabled={this.state.selectedCard ? false : true}
						onClick={() => {
							this.props.nextStep(3);
							this.props.updatePayment(this.state.selectedCard);
						}}
					>
						Continue to Delivery <i className="ic_truck" />
					</button>
				</div>
			</React.Fragment>
		);
	}
}

export default CheckoutPayment;
