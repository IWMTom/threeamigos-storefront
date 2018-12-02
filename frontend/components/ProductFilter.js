import "rheostat/initialize";
import Rheostat from "rheostat";
import formatMoney from "../lib/formatMoney";
import gql from "graphql-tag";
import { Query } from "react-apollo";

const ALL_CATEGORIES_QUERY = gql`
	query ALL_CATEGORIES_QUERY($first: Int = 5) {
		categories(first: $first) {
			id
			name
		}
	}
`;

const ALL_BRANDS_QUERY = gql`
	query ALL_BRANDS_QUERY($first: Int = 5) {
		brands(first: $first) {
			id
			name
		}
	}
`;

class ProductFilter extends React.Component {
	state = {
		min_price: 0,
		max_price: 15000
	};

	updatePriceLabels = sliderState => {
		this.setState({
			min_price: sliderState.values[0] * 100,
			max_price: sliderState.values[1] * 100
		});
	};

	render() {
		return (
			<div id="products-filter" className="card">
				<article>
					<h3>Price</h3>
					<Rheostat
						min={0}
						max={150}
						values={[
							this.state.min_price / 100,
							this.state.max_price / 100
						]}
						onChange={this.props.updatePriceValues}
						onValuesUpdated={this.updatePriceLabels}
					/>
					<div id="price-display">
						<span id="minimum">
							{formatMoney(this.state.min_price)}
						</span>
						<span id="maximum">
							{formatMoney(this.state.max_price)}
						</span>
					</div>
				</article>
				<hr />
				<article>
					<h3>Category</h3>
					<div className="radio-inputs">
						<div className="radio">
							<input
								id="all-categories"
								name="category"
								type="radio"
								onChange={this.props.updateValue}
								checked={
									this.props.category === "all-categories"
								}
							/>
							<label
								htmlFor="all-categories"
								className="radio-label"
							>
								All
							</label>
						</div>

						<Query query={ALL_CATEGORIES_QUERY}>
							{({ data, error, loading }) => {
								if (loading) return <p>Loading...</p>;
								if (error) return <p>Error: {error.message}</p>;

								return (
									<React.Fragment>
										{data.categories.map(category => (
											<div
												className="radio"
												key={category.id}
											>
												<input
													id={category.id}
													name="category"
													type="radio"
													onChange={
														this.props.updateValue
													}
													checked={
														this.props.category ===
														category.id
													}
												/>
												<label
													htmlFor={category.id}
													className="radio-label"
												>
													{category.name}
												</label>
											</div>
										))}
									</React.Fragment>
								);
							}}
						</Query>
					</div>
				</article>
				<hr />
				<article>
					<h3>Brand</h3>
					<div className="radio-inputs">
						<div className="radio">
							<input
								id="all-brands"
								name="brand"
								type="radio"
								onChange={this.props.updateValue}
								checked={this.props.brand === "all-brands"}
							/>
							<label htmlFor="all-brands" className="radio-label">
								All
							</label>
						</div>

						<Query query={ALL_BRANDS_QUERY}>
							{({ data, error, loading }) => {
								if (loading) return <p>Loading...</p>;
								if (error) return <p>Error: {error.message}</p>;
								return (
									<React.Fragment>
										{data.brands.map(brand => (
											<div
												className="radio"
												key={brand.id}
											>
												<input
													id={brand.id}
													name="brand"
													type="radio"
													onChange={
														this.props.updateValue
													}
													checked={
														this.props.brand ===
														brand.id
													}
												/>
												<label
													htmlFor={brand.id}
													className="radio-label"
												>
													{brand.name}
												</label>
											</div>
										))}
									</React.Fragment>
								);
							}}
						</Query>
					</div>
				</article>
			</div>
		);
	}
}

export default ProductFilter;
