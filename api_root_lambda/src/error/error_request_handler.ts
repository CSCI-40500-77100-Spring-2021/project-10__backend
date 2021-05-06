import { getCurrentInvoke } from '@vendia/serverless-express';
import { ErrorRequestHandler } from 'express';
import AppStage, { getAppStage } from '../constant/app_stage';
import logger from '../util/logger';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorRequestHandler : ErrorRequestHandler = (error, request, response, _next) => {
  const TAG = errorRequestHandler.name;
  logger.error(TAG, 'Error');
  console.error(error);
  if (getAppStage() !== AppStage.Local) {
    logger.error(TAG, 'Request');
    logger.error(TAG, request);
    logger.error(TAG, 'Event');
    logger.error(TAG, JSON.stringify(getCurrentInvoke().event, null, '\t'));
  }
  return response.status(error.status || 500).json({
    error: {
      message: error.message || 'Oops! Something went wrong.',
    },
  });
};

export default errorRequestHandler;
