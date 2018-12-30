import React, { Component } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Head from "next/head";
import Products from "../components/Products";
import { adopt } from "react-adopt";
import { SINGLE_BRAND_QUERY } from "./brand";
import { SINGLE_CATEGORY_QUERY } from "./category";

const Composed = adopt({
	singleBrand: ({ render, brand }) => (
		<Query
			query={SINGLE_BRAND_QUERY}
			variables={{
				slug: brand
			}}
		>
			{render}
		</Query>
	),
	singleCategory: ({ render, category }) => (
		<Query
			query={SINGLE_CATEGORY_QUERY}
			variables={{
				slug: category
			}}
		>
			{render}
		</Query>
	)
});

class ProductsPage extends Component {
	render() {
		return (
			<React.Fragment>
				<Head>
					<title>Products - Three Amigos</title>
				</Head>

				<Composed
					brand={this.props.query.brand}
					category={this.props.query.category}
				>
					{({ singleBrand, singleCategory }) => {
						const brand = singleBrand.data.brands[0];
						const category = singleCategory.data.categories[0];
						return (
							<Products
								category={
									this.props.query.category ? category : ""
								}
								brand={this.props.query.brand ? brand : ""}
								key={Date.now()}
							/>
						);
					}}
				</Composed>
			</React.Fragment>
		);
	}
}

export default ProductsPage;
