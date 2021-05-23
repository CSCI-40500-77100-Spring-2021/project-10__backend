import Pagination, { PaginationKey } from '.';

describe('Test Pagination Utility > Next Page URI Component', () => {
  it('Returns empty string with empty key', () => {
    const pageKey: PaginationKey = {};
    const actualuri = Pagination.NextPageURIComponent(pageKey);
    expect(actualuri).toHaveLength(0);
  });

  it('Adds proper prefix to a page uri', () => {
    const pagePrefix = 'page';
    const pageKey: PaginationKey = {
      hello: 'world',
    };
    const uri = Pagination.NextPageURIComponent(pageKey);
    expect(
      uri.substring(0, pagePrefix.length),
    ).toEqual(pagePrefix);
  });

  it('Adds creates the proper page uri with single key', () => {
    const pageKey: PaginationKey = {
      hello: 'world',
    };
    const expecteduri = 'page_hello=world';
    const actualuri = Pagination.NextPageURIComponent(pageKey);
    expect(actualuri).toEqual(expecteduri);
  });

  it('Creates the proper page uri with multiple keys', () => {
    const pageKey: PaginationKey = {
      hello: 'world',
      foo: 'bar',
    };
    const expecteduri = 'page_hello=world&page_foo=bar';
    const actualuri = Pagination.NextPageURIComponent(pageKey);
    expect(actualuri).toEqual(expecteduri);
  });

  it('Properly seperates keys', () => {
    const pageKey: PaginationKey = {
      hello: 'world',
      foo: 'bar',
    };
    const actualuri = Pagination.NextPageURIComponent(pageKey);
    expect(actualuri).toContain('&');
  });
});
