import gql from "graphql-tag";
import { Query } from "react-apollo";
import { Link } from "../routes";
import formatMoney from "../lib/formatMoney";
import FilteredProductCard from "./FilteredProductCard";

const FILTERED_PRODUCTS_QUERY = gql`
	query FILTERED_PRODUCTS_QUERY(
		$first: Int = 6
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
	}
`;

const FilteredProducts = props => (
	<div id="sorted-products">
		<Query
			query={FILTERED_PRODUCTS_QUERY}
			variables={{
				orderBy: props.sort_type,
				where: {
					AND: {
						...(props.category !== "all-categories" && {
							category: {
								id: props.category
							}
						}),
						...(props.brand !== "all-brands" && {
							brand: {
								id: props.brand
							}
						}),
						price_gte: props.min_price,
						price_lte: props.max_price
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
					</React.Fragment>
				);
			}}
		</Query>

		<button className="btn show-more">Show More</button>
	</div>
);

export default FilteredProducts;
