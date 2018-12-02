import ProductHeader from "../components/ProductHeader";
import ProductSort from "../components/ProductSort";
import ProductFilter from "../components/ProductFilter";
import FilteredProducts from "../components/FilteredProducts";

class Products extends React.Component {
	state = {
		min_price: 0,
		max_price: 25000,
		category: this.props.category
			? this.props.category.id
			: "all-categories",
		brand: this.props.brand ? this.props.brand.id : "all-brands",
		sort_type: "name_ASC"
	};

	updatePriceValues = sliderState => {
		this.setState({
			min_price: sliderState.values[0] * 100,
			max_price: sliderState.values[1] * 100
		});
	};

	updateValue = e => {
		this.setState({
			[e.target.name]: e.target.id
		});
	};

	render() {
		return (
			<React.Fragment>
				<ProductHeader
					title={
						this.props.brand
							? this.props.brand.name
							: this.props.category.name
					}
					icon={this.props.category ? this.props.category.icon : ""}
				/>

				<div className="container">
					<section id="products">
						<div className="pure-g">
							<div className="pure-u-3-4">
								<ProductSort
									updateValue={this.updateValue}
									sort_type={this.state.sort_type}
								/>

								<FilteredProducts
									min_price={this.state.min_price}
									max_price={this.state.max_price}
									category={this.state.category}
									brand={this.state.brand}
									sort_type={this.state.sort_type}
								/>
							</div>
							<div className="pure-u-1-4">
								<ProductFilter
									updateValue={this.updateValue}
									updatePriceValues={this.updatePriceValues}
									category={this.state.category}
									brand={this.state.brand}
								/>
							</div>
						</div>
					</section>
				</div>
			</React.Fragment>
		);
	}
}

export default Products;
