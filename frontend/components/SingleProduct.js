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
					const product = data.products[0];
					if (loading) return <p>Loading...</p>;
					if (error) return <p>Error: {error.message}</p>;
					return (
						<React.Fragment>
							<Head>
								<title>{product.name}</title>
							</Head>
							<div id="product-card" className="card">
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
											<aside>
												<span>
													{formatMoney(product.price)}
												</span>
											</aside>
										</div>
										<p>{product.description}</p>
										<div>
											<span className="stock-level">
												<strong>12</strong> left in
												stock
											</span>
											<Mutation
												mutation={TOGGLE_CART_MUTATION}
											>
												{toggleCart => (
													<Mutation
														mutation={
															ADD_TO_CART_MUTATION
														}
														variables={{
															id: product.id
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
