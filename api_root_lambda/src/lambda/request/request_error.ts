import HTTPStatus from './http_status';

export interface RequestErrorProps {
  status: HTTPStatus
  message?: string
}

export default class RequestError extends Error {
  status: number

  date: Date

  constructor(props: RequestErrorProps) {
    super();
    this.status = props.status;
    if (props.message) this.message = props.message;
    this.date = new Date();
    this.name = 'RequestError';
  }
}
