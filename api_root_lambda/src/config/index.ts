/* eslint-disable max-classes-per-file */
import AppStage, { getAppStage } from '../constant/app_stage';
import { GetENVOrThrow } from '../util/setup';

interface AppConfig {
  GalleryTableName: string
  GalleryBucketName: string
  CognitoUserPoolId: string
}

class DefaultConfig implements AppConfig {
  GalleryTableName: string

  GalleryBucketName: string;

  CognitoUserPoolId: string

  constructor() {
    this.GalleryTableName = GetENVOrThrow('GALLERY_TABLE_NAME');
    this.GalleryBucketName = GetENVOrThrow('GALLERY_BUCKET_NAME');
    this.CognitoUserPoolId = GetENVOrThrow('COGNITO_USER_POOL_ID');
  }
}

class TestConfig implements AppConfig {
  GalleryTableName = ''

  GalleryBucketName = ''

  CognitoUserPoolId = ''
}

const getConfig = () : AppConfig => {
  if (getAppStage() === AppStage.Test) {
    console.log('using test config');
    return new TestConfig();
  }
  return new DefaultConfig();
};

const AppConfig = getConfig();

export default AppConfig;
