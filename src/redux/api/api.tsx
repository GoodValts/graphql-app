import {
  GraphQLSchema,
  IntrospectionQuery,
  buildClientSchema,
  getIntrospectionQuery,
} from 'graphql';

const getIntrospectionSchema = async (url: string): Promise<GraphQLSchema> => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ query: getIntrospectionQuery() }),
  });
  const result = await response.json();
  if (result.errors) {
    throw new Error(
      `Ошибка при получении схемы: ${JSON.stringify(result.errors)}`
    );
  }
  return buildClientSchema(result.data);
};
export default getIntrospectionSchema;
