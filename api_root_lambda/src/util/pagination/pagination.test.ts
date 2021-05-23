import { Request } from 'express';
import Pagination from '.';

describe('Tests Pagination > GetRequestPageOptions', () => {
  it('Empty query should return undefined', () => {
    const request = {
      query: {},
    } as unknown as Request;
    expect(Pagination.GetRequestPageOptions(request)).toBeUndefined();
  });

  it('Tests it drops pagination key prefix', () => {
    const request = {
      query: {
        page_pk: 'primary_key',
        page_sk: 'secondary_key',
      },
    } as unknown as Request;
    const actual = Pagination.GetRequestPageOptions(request);
    expect(actual).toHaveProperty('pk');
    expect(actual).toHaveProperty('sk');
  });

  it('Tests page request with only page queries', () => {
    const request = {
      query: {
        page_pk: 'primary_key',
        page_sk: 'secondary_key',
      },
    } as unknown as Request;
    const expected = {
      pk: request.query.page_pk,
      sk: request.query.page_sk,
    };
    const actual = Pagination.GetRequestPageOptions(request);
    expect(actual).toEqual(expected);
  });

  it('Tests page request with no page queries returns undefined', () => {
    const request = {
      query: {
        hello: 'hi',
        world: 'bar',
      },
    } as unknown as Request;
    const actual = Pagination.GetRequestPageOptions(request);
    expect(actual).toBeUndefined();
  });

  it('Tests it ignores non-page query queries', () => {
    const request = {
      query: {
        page_pk: 'primary_key',
        page_sk: 'secondary_key',
        foo: 'bar',
        hello: 'world',
      },
    } as unknown as Request;
    const expected = {
      pk: request.query.page_pk,
      sk: request.query.page_sk,
    };
    const actual = Pagination.GetRequestPageOptions(request);
    expect(actual).toEqual(expected);
  });
});
