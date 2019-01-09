import Modal from "./Modal";
import Cleave from "cleave.js/react";
import ReactHtmlParser from "react-html-parser";
import gql from "graphql-tag";
import User from "./User";
import { CURRENT_USER_QUERY } from "./User";
import { Query, Mutation } from "react-apollo";

const CURRENT_USER_QUERY_WITH_ADDRESSES = gql`
	query {
		me {
			id
			addresses {
				id
				house_number
				street_name
				city
				postcode
			}
		}
	}
`;

const CREATE_ORDER_MUTATION = gql`
	mutation createOrder($card_id: String!, $address_id: String!) {
		createOrder(card_id: $card_id, address_id: $address_id) {
			products {
				id
				name
				image_url
				price
				quantity
			}

			total
		}
	}
`;

const ADD_ADDRESS_MUTATION = gql`
	mutation addAddress(
		$house_number: String!
		$street_name: String!
		$city: String!
		$county: String!
		$postcode: String!
	) {
		addAddress(
			house_number: $house_number
			street_name: $street_name
			city: $city
			county: $county
			postcode: $postcode
		) {
			id
		}
	}
`;

class CheckoutAddress extends React.Component {
	state = {
		selectedAddress: "",
		show: false,
		house_number: "",
		street_name: "",
		city: "",
		county: "",
		postcode: ""
	};

	selectAddress = e => {
		this.setState({
			selectedAddress: e.currentTarget.name
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

	validateForm() {
		if (
			this.state.house_number &&
			this.state.street_name &&
			this.state.city &&
			this.state.county &&
			this.state.postcode
		) {
			return false;
		}

		return true;
	}

	render() {
		return (
			<React.Fragment>
				<Modal
					styleClass="add-address"
					show={this.state.show}
					handleClose={this.toggleModal}
				>
					<button id="close" onClick={this.toggleModal}>
						<i className="ic_cross" />
					</button>
					<div id="add-address-content">
						<h2>Add Delivery Address</h2>

						<form>
							<div className="pure-g">
								<div id="house_number" className="pure-u-1-4">
									<label htmlFor="house_number">
										House Name / Number
									</label>
									<input
										type="text"
										name="house_number"
										id="house_number"
										onChange={this.handleChange}
									/>
								</div>
								<div id="street_name" className="pure-u-3-4">
									<label htmlFor="street_name">
										Street Name
									</label>
									<input
										type="text"
										name="street_name"
										id="street_name"
										onChange={this.handleChange}
									/>
								</div>
								<div id="city" className="pure-u-3-8">
									<label htmlFor="city">Town / City</label>
									<input
										type="text"
										name="city"
										id="city"
										onChange={this.handleChange}
									/>
								</div>
								<div id="county" className="pure-u-3-8">
									<label htmlFor="county">County</label>
									<input
										type="text"
										name="county"
										id="county"
										onChange={this.handleChange}
									/>
								</div>
								<div id="postcode" className="pure-u-1-4">
									<label htmlFor="postcode">Postcode</label>
									<input
										type="text"
										name="postcode"
										id="postcode"
										onChange={this.handleChange}
									/>
								</div>
							</div>

							<Mutation
								mutation={ADD_ADDRESS_MUTATION}
								variables={{
									house_number: this.state.house_number,
									street_name: this.state.street_name,
									city: this.state.city,
									county: this.state.county,
									postcode: this.state.postcode
								}}
								refetchQueries={[
									{
										query: CURRENT_USER_QUERY_WITH_ADDRESSES
									}
								]}
							>
								{(addAddress, { loading }) => (
									<button
										className="btn btn-pink"
										disabled={
											loading || this.validateForm()
										}
										onClick={e => {
											addAddress();
											this.toggleModal();
										}}
									>
										Add{loading && "ing"} Address
									</button>
								)}
							</Mutation>
						</form>
					</div>
				</Modal>

				<User newQuery={CURRENT_USER_QUERY_WITH_ADDRESSES}>
					{({ data: { me } }) => {
						if (!me) return null;
						return (
							<section id="checkout-address" className="card">
								<div className="pure-g">
									{me.addresses.map(address => (
										<div
											className="pure-u-1-3"
											key={address.id}
										>
											<button
												name={address.id}
												onClick={this.selectAddress}
												className={
													this.state
														.selectedAddress ===
													address.id
														? "selected"
														: ""
												}
											>
												<div>
													<div>
														<h2>
															{address.house_number +
																" " +
																address.street_name}
														</h2>
														<span>
															{address.city}
														</span>
														<span>
															{address.postcode}
														</span>
													</div>
												</div>
											</button>
										</div>
									))}
									<div className="pure-u-1-3">
										<button
											className="add"
											onClick={this.toggleModal}
										>
											<div>
												<div>
													<span>
														<i className="ic_plus" />
														Add a new delivery
														address
													</span>
												</div>
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
						onClick={() => this.props.nextStep(2)}
					>
						Back
					</button>
					<Mutation
						mutation={CREATE_ORDER_MUTATION}
						variables={{
							card_id: this.props.card_id,
							address_id: this.state.selectedAddress
						}}
						onCompleted={({ createOrder }) => {
							this.props.showSuccess(createOrder);
						}}
						onError={() => {
							this.props.showError();
						}}
						refetchQueries={[
							{
								query: CURRENT_USER_QUERY
							}
						]}
					>
						{(createOrder, { data, loading }) => (
							<button
								className="btn btn-pink"
								disabled={
									loading || this.state.selectedAddress
										? false
										: true
								}
								onClick={() => {
									createOrder();
								}}
							>
								Confirm{loading && "ing"} Order{" "}
								<i className="ic_checkmark" />
							</button>
						)}
					</Mutation>
				</div>
			</React.Fragment>
		);
	}
}

export default CheckoutAddress;
