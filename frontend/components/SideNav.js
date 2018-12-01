import gql from "graphql-tag";
import { Query } from "react-apollo";
import { ALL_CATEGORIES_QUERY } from "./Navbar";
import SideNavCategory from "./SideNavCategory";

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
