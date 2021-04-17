import DynamoDB, { PutItemInputAttributeMap } from 'aws-sdk/clients/dynamodb';
import AppConfig from '../../config';

export type TableKeyInput = {
  primaryKey: string,
  secondaryKey?: string
}

export interface GalleryTablePutItemInput extends TableKeyInput {
  attributes: PutItemInputAttributeMap
}

export interface GalleryTableUpdateItemInput extends
TableKeyInput, Omit<DynamoDB.UpdateItemInput, 'Key' | 'TableName'>{}

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

  static async UpdateItem(props: GalleryTableUpdateItemInput) : Promise<void> {
    const { primaryKey, secondaryKey, ...updateInfo } = props;
    const keys : DynamoDB.UpdateItemInput['Key'] = {
      pk: {
        S: primaryKey,
      },
    };
    if (secondaryKey) keys.sk = { S: secondaryKey };
    await this.DB.updateItem({
      ...updateInfo,
      TableName: AppConfig.GalleryTableName,
      Key: keys,
    }).promise();
  }
}
