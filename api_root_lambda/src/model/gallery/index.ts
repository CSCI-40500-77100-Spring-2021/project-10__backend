import DynamoDB, { PutItemInputAttributeMap } from 'aws-sdk/clients/dynamodb';
import AppConfig from '../../config';
import { GalleryTable } from '../../services/dynamo_db/gallery_table';
import { GalleryTablePrimaryKey, GalleryTableSecondaryKey } from '../../services/dynamo_db/gallery_table_key';
import { GalleryBucket } from '../../services/s3';
import { ConvertToDynamoKey, DynamoPaginationKey, GetDynamoPaginationKey } from '../../util/dynamodb';
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
  likedBy: Set<string>
};

export type GalleryPageKey = {
  pk: string,
  sk: string
}

export type GetUserGalleryOutput = {
  items: Array<GalleryImageSummary>
  nextPageKey?: DynamoPaginationKey
}
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
      likedBy: new Set(),
    };
  }

  static async GetUserGallery(
    userId: string, pageStartKey?: DynamoPaginationKey,
  ) : Promise<GetUserGalleryOutput> {
    // Database Request
    const db = new DynamoDB();
    const result = await db.query({
      ExclusiveStartKey: pageStartKey ? ConvertToDynamoKey(pageStartKey) : undefined,
      KeyConditionExpression: 'pk = :pk_val',
      ExpressionAttributeValues: {
        ':pk_val': {
          S: GalleryTablePrimaryKey.userId(userId),
        },
      },
      Limit: AppConfig.Preset.PaginationLimit,
      TableName: AppConfig.GalleryTableName,
    }).promise();

    // Parse Result
    if (result.Items === undefined) return { items: [] };
    /* eslint-disable @typescript-eslint/no-non-null-assertion */
    const userPhotos : Array<GalleryImageSummary> = result.Items.map((entry) => {
      const likedBy : Set<string> = entry.likedBy ? new Set(entry.likedBy.SS) : new Set();
      return ({
        id: GalleryTableSecondaryKey
          .parsePhotoId(entry.sk.S!),
        title: entry.title.S!,
        description: entry.description.S!,
        imageUrl: entry.imageUrl.S!,
        likedBy,
      });
    });
    /* eslint-enable @typescript-eslint/no-non-null-assertion */

    return {
      nextPageKey: result.LastEvaluatedKey ? GetDynamoPaginationKey(
        result.LastEvaluatedKey,
      ) : undefined,
      items: userPhotos,
    };
  }
}
