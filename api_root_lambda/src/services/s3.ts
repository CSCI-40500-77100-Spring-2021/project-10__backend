import AWS from 'aws-sdk';
import { GetENVOrThrow } from '../util/setup';

const S3_BUCKET_NAME = GetENVOrThrow('GALLERY_BUCKET_NAME');

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
      Bucket: S3_BUCKET_NAME,
      StorageClass: 'ONEZONE_IA',
    }).promise();
    return {
      imageUrl: result.Location,
    };
  }
}
