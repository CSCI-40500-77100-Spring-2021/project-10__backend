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
  UserAdminLambdaName: string
  Preset: IPreset
}

const DefaultOptions : IPreset = {
  PaginationLimit: 10,
};

const TAG = 'AppConfig';

class DefaultConfig implements AppConfig {
  GalleryTableName: string

  GalleryBucketName: string;

  DefaultPaginationLimit: number

  Preset: IPreset

  UserAdminLambdaName: string;

  constructor() {
    this.GalleryTableName = GetENVOrThrow('GALLERY_TABLE_NAME');
    this.GalleryBucketName = GetENVOrThrow('GALLERY_BUCKET_NAME');
    this.UserAdminLambdaName = GetENVOrThrow('USER_ADMIN_LAMBDA_NAME');
    this.Preset = DefaultOptions;
  }
}

class TestConfig implements AppConfig {
  GalleryTableName = ''

  GalleryBucketName = ''

  UserAdminLambdaName = ''

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
