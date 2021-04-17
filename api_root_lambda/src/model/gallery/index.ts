import { PutItemInputAttributeMap } from 'aws-sdk/clients/dynamodb';
import { GalleryTable } from '../../services/dynamo_db/gallery_table';
import { GalleryTablePrimaryKey, GalleryTableSecondaryKey } from '../../services/dynamo_db/gallery_table_key';
import { GalleryBucket } from '../../services/s3';
import logger from '../../util/logger';
import GenerateId from '../../util/uuid';

export type AddGalleryEntryProps = {
  title: string;
  description: string;
  imageData: Buffer;
};

export type GalleryImageSummary = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
};

export default class Gallery {
  static async AddToGallery(
    userId: string,
    props: AddGalleryEntryProps,
  ): Promise<GalleryImageSummary> {
    const TAG = Gallery.AddToGallery.name;
    const { title, description, imageData } = props;
    const imageKey = `${GenerateId()}.jpg`;
    logger.info(TAG, 'Uploading image to S3');
    const { imageUrl } = await GalleryBucket.UploadImage(imageKey, imageData);
    const attributes : PutItemInputAttributeMap = {
      title: {
        S: title,
      },
      description: {
        S: description,
      },
      imageUrl: {
        S: imageUrl,
      },
      likedBy: {
        L: [],
      },
    };
    const primaryKey = GalleryTablePrimaryKey.userId(userId);
    const photoId = GenerateId();
    const secondaryKey = GalleryTableSecondaryKey.photoId(photoId);
    logger.info(TAG, 'Uploading to DnamoDB');
    await GalleryTable.PutItem({
      primaryKey,
      secondaryKey,
      attributes,
    });
    return {
      id: photoId,
      title,
      description,
      imageUrl,
    };
  }
}
