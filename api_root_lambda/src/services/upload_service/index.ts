import { Lambda } from 'aws-sdk';
import AppConfig from '../../config';

export type UploadLambdaImagePreviewData = {
  previewUrl: string
}

export type UploadLambdaErrorData = {
  message: string
}

export type UploadLambdaResponseData = UploadLambdaErrorData | UploadLambdaImagePreviewData

type UploadLambdaResponse = {
  statusCode: number,
  data: UploadLambdaResponseData
}

export type UploadServiceImageResponse = UploadLambdaImagePreviewData

export default class UploadService {
  private static lambda = new Lambda();

  static async UploadImage(
    base64EncodedImage: string,
  ): Promise<UploadServiceImageResponse> {
    const lambdaResponse = await UploadService.lambda
      .invoke({
        FunctionName: AppConfig.UploadServiceLambdaName,
        // InvocationType: 'Event',
        Payload: JSON.stringify({
          payload: {
            base64EncodedImage,
          },
        }),
      })
      .promise();
    const response : UploadLambdaResponse = JSON.parse(lambdaResponse.Payload as string);
    console.log(response);
    if (response.statusCode < 200 || response.statusCode > 299) {
      const data = response.data as UploadLambdaErrorData;
      throw new Error(data.message);
    }
    return response.data as UploadLambdaImagePreviewData;
  }
}
