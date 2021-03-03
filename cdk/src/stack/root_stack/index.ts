import { Cors, IResource, LambdaIntegration, RestApi } from '@aws-cdk/aws-apigateway';
import { Code, Function, Runtime } from '@aws-cdk/aws-lambda';
import * as cdk from '@aws-cdk/core';

export default class RootStack extends cdk.Stack {
  private api : RestApi

  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const resourceNames = {
      apiGateway: this.resName("MealSnapAPIGateway"),
      apiLambda: this.resName("MealSnapAPIGatewayLambdaHandler")
    }

    const apiLambda = new Function(this, resourceNames.apiLambda, {
      functionName: resourceNames.apiLambda,
      runtime: Runtime.NODEJS_12_X,
      handler: 'index.APIHandler',
      code: Code.fromAsset('./build/api_root_lambda'),
    });

    this.api = new RestApi(this, resourceNames.apiGateway, {
      restApiName: resourceNames.apiGateway,
      defaultIntegration: new LambdaIntegration(apiLambda),
      defaultCorsPreflightOptions: {
        allowOrigins: Cors.ALL_ORIGINS,
        allowMethods: Cors.ALL_METHODS,
        allowHeaders: Cors.DEFAULT_HEADERS,
      },
    });

    this.setupRoutes(this.api.root)
  }

  setupRoutes = (rootRoute: IResource) : void =>  {
    const echo = rootRoute.addResource('echo')
    echo.addMethod("GET")
    echo.addMethod("POST")
  }

  private resName = (res: string) : string => res
}
