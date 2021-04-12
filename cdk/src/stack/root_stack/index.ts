import {
  AuthorizationType,
  CfnAuthorizer,
  CognitoUserPoolsAuthorizer,
  Cors,
  LambdaRestApi,
  RestApi,
} from '@aws-cdk/aws-apigateway';
import { AttributeType, BillingMode, Table } from '@aws-cdk/aws-dynamodb';
import {
  Code, Function, IFunction, Runtime,
} from '@aws-cdk/aws-lambda';
import { Bucket, IBucket } from '@aws-cdk/aws-s3';
import * as cdk from '@aws-cdk/core';
import { Duration, StackProps } from '@aws-cdk/core';
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

  public galleryTable: Table

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
      galleryTable: resourceName('MealsnapGalleryTable', this.stage),
      authPool: resourceName('MealSnapUserPool', this.stage),
      apiAuthorizer: resourceName('MealSnapAuthorizer', this.stage),
      postImageStroage: resourceName('MealSnapPostImageStorage', this.stage),
    };

    this.galleryStorage = new Bucket(this, resNames.postImageStroage);

    this.galleryTable = new Table(this, resNames.galleryTable, {
      partitionKey: { name: 'pk', type: AttributeType.STRING },
      sortKey: { name: 'sk', type: AttributeType.STRING },
      billingMode: BillingMode.PAY_PER_REQUEST,
    });

    this.apiHandler = new Function(this, resNames.apiHandlerLambda, {
      functionName: resNames.apiHandlerLambda,
      runtime: Runtime.NODEJS_12_X,
      handler: 'index.APIHandler',
      code: Code.fromAsset('./build/api_root_lambda'),
      timeout: Duration.seconds(10),
      environment: {
        GALLERY_BUCKET_NAME: this.galleryStorage.bucketName,
        GALLERY_TABLE_NAME: this.galleryTable.tableName,
      },
    });

    this.galleryStorage.grantReadWrite(this.apiHandler);
    this.galleryStorage.grantPublicAccess();

    const authPool = new AppUserPool(this, resNames.authPool, {
      stage: this.stage,
    });

    const authorizer = new CognitoUserPoolsAuthorizer(this, resNames.apiAuthorizer, {
      cognitoUserPools: [authPool.userPool],
    });

    this.api = new LambdaRestApi(this, resNames.apiGateway, {
      handler: this.apiHandler,
      defaultCorsPreflightOptions: {
        allowOrigins: Cors.ALL_ORIGINS,
        allowMethods: Cors.ALL_METHODS,
        allowHeaders: Cors.DEFAULT_HEADERS,
      },
      defaultMethodOptions: {
        authorizationType: AuthorizationType.COGNITO,
        authorizer,
      },
      proxy: true,
    });

    this.galleryTable.grantReadWriteData(this.apiHandler);
  }
}
