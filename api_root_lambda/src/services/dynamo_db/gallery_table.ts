import DynamoDB, { PutItemInputAttributeMap } from 'aws-sdk/clients/dynamodb';
import AppConfig from '../../config';

export type GalleryTablePutItemInput = {
  primaryKey: string,
  secondaryKey?: string,
  attributes: PutItemInputAttributeMap
}

export class GalleryTable {
  private static DB = new DynamoDB()

  static async PutItem(props: GalleryTablePutItemInput) : Promise<void> {
    const {
      primaryKey,
      secondaryKey,
      attributes,
    } = props;
    const itemKeys : PutItemInputAttributeMap = {
      pk: {
        S: primaryKey,
      },
    };
    if (props.secondaryKey) {
      itemKeys.sk = {
        S: secondaryKey,
      };
    }
    await this.DB.putItem({
      TableName: AppConfig.GalleryTableName,
      Item: {
        ...itemKeys,
        ...attributes,
      },
    }).promise();
  }
}
