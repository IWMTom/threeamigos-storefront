import React, { Component } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Head from "next/head";
import Products from "../components/Products";

const SINGLE_BRAND_QUERY = gql`
	query SINGLE_BRAND_QUERY($slug: String, $first: Int = 1) {
		brands(first: $first, where: { slug: $slug }) {
			id
			name
			slug
		}
	}
`;

class Brand extends Component {
	render() {
		return (
			<Query
				query={SINGLE_BRAND_QUERY}
				variables={{
					slug: this.props.query.slug
				}}
			>
				{({ data, error, loading }) => {
					const brand = data.brands[0];
					if (loading) return <p>Loading...</p>;
					if (error) return <p>Error: {error.message}</p>;
					return (
						<React.Fragment>
							<Head>
								<title>{brand.name} - Three Amigos</title>
							</Head>
							<Products brand={brand} />
						</React.Fragment>
					);
				}}
			</Query>
		);
	}
}

export default Brand;
export { SINGLE_BRAND_QUERY };
