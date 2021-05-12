import AWS from 'aws-sdk';
import { GetENVOrThrow } from './util/setup';
import {v4 as GenerateId} from "uuid";

export type GalleryImageUploadPayload = {
  imageUrl: string
}

export class GalleryBucket {
  static GalleryBucketName = GetENVOrThrow('GALLERY_BUCKET_NAME');

  static async UploadImage(
    imageData: Buffer,
  ) : Promise<GalleryImageUploadPayload> {
    const key = `${GenerateId()}.jpg`;
    const S3 = new AWS.S3();
    const result = await S3.upload({
      Body: imageData,
      Key: key,
      Bucket: GalleryBucket.GalleryBucketName,
      StorageClass: 'ONEZONE_IA',
    }).promise();
    return {
      imageUrl: result.Location,
    };
  }
}
