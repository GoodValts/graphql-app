interface ResponseData {
  data?: unknown;
  errors?: unknown;
}

const makeRequest = async (
  url: string,
  query: string = '',
  variables: string = '{}'
): Promise<ResponseData> => {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables: JSON.parse(variables),
    }),
  });
  return res.json();
};

export default makeRequest;
