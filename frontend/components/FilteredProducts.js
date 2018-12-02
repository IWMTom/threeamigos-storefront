import gql from "graphql-tag";
import { Query } from "react-apollo";
import { Link } from "../routes";
import formatMoney from "../lib/formatMoney";

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
							<Link
								route="product"
								params={{ slug: product.slug }}
							>
								<a
									className={
										product.sale
											? "product card sale"
											: "product card"
									}
									key={product.id}
								>
									{product.sale && (
										<span className="product-sale">
											Sale 50%
										</span>
									)}
									<div className="pure-g">
										<div className="pure-u-1-4">
											<img src={product.image_url} />
										</div>
										<div className="product-content pure-u-3-4">
											<h2>{product.name}</h2>
											<span>
												<i
													className={
														product.category.icon
													}
												/>
												{product.category.name}
											</span>
											<span>
												<i className="ic_bookmark" />
												{product.brand.name}
											</span>
											<p>{product.description}</p>
											<aside>
												<i
													className={
														product.stock === 0
															? "badge badge-grey"
															: product.sale
															? "badge badge-pink"
															: "badge badge-green"
													}
												>
													{product.stock === 0
														? "Out of Stock"
														: "In Stock"}
												</i>

												<span>
													{product.sale && (
														<del>
															{formatMoney(
																product.price *
																	2
															)}
														</del>
													)}
													{formatMoney(product.price)}
												</span>
											</aside>
										</div>
									</div>
								</a>
							</Link>
						))}
					</React.Fragment>
				);
			}}
		</Query>

		<button className="btn show-more">Show More</button>
	</div>
);

export default FilteredProducts;
