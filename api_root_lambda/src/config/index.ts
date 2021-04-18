/* eslint-disable max-classes-per-file */
import AppStage, { getAppStage } from '../constant/app_stage';
import logger from '../util/logger';
import { GetENVOrThrow } from '../util/setup';

interface IPreset {
  PaginationLimit: number
}

interface AppConfig {
  GalleryTableName: string
  GalleryBucketName: string
  CognitoUserPoolId: string
  Preset: IPreset
}

const DefaultOptions : IPreset = {
  PaginationLimit: 10,
};

const TAG = 'AppConfig';

class DefaultConfig implements AppConfig {
  GalleryTableName: string

  GalleryBucketName: string;

  CognitoUserPoolId: string

  DefaultPaginationLimit: number

  Preset: IPreset

  constructor() {
    this.GalleryTableName = GetENVOrThrow('GALLERY_TABLE_NAME');
    this.GalleryBucketName = GetENVOrThrow('GALLERY_BUCKET_NAME');
    this.CognitoUserPoolId = GetENVOrThrow('COGNITO_USER_POOL_ID');
    this.Preset = DefaultOptions;
  }
}

class TestConfig implements AppConfig {
  GalleryTableName = ''

  GalleryBucketName = ''

  CognitoUserPoolId = ''

  Preset = DefaultOptions
}

const getConfig = () : AppConfig => {
  if (getAppStage() === AppStage.Test) {
    logger.info(TAG, 'using test config');
    return new TestConfig();
  }
  return new DefaultConfig();
};

const AppConfig = getConfig();

export default AppConfig;
