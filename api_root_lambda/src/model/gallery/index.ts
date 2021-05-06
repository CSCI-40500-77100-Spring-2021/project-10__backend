import DynamoDB, { PutItemInputAttributeMap } from 'aws-sdk/clients/dynamodb';
import AppConfig from '../../config';
import { GalleryTable } from '../../services/dynamo_db/gallery_table';
import { GalleryTablePrimaryKey, GalleryTableSecondaryKey } from '../../services/dynamo_db/gallery_table_key';
import logger from '../../util/logger';
import GenerateId from '../../util/uuid';
import Pagination, { GalleryPaginationKey, GalleryPaginationService } from '../../util/pagination';

export type AddGalleryEntryProps = {
  title: string;
  description: string;
  imageUrl: string;
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
  nextPageKey?: GalleryPageKey
}
export default class Gallery {
  static async AddToGallery(
    userId: string,
    props: AddGalleryEntryProps,
  ): Promise<GalleryImageSummary> {
    const TAG = Gallery.AddToGallery.name;
    const { title, description, imageUrl } = props;
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
      createdAt: {
        N: `${Date.now()}`,
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
    userId: string, pageStartKey?: GalleryPaginationKey,
  ) : Promise<GetUserGalleryOutput> {
    // Database Request
    const db = new DynamoDB();
    const exclusiveStartKey = pageStartKey ? GalleryPaginationService
      .GetDynamoKey(pageStartKey) : undefined;
    const result = await db.query({
      ExclusiveStartKey: exclusiveStartKey,
      KeyConditionExpression: 'pk = :pk_val',
      IndexName: 'createdAt',
      ExpressionAttributeValues: {
        ':pk_val': {
          S: GalleryTablePrimaryKey.userId(userId),
        },
      },
      Limit: AppConfig.Preset.PaginationLimit,
      TableName: AppConfig.GalleryTableName,
      ScanIndexForward: false,
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

    return {
      nextPageKey: result.LastEvaluatedKey ? Pagination.GetPaginationKey(
        result.LastEvaluatedKey,
      ) as GalleryPaginationKey : undefined,
      items: userPhotos,
    };
  }
}
