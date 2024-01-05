import {
  GraphQLSchema,
  buildClientSchema,
  getIntrospectionQuery,
} from 'graphql';

interface ResponseData {
  data?: unknown;
  errors?: unknown;
}

const makeRequest = async (
  url: string,
  query: string = '',
  variables: string = '{}',
  headers: string = '{}'
): Promise<ResponseData> => {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      ...JSON.parse(headers || '{}'),
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables: JSON.parse(variables || '{}'),
    }),
  });
  return res.json();
};

const getIntrospectionSchema = async (url: string): Promise<GraphQLSchema> => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ query: getIntrospectionQuery() }),
  });
  const result = await response.json();
  return buildClientSchema(result.data);
};
export { getIntrospectionSchema, makeRequest };
