/* eslint-disable no-console */

const fs = require("fs");
const fetch = require("node-fetch");

const {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  from,
  gql,
} = require("@apollo/client");
const { onError } = require("@apollo/client/link/error");

const httpLink = new HttpLink({
  uri: "https://demo.saigondigital.dev/graphql",
  fetch,
});
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError)
    console.error(`[Network error]: ${JSON.stringify(networkError, null, 2)})`);
});
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([errorLink, httpLink]),
});



const getSiteConfig = () => {
  client
    .query({
      query: gql`
        query {
          siteSettings {
            siteConfiguration {
              title
              description
              favicon {
                node {
                  sourceUrl
                }
              }
              openGraphImage {
                node {
                  sourceUrl
                }
              }
              siteUrl
            }
          }
        }
      `,
    })
    .then((result) =>
      fs.writeFileSync(
        "./data/preBuild/siteConfig.json",
        JSON.stringify(result)
      )
    );
};
module.exports.preBuildDevelopment = async () => {
  console.log("Loading the development content!");
  getSiteConfig();
};

module.exports.preBuildProduction = async () => {
  console.log("Loading the build content!");
  getSiteConfig();
};
