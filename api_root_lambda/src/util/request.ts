import { getCurrentInvoke } from '@vendia/serverless-express';
import { Request } from 'express';
import AppStage, { getAppStage } from '../constant/app_stage';

// Whoever is making the request
export const GetCurrentUser = (request: Request): string => {
  if (getAppStage() === AppStage.Local) {
    if (request.headers.userid === undefined) throw new Error('userid header missing');
    return request.headers.userid as string;
  }
  const { event } = getCurrentInvoke();
  return event.requestContext.authorizer.claims.sub;
};
