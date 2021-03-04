import HTTPMethod from '../lambda/request/http_method';

export function stringToHTTPMethod(method: string) : HTTPMethod | undefined {
  switch (method.toLowerCase()) {
    case 'get':
      return HTTPMethod.GET;
    case 'post':
      return HTTPMethod.POST;
    case 'put':
      return HTTPMethod.PUT;
    case 'delete':
      return HTTPMethod.DELETE;
    default:
      return undefined;
  }
}
