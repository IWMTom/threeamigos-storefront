import React, { Component } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Head from "next/head";

const SINGLE_PRODUCT_QUERY = gql`
	query SINGLE_PRODUCT_QUERY($slug: String, $first: Int = 1) {
		products(first: $first, where: { slug: $slug }) {
			id
			name
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
							<h1>{product.name}</h1>
						</React.Fragment>
					);
				}}
			</Query>
		);
	}
}

export default SingleProduct;
