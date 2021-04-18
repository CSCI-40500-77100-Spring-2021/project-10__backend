import { getCurrentInvoke } from '@vendia/serverless-express';

// Whoever is making the request
export const GetCurrentUser = () : string => {
  const { event } = getCurrentInvoke();
  return event.requestContext.authorizer.claims.sub;
};
