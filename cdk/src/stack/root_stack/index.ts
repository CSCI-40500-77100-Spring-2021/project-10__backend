import {
  CfnAuthorizer,
  Cors,
  LambdaRestApi,
  RestApi,
} from '@aws-cdk/aws-apigateway';
import {
  Code, Function, IFunction, Runtime,
} from '@aws-cdk/aws-lambda';
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

  public stage: AppStage;

  private apiAuthroizer: CfnAuthorizer;

  constructor(scope: cdk.Construct, id: string, props: RootStackProps) {
    super(scope, id, props);

    this.stage = props.stage;

    const resourceNames = {
      apiGateway: resourceName('MealSnapAPIGateway', this.stage),
      apiHandlerLambda: resourceName(
        'MealSnapAPIGatewayLambdaHandler',
        this.stage,
      ),
      authPool: resourceName('MealSnapUserPool', this.stage),
      apiAuthorizer: resourceName('MealSnapAuthorizer', this.stage),
    };

    this.apiHandler = new Function(this, resourceNames.apiHandlerLambda, {
      functionName: resourceNames.apiHandlerLambda,
      runtime: Runtime.NODEJS_12_X,
      handler: 'index.APIHandler',
      code: Code.fromAsset('./build/api_root_lambda'),
      environment: {
        DB_URL: DatabaseURL(),
      },
    });

    this.api = new LambdaRestApi(this, resourceNames.apiGateway, {
      handler: this.apiHandler,
      defaultCorsPreflightOptions: {
        allowOrigins: Cors.ALL_ORIGINS,
        allowMethods: Cors.ALL_METHODS,
        allowHeaders: Cors.DEFAULT_HEADERS,
      },
      proxy: true,
    });

    const authPool = new AppUserPool(this, resourceNames.authPool, {
      stage: this.stage,
    });

    this.apiAuthroizer = new CfnAuthorizer(this, resourceNames.apiAuthorizer, {
      name: resourceNames.apiAuthorizer,
      restApiId: this.api.restApiId,
      type: 'COGNITO_USER_POOLS',
      identitySource: 'method.request.header.Authorization',
      providerArns: [authPool.userPool.userPoolArn],
    });
  }
}
