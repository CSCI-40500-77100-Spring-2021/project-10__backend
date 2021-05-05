import { DynamoDB } from 'aws-sdk';
import { Request } from 'express';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface PaginationKey extends Record<string, string>{}

export interface GalleryPaginationKey extends PaginationKey{
  pk: string,
  sk: string,
  createdAt: string
}

export default class Pagination {
  private static PageKeyPrefix = 'page'

  static GetPaginationKey(key: DynamoDB.Key) : PaginationKey {
    return {
      pk: key.pk.S as string,
      sk: key.sk.S as string,
      createdAt: key.createdAt.N as string,
    };
  }

  static GetRequestPageOptions(requestQuery: Request) : PaginationKey | undefined {
    console.log('request query');
    console.log(requestQuery.query);
    const queryKeys = Object.keys(requestQuery.query).filter(
      (entry) => entry.indexOf(this.PageKeyPrefix) !== -1,
    );
    if (queryKeys.length === 0) return undefined;
    const pageKeys : Record<string, string> = {};
    queryKeys.forEach((queryKey) => {
      const pageKey = queryKey.substring(this.PageKeyPrefix.length + 1);
      pageKeys[pageKey] = requestQuery.query[queryKey] as string;
    });
    return pageKeys;
  }

  static NextPageURIComponent = (
    keys: PaginationKey,
  ) : string => {
    const url = Object.keys(keys)
      .map((key) => {
        const queryPart = `${Pagination.PageKeyPrefix}_${key}=${encodeURIComponent(keys[key])}`;
        return queryPart;
      })
      .join('&');
    return url;
  }
}

export class GalleryPaginationService {
  static GetDynamoKey(key: GalleryPaginationKey) : DynamoDB.Key {
    return {
      pk: {
        S: key.pk,
      },
      sk: {
        S: key.sk,
      },
      createdAt: {
        N: key.createdAt,
      },
    };
  }
}
