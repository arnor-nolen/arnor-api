import { GITHUB_TOKEN, GITHUB_URL } from "../src/settings.js";
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client/core";
import fetch from "node-fetch";

export default new ApolloClient({
  link: new HttpLink({
    uri: GITHUB_URL,
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
    },
    fetch,
  }),
  cache: new InMemoryCache(),
});
