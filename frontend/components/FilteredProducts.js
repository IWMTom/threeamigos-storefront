import gql from "graphql-tag";
import { Query } from "react-apollo";
import { Link } from "../routes";
import formatMoney from "../lib/formatMoney";
import FilteredProductCard from "./FilteredProductCard";

const FILTERED_PRODUCTS_QUERY = gql`
	query FILTERED_PRODUCTS_QUERY(
		$first: Int
		$orderBy: ProductOrderByInput
		$where: ProductWhereInput
	) {
		products(first: $first, orderBy: $orderBy, where: $where) {
			id
			name
			description
			image_url
			price
			stock
			brand {
				name
			}
			category {
				icon
				name
			}
			slug
			sale
		}
		productsConnection {
			aggregate {
				count
			}
		}
	}
`;

class FilteredProducts extends React.Component {
	state = {
		numOfProducts: 5
	};

	showMore = () => {
		this.setState({ numOfProducts: this.state.numOfProducts + 5 });
	};

	render() {
		return (
			<div id="sorted-products">
				<Query
					query={FILTERED_PRODUCTS_QUERY}
					variables={{
						first: this.state.numOfProducts,
						orderBy: this.props.sort_type,
						where: {
							AND: {
								...(this.props.category !==
									"all-categories" && {
									category: {
										id: this.props.category
									}
								}),
								...(this.props.brand !== "all-brands" && {
									brand: {
										id: this.props.brand
									}
								}),
								price_gte: this.props.min_price,
								price_lte: this.props.max_price
							}
						}
					}}
				>
					{({ data, error, loading }) => {
						if (loading) return <p>Loading...</p>;
						if (error) return <p>Error: {error.message}</p>;

						return (
							<React.Fragment>
								{data.products.map(product => (
									<FilteredProductCard
										key={product.id}
										product={product}
									/>
								))}

								{data.productsConnection.aggregate.count >
									this.state.numOfProducts && (
									<button
										className="btn show-more"
										onClick={this.showMore}
									>
										Show More
									</button>
								)}
							</React.Fragment>
						);
					}}
				</Query>
			</div>
		);
	}
}

export default FilteredProducts;
