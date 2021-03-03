import {  LambdaHTTPEvent } from "./lambda/request/event"
import HTTPStatus from "./lambda/request/http_status"
import Response, { IHTTPResponse } from "./lambda/request/response"


export const APIHandler = async (event: LambdaHTTPEvent) : Promise<IHTTPResponse> => {
  return new Response(HTTPStatus.OK).setBody({
    event
  })
}