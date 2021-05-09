import { Lambda } from 'aws-sdk';
import AppConfig from '../../config';

export enum UserAdminRequestTopic {
  FindUserByUserName = 'FindUserByUsername',
}

type UserAdminResponse = {
  statusCode: number,
  data?: unknown,
}

interface UserAdminErrorResponse extends UserAdminResponse {
  data: {
    message: string
  }
}

export default class UserAdmin {
  private static lambda = new Lambda();

  static async Request(
    topic: string,
    payload: unknown,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Promise<any> {
    const lambdaResponse = await this.lambda
      .invoke({
        FunctionName: AppConfig.UserAdminLambdaName,
        // InvocationType: 'Event',
        Payload: JSON.stringify({
          topic,
          payload,
        }),
      })
      .promise();
    const response : UserAdminResponse = JSON.parse(lambdaResponse.Payload as string);
    console.log(response);
    if (response.statusCode < 200 || response.statusCode > 299) {
      const errorResponse = response as UserAdminErrorResponse;
      throw new Error(errorResponse.data.message);
    }
    return response.data;
  }
}
