import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import ProductCard from "./ProductCard";

const ALL_PRODUCTS_QUERY = gql`
	query ALL_PRODUCTS_QUERY($first: Int = 6) {
		products(first: $first) {
			id
			name
			image_url
			price
			slug
		}
	}
`;

const COUNT_PRODUCTS = gql`
	query COUNT_PRODUCTS {
		productsConnection {
			aggregate {
				count
			}
		}
	}
`;

class PopularProducts extends React.Component {
	state = {
		limit: 6
	};

	loadMore = () => {
		this.setState({ limit: this.state.limit + 3 });
	};

	render() {
		return (
			<React.Fragment>
				<h2>
					<i className="ic_bookmark" />
					<span>Popular Products</span>
				</h2>

				<Query
					query={ALL_PRODUCTS_QUERY}
					variables={{ first: this.state.limit }}
				>
					{({ data, error, loading }) => {
						if (loading) return <p>Loading...</p>;
						if (error) return <p>Error: {error.message}</p>;
						return (
							<div className="pure-g">
								{data.products.map(product => (
									<ProductCard
										key={product.id}
										product={product}
									/>
								))}
							</div>
						);
					}}
				</Query>

				<Query query={COUNT_PRODUCTS}>
					{({ data, error, loading }) => {
						if (loading) return <p>Loading...</p>;
						if (error) return <p>Error: {error.message}</p>;
						return (
							<React.Fragment>
								{data.productsConnection.aggregate.count >
									this.state.limit && (
									<button
										className="btn show-more"
										onClick={this.loadMore}
									>
										Show More
									</button>
								)}
							</React.Fragment>
						);
					}}
				</Query>
			</React.Fragment>
		);
	}
}

export default PopularProducts;
