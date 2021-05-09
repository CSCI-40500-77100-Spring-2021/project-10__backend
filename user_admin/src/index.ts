import RequestTopic from './constant/request_topic';
import RequestError from './error/request_error';
import { FindUserByUsername } from './search';

type LambdaRequestEvent = {
  topic: RequestTopic;
  payload?: unknown;
};

type LambdaRequestFindUserPayload = {
  username: string;
};

type LambdaResponse = {
  statusCode: number,
  data?: unknown,
}

const HandleGetUserByUsername = async (eventPayload: unknown) : Promise<LambdaResponse> => {
  try {
    const payload = eventPayload as LambdaRequestFindUserPayload;
    const user = await FindUserByUsername(payload.username);
    return {
      statusCode: 200,
      data: { user },
    };
  } catch (error) {
    throw new RequestError(400, error.message);
  }
};

export const UserHandler = async (
  event: LambdaRequestEvent,
  _context: unknown,
) : Promise<LambdaResponse> => {
  try {
    switch (event.topic) {
      case RequestTopic.FindUserByUserName: {
        const response = await HandleGetUserByUsername(event.payload);
        return response;
      }
      default: {
        throw new RequestError(404, "Request Topic doesn't exists");
      }
    }
  } catch (error) {
    return {
      statusCode: error.statusCode || 500,
      data: {
        message: error.message || 'Something went wrong',
      },
    };
  }
};
