import { Query } from "react-apollo";
import gql from "graphql-tag";

const CURRENT_USER_QUERY = gql`
	query {
		me {
			id
			name
			photo_url
			cart {
				id
				quantity
				product {
					id
					price
					image_url
					name
					slug
				}
			}
		}
	}
`;

const User = props => (
	<Query {...props} query={CURRENT_USER_QUERY}>
		{payload => props.children(payload)}
	</Query>
);

export default User;
export { CURRENT_USER_QUERY };
