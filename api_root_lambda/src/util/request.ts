import { getCurrentInvoke } from '@vendia/serverless-express';

export const GetCurrentUser = () : string => {
  const { event } = getCurrentInvoke();
  return event.requestContext.authorizer.claims.sub;
};
