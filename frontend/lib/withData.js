import withApollo from "next-with-apollo";
import ApolloClient from "apollo-boost";
import { HttpLink } from "apollo-link-http";
import { endpoint, prodEndpoint } from "../config";
import { LOCAL_STATE_QUERY, TOGGLE_CART_MUTATION } from "../components/Cart.js";

function createClient({ headers }) {
  return new ApolloClient({
    uri: process.env.NODE_ENV === "development" ? endpoint : prodEndpoint,
    fetchOptions: {
      credentials: "include"
    },
    request: operation => {
      operation.setContext({
        fetchOptions: {
          credentials: "include"
        },
        headers
      });
    },

    clientState: {
      resolvers: {
        Mutation: {
          toggleCart(_, variables, { cache }) {
            const { cartOpen } = cache.readQuery({
              query: LOCAL_STATE_QUERY
            });

            const data = {
              data: { cartOpen: !cartOpen }
            };

            cache.writeData(data);

            return data;
          }
        }
      },
      defaults: {
        cartOpen: false
      }
    }
  });
}

export default withApollo(createClient);
