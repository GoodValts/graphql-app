import prettify from '../../src/utils/prettify';

test('test prettify function', () => {
  const str = `query AllCharacters($page: Int, $filter: FilterCharacter) {
    characters(page: $page, filter: $filter) {
        results {
        name
        status
      }
    }
  }`;
  const prettifiedStr = prettify(str);
  expect(prettifiedStr)
    .toEqual(`query AllCharacters($page: Int, $filter: FilterCharacter) {
  characters(page: $page, filter: $filter) {
    results {
      name
      status
    }
  }
}`);
});
