import { getCurrentInvoke } from '@vendia/serverless-express';
import { ErrorRequestHandler } from 'express';

const errorRequestHandler : ErrorRequestHandler = (error, request, response) => {
  console.log('Error');
  console.error(error);
  console.log('Request');
  console.log(JSON.stringify(request, null, '\t'));
  console.log('Event');
  console.log(JSON.stringify(getCurrentInvoke().event, null, '\t'));
  return response.status(error.status || 500).json({
    error: {
      message: error.message || 'Oops! Something went wrong.',
    },
  });
};

export default errorRequestHandler;
