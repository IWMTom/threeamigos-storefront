import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import BrandCard from "./BrandCard";

const ALL_BRANDS_QUERY = gql`
	query ALL_BRANDS_QUERY($first: Int = 4) {
		brands(first: $first) {
			id
			name
			image_url
			slug
		}
	}
`;

const PopularBrands = () => (
	<React.Fragment>
		<h2>
			<i className="ic_bookmark" />
			<span>Popular Brands</span>
		</h2>

		<Query query={ALL_BRANDS_QUERY}>
			{({ data, error, loading }) => {
				if (loading) return <p>Loading...</p>;
				if (error) return <p>Error: {error.message}</p>;
				return (
					<div className="pure-g">
						{data.brands.map(brand => (
							<BrandCard key={brand.id} brand={brand} />
						))}
					</div>
				);
			}}
		</Query>
	</React.Fragment>
);

export default PopularBrands;
