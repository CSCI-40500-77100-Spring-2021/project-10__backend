import { Cors, RestApi } from '@aws-cdk/aws-apigateway';
import * as cdk from '@aws-cdk/core';

export default class RootStack extends cdk.Stack {
  private api: RestApi

  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    // The code that defines your stack goes here
    const apiID = this.resName("MealSnapAPIGateway")
    this.api = new RestApi(this, apiID, {
      restApiName: apiID,
      // defaultIntegration: this.integrations[AWSResource.CourseLambda],
      defaultCorsPreflightOptions: {
        allowOrigins: Cors.ALL_ORIGINS,
        allowMethods: Cors.ALL_METHODS,
        allowHeaders: Cors.DEFAULT_HEADERS,
      },
    });
  }

  private resName = (res: string) : string => res
}
