import React from "react";
import { Link } from "../routes";
import gql from "graphql-tag";
import { Query } from "react-apollo";

const ALL_CATEGORIES_QUERY = gql`
	query ALL_CATEGORIES_QUERY($first: Int = 5) {
		categories(first: $first) {
			id
			name
			icon
			slug
		}
	}
`;

class Navbar extends React.Component {
	render() {
		return (
			<Query query={ALL_CATEGORIES_QUERY}>
				{({ data, error, loading }) => {
					if (loading) return <p>Loading...</p>;
					if (error) return <p>Error: {error.message}</p>;
					return (
						<nav>
							{data.categories.map(category => (
								<Link
									route="category"
									params={{ slug: category.slug }}
									key={category.id}
								>
									<a>{category.name}</a>
								</Link>
							))}
						</nav>
					);
				}}
			</Query>
		);
	}
}

export default Navbar;
export { ALL_CATEGORIES_QUERY };
