import {
  AuthorizationType,
  CognitoUserPoolsAuthorizer,
  Cors,
  LambdaRestApi,
  RestApi,
} from '@aws-cdk/aws-apigateway';
import { UserPool } from '@aws-cdk/aws-cognito';
import { AttributeType, BillingMode, Table } from '@aws-cdk/aws-dynamodb';
import { Effect, PolicyStatement } from '@aws-cdk/aws-iam';
import {
  Code, Function, IFunction, Runtime,
} from '@aws-cdk/aws-lambda';
import { Bucket, IBucket } from '@aws-cdk/aws-s3';
import * as cdk from '@aws-cdk/core';
import { Duration, StackProps } from '@aws-cdk/core';
import AppStage from '../../constant/app_stage';
import { API_ROOT_LAMBDA_PATH, USER_ADMIN_LAMBDA_PATH } from '../../constant/assets';
import { resourceName } from '../../util/resource';
import AppUserPool from './user_pool.construct';

export interface RootStackProps extends StackProps {
  stage: AppStage;
}

export default class RootStack extends cdk.Stack {
  public api: RestApi;

  public apiHandler: IFunction;

  public galleryStorage: IBucket;

  public stage: AppStage;

  public galleryTable: Table;

  public userPool: UserPool;

  constructor(scope: cdk.Construct, id: string, props: RootStackProps) {
    super(scope, id, props);

    this.stage = props.stage;

    const resNames = {
      userAdminHandler: resourceName('MealSnapUserAdmin', this.stage),
      apiGateway: resourceName('MealSnapAPIGateway', this.stage),
      apiHandlerLambda: resourceName(
        'MealSnapGatewayHandlerNodeJS',
        this.stage,
      ),
      galleryTable: resourceName('MealSnapGalleryDB', this.stage),
      authPool: resourceName('MealSnapAuthPoolV2', this.stage),
      apiAuthorizer: resourceName('MealSnapCognitoAuthorizerV2', this.stage),
      postImageStroage: resourceName('MealSnapPostImageStorage', this.stage),
    };

    this.galleryStorage = new Bucket(this, resNames.postImageStroage);

    this.galleryTable = new Table(this, resNames.galleryTable, {
      partitionKey: { name: 'pk', type: AttributeType.STRING },
      sortKey: { name: 'sk', type: AttributeType.STRING },
      billingMode: BillingMode.PAY_PER_REQUEST,
    });
    this.galleryTable.addLocalSecondaryIndex({
      indexName: 'createdAt',
      sortKey: {
        name: 'createdAt',
        type: AttributeType.NUMBER,
      },
    });

    const authPool = new AppUserPool(this, resNames.authPool, {
      stage: this.stage,
    });
    this.userPool = authPool.userPool;

    const authorizer = new CognitoUserPoolsAuthorizer(
      this,
      resNames.apiAuthorizer,
      {
        cognitoUserPools: [this.userPool],
      },
    );

    const userAdminHandler = new Function(this, resNames.userAdminHandler, {
      functionName: resNames.userAdminHandler,
      runtime: Runtime.NODEJS_12_X,
      handler: 'index.UserHandler',
      code: Code.fromAsset(USER_ADMIN_LAMBDA_PATH, {
        bundling: {
          image: Runtime.NODEJS_12_X.bundlingDockerImage,
          command: [
            'bash',
            '-xc',
            [
              'npm install -g yarn',
              'yarn install',
              'yarn run build',
              'yarn install --prod --modules-folder ./build/node_modules',
              'cp -rf build/* /asset-output',
            ].join('&&'),
          ],
          user: 'root',
        },
      }),
      timeout: Duration.seconds(5),
      environment: {
        COGNITO_USER_POOL_ID: this.userPool.userPoolId,
      },
    });

    this.apiHandler = new Function(this, resNames.apiHandlerLambda, {
      functionName: resNames.apiHandlerLambda,
      runtime: Runtime.NODEJS_12_X,
      handler: 'index.APIHandler',
      code: Code.fromAsset(API_ROOT_LAMBDA_PATH, {
        bundling: {
          image: Runtime.NODEJS_12_X.bundlingDockerImage,
          command: [
            'bash',
            '-xc',
            [
              'npm install -g yarn',
              'yarn install',
              'yarn run build',
              'yarn install --prod --modules-folder ./build/node_modules',
              'cp -rf build/* /asset-output',
            ].join('&&'),
          ],
          user: 'root',
        },
      }),
      timeout: Duration.seconds(10),
      environment: {
        GALLERY_BUCKET_NAME: this.galleryStorage.bucketName,
        GALLERY_TABLE_NAME: this.galleryTable.tableName,
        USER_ADMIN_LAMBDA_NAME: userAdminHandler.functionName,
      },
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

    // Permissions
    this.galleryStorage.grantReadWrite(this.apiHandler);
    this.galleryStorage.grantPublicAccess();
    this.galleryTable.grantReadWriteData(this.apiHandler);
    userAdminHandler.grantInvoke(this.apiHandler);
    userAdminHandler.addToRolePolicy(
      new PolicyStatement({
        resources: [this.userPool.userPoolArn],
        actions: ['cognito-idp:AdminGetUser', 'cognito-idp:ListUsers'],
        effect: Effect.ALLOW,
      }),
    );
  }
}
