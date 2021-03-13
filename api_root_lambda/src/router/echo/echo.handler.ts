import { getCurrentInvoke } from '@vendia/serverless-express';
import { RequestHandler } from 'express';

const echoRouteHandler : RequestHandler = (_, res) => {
  res.status(200).json({
    event: getCurrentInvoke().event,
  });
};

export default echoRouteHandler;
