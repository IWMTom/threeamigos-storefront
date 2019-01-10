import React, { Component } from "react";
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import Head from "next/head";
import formatMoney from "../lib/formatMoney";
import { CURRENT_USER_QUERY } from "./User";
import { TOGGLE_CART_MUTATION } from "./Cart";

const SINGLE_PRODUCT_QUERY = gql`
	query SINGLE_PRODUCT_QUERY($slug: String, $first: Int = 1) {
		products(first: $first, where: { slug: $slug }) {
			id
			name
			image_url
			description
			price
			sale
			stock
			category {
				name
				icon
			}
			brand {
				name
			}
		}
	}
`;

const ADD_TO_CART_MUTATION = gql`
	mutation addToCart($id: ID!) {
		addToCart(id: $id) {
			id
			quantity
		}
	}
`;

class SingleProduct extends Component {
	render() {
		return (
			<Query
				query={SINGLE_PRODUCT_QUERY}
				variables={{
					slug: this.props.slug
				}}
			>
				{({ data, error, loading }) => {
					if (loading) return <p>Loading...</p>;
					if (error)
						return (
							<p data-test="graphql-error">
								Error: {error.message}
							</p>
						);
					const product = data.products[0];
					return (
						<React.Fragment>
							<Head>
								<title>{product.name} - Three Amigos</title>
							</Head>
							<div
								id="product-card"
								className={product.sale ? "card sale" : "card"}
							>
								{product.sale && (
									<span className="product-sale">
										Sale 50%
									</span>
								)}
								<div className="pure-g">
									<div className="pure-u-1-2">
										<img
											src={product.image_url}
											alt={product.name}
										/>
									</div>
									<div className="pure-u-1-2">
										<h1>{product.name}</h1>
										<div>
											<span id="category">
												<i
													className={
														product.category.icon
													}
												/>
												{product.category.name}
											</span>
											<span id="brand">
												<i className="ic_bookmark" />
												{product.brand.name}
											</span>
											<div className="clearfix" />
											<aside>
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
										<p>{product.description}</p>
										<div>
											{product.stock > 0 && (
												<React.Fragment>
													<span className="stock-level">
														<strong>
															{product.stock}
														</strong>{" "}
														left in stock
													</span>

													<Mutation
														mutation={
															TOGGLE_CART_MUTATION
														}
													>
														{toggleCart => (
															<Mutation
																mutation={
																	ADD_TO_CART_MUTATION
																}
																variables={{
																	id:
																		product.id
																}}
																refetchQueries={[
																	{
																		query: CURRENT_USER_QUERY
																	}
																]}
															>
																{(
																	addToCart,
																	{ loading }
																) => (
																	<button
																		disabled={
																			loading
																		}
																		onClick={e => {
																			addToCart();
																			toggleCart();
																		}}
																		className="btn btn-pink"
																	>
																		Add
																		{loading &&
																			"ing"}{" "}
																		to Cart
																	</button>
																)}
															</Mutation>
														)}
													</Mutation>
												</React.Fragment>
											)}

											{product.stock == 0 && (
												<React.Fragment>
													<span className="stock-level no-stock">
														Out of stock
													</span>
													<button
														disabled="true"
														className="btn btn-pink"
													>
														Add to Cart
													</button>
												</React.Fragment>
											)}
										</div>
									</div>
								</div>
							</div>
						</React.Fragment>
					);
				}}
			</Query>
		);
	}
}

export default SingleProduct;
export { SINGLE_PRODUCT_QUERY };
