import AWS from 'aws-sdk';
import AppConfig from '../config';

export type GalleryImageUploadPayload = {
  imageUrl: string
}

export class GalleryBucket {
  static async UploadImage(
    key: string,
    imageData: Buffer,
  ) : Promise<GalleryImageUploadPayload> {
    const S3 = new AWS.S3();
    const result = await S3.upload({
      Body: imageData,
      Key: key,
      Bucket: AppConfig.GalleryBucketName,
      StorageClass: 'ONEZONE_IA',
    }).promise();
    return {
      imageUrl: result.Location,
    };
  }
}
