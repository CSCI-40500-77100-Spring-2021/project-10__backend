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
import databaseConfig from './database.config';
import AppUserPool from './user_pool.construct';

export default class RootStack extends cdk.Stack {
  public api : RestApi

  public apiHandler: IFunction

  private apiAuthroizer: CfnAuthorizer

  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const resourceNames = {
      apiGateway: this.resName('MealSnapAPIGateway'),
      apiHandlerLambda: this.resName('MealSnapAPIGatewayLambdaHandler'),
    };

    this.apiHandler = new Function(this, resourceNames.apiHandlerLambda, {
      functionName: resourceNames.apiHandlerLambda,
      runtime: Runtime.NODEJS_12_X,
      handler: 'index.APIHandler',
      code: Code.fromAsset('./build/api_root_lambda'),
      environment: {
        ...databaseConfig,
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

    const authPool = new AppUserPool(this, 'MealSnapUserPool');
    this.apiAuthroizer = new CfnAuthorizer(this, 'MealSnapAuthorizer', {
      name: 'MealSnapAuthorizer',
      restApiId: this.api.restApiId,
      type: 'COGNITO_USER_POOLS',
      identitySource: 'method.request.header.Authorization',
      providerArns: [authPool.userPool.userPoolArn],
    });
  }

  private resName = (res: string) : string => res
}
