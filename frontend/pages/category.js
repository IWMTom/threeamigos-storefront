import React, { Component } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Head from "next/head";
import Products from "../components/Products";

const SINGLE_CATEGORY_QUERY = gql`
	query SINGLE_CATEGORY_QUERY($slug: String, $first: Int = 1) {
		categories(first: $first, where: { slug: $slug }) {
			id
			name
			icon
		}
	}
`;

class Category extends Component {
	render() {
		return (
			<Query
				query={SINGLE_CATEGORY_QUERY}
				variables={{
					slug: this.props.query.slug
				}}
			>
				{({ data, error, loading }) => {
					const category = data.categories[0];
					if (loading) return <p>Loading...</p>;
					if (error) return <p>Error: {error.message}</p>;
					return (
						<React.Fragment>
							<Head>
								<title>Three Amigos - {category.name}</title>
							</Head>
							<Products category={category} />
						</React.Fragment>
					);
				}}
			</Query>
		);
	}
}

export default Category;
