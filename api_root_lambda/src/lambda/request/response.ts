import HTTPStatus from './http_status';

export interface IHTTPResponse {
  statusCode: number,
  headers?: Record<string, string>
  body?: string
}

export default class Response implements IHTTPResponse {
  statusCode: number;

  headers?: Record<string, string> | undefined;

  body?: string

  constructor(status: HTTPStatus = HTTPStatus.OK) {
    this.statusCode = status;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setBody(body: Record<string, any>) : this {
    this.body = JSON.stringify(body);
    return this;
  }

  setErrorMessage(message: string) : this {
    this.body = JSON.stringify({
      message,
    });
    return this;
  }
}
