import RequestTopic from './constant/request_topic';
import RequestError from './error/request_error';
import { FindUser, FindUserByUsername } from './search';

type LambdaRequestEvent = {
  topic: RequestTopic;
  payload?: unknown;
};

type LambdaRequestFindUserByUsernamePayload = {
  username: string;
};

type LambdaRequestFindUserPayload = {
  query: string;
}

type LambdaResponse = {
  statusCode: number,
  data?: unknown,
}

type RequestHandlerFN = (payload: unknown) => Promise<LambdaResponse>

const HandleGetUserByUsername : RequestHandlerFN = async (eventPayload) => {
  try {
    const payload = eventPayload as LambdaRequestFindUserByUsernamePayload;
    const user = await FindUserByUsername(payload.username);
    return {
      statusCode: 200,
      data: user,
    };
  } catch (error) {
    throw new RequestError(400, error.message);
  }
};

const HandleFindUser : RequestHandlerFN = async (eventPayload) => {
  const payload = eventPayload as LambdaRequestFindUserPayload;
  const users = await FindUser(payload.query);
  return {
    statusCode: 200,
    data: users,
  };
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
      case RequestTopic.FindUser: {
        const response = await HandleFindUser(event.payload);
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
