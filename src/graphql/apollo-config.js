import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: 'https://api.baseql.com/airtable/graphql/appsVLTJBkSew9M4y',
  cache: new InMemoryCache(),
  headers: {
    authorization: `Bearer Y2MxZTUzNTAtNmNmYS00ZmIxLTgyY2ItYzNjY2JjYWFlNDg0`,
  },
});
