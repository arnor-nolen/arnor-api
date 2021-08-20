import { GITHUB_TOKEN, GITHUB_URL } from "../src/settings.js";
import { ApolloClient, HttpLink } from "@apollo/client/core";
import { InvalidationPolicyCache } from "apollo-invalidation-policies";
import fetch from "node-fetch";

const cache = new InvalidationPolicyCache({
  invalidationPolicies: {
    timeToLive: 60 * 1000, // 1 minute TTL cache
  },
});

export default new ApolloClient({
  link: new HttpLink({
    uri: GITHUB_URL,
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
    },
    fetch,
  }),
  cache: cache,
});
