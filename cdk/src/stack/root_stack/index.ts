import {
  CfnAuthorizer,
  Cors,
  LambdaRestApi,
  RestApi,
} from '@aws-cdk/aws-apigateway';
import {
  Code, Function, IFunction, Runtime,
} from '@aws-cdk/aws-lambda';
import { Bucket, IBucket } from '@aws-cdk/aws-s3';
import * as cdk from '@aws-cdk/core';
import { StackProps } from '@aws-cdk/core';
import { DatabaseURL } from '../../config/database';
import AppStage from '../../constant/app_stage';
import { resourceName } from '../../util/resource';
import AppUserPool from './user_pool.construct';

export interface RootStackProps extends StackProps {
  stage: AppStage;
}

export default class RootStack extends cdk.Stack {
  public api: RestApi;

  public apiHandler: IFunction;

  public galleryStorage: IBucket

  public stage: AppStage;

  public apiAuthroizer: CfnAuthorizer;

  constructor(scope: cdk.Construct, id: string, props: RootStackProps) {
    super(scope, id, props);

    this.stage = props.stage;

    const resNames = {
      apiGateway: resourceName('MealSnapAPIGateway', this.stage),
      apiHandlerLambda: resourceName(
        'MealSnapAPIGatewayLambdaHandler',
        this.stage,
      ),
      authPool: resourceName('MealSnapUserPool', this.stage),
      apiAuthorizer: resourceName('MealSnapAuthorizer', this.stage),
      postImageStroage: resourceName('MealSnapPostImageStorage', this.stage),
    };

    this.galleryStorage = new Bucket(this, resNames.postImageStroage);

    this.apiHandler = new Function(this, resNames.apiHandlerLambda, {
      functionName: resNames.apiHandlerLambda,
      runtime: Runtime.NODEJS_12_X,
      handler: 'index.APIHandler',
      code: Code.fromAsset('./build/api_root_lambda'),
      environment: {
        DB_URL: DatabaseURL(),
        GALLERY_BUCKET_NAME: this.galleryStorage.bucketName,
      },
    });

    this.galleryStorage.grantReadWrite(this.apiHandler);
    this.galleryStorage.grantPublicAccess();

    this.api = new LambdaRestApi(this, resNames.apiGateway, {
      handler: this.apiHandler,
      defaultCorsPreflightOptions: {
        allowOrigins: Cors.ALL_ORIGINS,
        allowMethods: Cors.ALL_METHODS,
        allowHeaders: Cors.DEFAULT_HEADERS,
      },
      proxy: true,
    });

    const authPool = new AppUserPool(this, resNames.authPool, {
      stage: this.stage,
    });

    this.apiAuthroizer = new CfnAuthorizer(this, resNames.apiAuthorizer, {
      name: resNames.apiAuthorizer,
      restApiId: this.api.restApiId,
      type: 'COGNITO_USER_POOLS',
      identitySource: 'method.request.header.Authorization',
      providerArns: [authPool.userPool.userPoolArn],
    });
  }
}
