import React, { Component } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Head from "next/head";

const SINGLE_BRAND_QUERY = gql`
	query SINGLE_BRAND_QUERY($slug: String, $first: Int = 1) {
		brands(first: $first, where: { slug: $slug }) {
			id
			name
		}
	}
`;

class SingleBrand extends Component {
	render() {
		return (
			<Query
				query={SINGLE_BRAND_QUERY}
				variables={{
					slug: this.props.slug
				}}
			>
				{({ data, error, loading }) => {
					const brand = data.brands[0];
					if (loading) return <p>Loading...</p>;
					if (error) return <p>Error: {error.message}</p>;
					return (
						<React.Fragment>
							<Head>
								<title>{brand.name}</title>
							</Head>
							<h1>{brand.name}</h1>
						</React.Fragment>
					);
				}}
			</Query>
		);
	}
}

export default SingleBrand;
