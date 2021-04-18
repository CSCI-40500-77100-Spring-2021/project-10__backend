import { getCurrentInvoke } from '@vendia/serverless-express';
import { Request } from 'express';
import { DynamoPaginationKey } from './dynamodb';

// Whoever is making the request
export const GetCurrentUser = () : string => {
  const { event } = getCurrentInvoke();
  return event.requestContext.authorizer.claims.sub;
};

export const GetRequestPageOptions = (
  requestQuery: Request,
) : DynamoPaginationKey | undefined => {
  const { page_pk: pagePk, page_sk: pageSk } = requestQuery.query;
  if (pagePk && pageSk) {
    return {
      pk: pagePk as string,
      sk: pageSk as string,
    };
  }
  return undefined;
};

export const GetNextPageUri = (
  path: string,
  nextPage: DynamoPaginationKey,
) : string => `${path}?page_pk=${encodeURIComponent(nextPage.pk)}&page_sk=${encodeURIComponent(nextPage.sk)}`;
