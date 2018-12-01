import gql from "graphql-tag";
import { Query } from "react-apollo";
import SideNavCategory from "./SideNavCategory";

const ALL_CATEGORIES_QUERY = gql`
	query ALL_CATEGORIES_QUERY($first: Int = 5) {
		categories(first: $first) {
			id
			name
			icon
			slug
			products {
				brand {
					id
					name
					slug
				}
			}
		}
	}
`;

const SideNav = () => (
	<Query query={ALL_CATEGORIES_QUERY}>
		{({ data, error, loading }) => {
			if (loading) return <p>Loading...</p>;
			if (error) return <p>Error: {error.message}</p>;
			return (
				<section id="sidebar" className="pure-u-1-4">
					{data.categories.map(category => (
						<SideNavCategory
							key={category.id}
							category={category}
						/>
					))}
				</section>
			);
		}}
	</Query>
);

export default SideNav;
