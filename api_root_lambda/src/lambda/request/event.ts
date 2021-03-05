import { stringToHTTPMethod } from '../../util/request';
import HTTPMethod from './http_method';
import HTTPStatus from './http_status';
import RequestError from './request_error';

export interface HTTPRequestUser {
  id: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ILambdaAPIGatewayEvent = Record<string, any>

export interface IHTTPRequest {
  lambdaEvent: ILambdaAPIGatewayEvent
  path: string,
  method: HTTPMethod
  body?: Record<string, unknown>
  queryStringParameters?: Record<string, string>
  pathParameters?: Record<string, string>
}

export interface IAuthorizedHTTPRequest extends IHTTPRequest {
  user: HTTPRequestUser
}

export class LambdaHTTPEvent implements IHTTPRequest {
  lambdaEvent: ILambdaAPIGatewayEvent;

  path: string;

  method: HTTPMethod;

  body?: Record<string, unknown> | undefined;

  queryStringParameters?: Record<string, string>;

  pathParameters?: Record<string, string>

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(event: ILambdaAPIGatewayEvent) {
    this.lambdaEvent = event;
    this.path = event.resource;
    const method = stringToHTTPMethod(event.httpMethod);
    if (method === undefined) throw new Error(`http method ${method} has not been implemented`);
    this.method = method;
    this.body = event.body ? JSON.parse(event.body) : undefined;
    this.queryStringParameters = event.queryStringParameters || undefined;
    this.pathParameters = event.pathParameters;
  }

  /**
   * Authorized a requests and returns Authorized version of the requests
   * Throws RequestError with status code UNAUTHORIZED if not authorized
   * @param httpRequest Request to Authorize
   */
  static AuthorizeRequest(httpRequest: IHTTPRequest) : IAuthorizedHTTPRequest {
    if (
      httpRequest.lambdaEvent.requestContext.authorizer
      && httpRequest.lambdaEvent.requestContext.authorizer.claims
    ) {
      return {
        ...httpRequest,
        user: {
          id: httpRequest.lambdaEvent.requestContext.authorizer.claims.sub,
        },
      };
    }
    throw new RequestError({
      status: HTTPStatus.UNAUTHORIZED,
      message: 'Authorizer not provided',
    });
  }
}
