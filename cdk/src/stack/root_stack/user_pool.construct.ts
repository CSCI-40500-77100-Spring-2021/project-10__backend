import {
  AccountRecovery,
  UserPool,
  VerificationEmailStyle,
} from '@aws-cdk/aws-cognito';
import { Construct } from '@aws-cdk/core';
import AppStage from '../../constant/app_stage';
import { resourceName } from '../../util/resource';

export type AppUserPoopProps = {
  stage: AppStage;
};

export default class AppUserPool extends Construct {
  userPool: UserPool;

  constructor(scope: Construct, id: string, props: AppUserPoopProps) {
    super(scope, id);
    const { stage } = props;
    const userPoolResName = resourceName('MealSnapUserPool', stage);
    this.userPool = new UserPool(this, userPoolResName, {
      userPoolName: userPoolResName,
      signInAliases: {
        email: true,
        username: true,
      },
      selfSignUpEnabled: true,
      standardAttributes: {
        givenName: {
          required: true,
          mutable: true,
        },
        familyName: {
          required: true,
          mutable: true,
        },
      },
      accountRecovery: AccountRecovery.EMAIL_AND_PHONE_WITHOUT_MFA,
      userVerification: {
        emailStyle: VerificationEmailStyle.LINK,
      },
    });
    this.userPool.addDomain(resourceName('MealSnapUserPoolDomain', stage), {
      cognitoDomain: {
        domainPrefix: resourceName('mealsnap-userpool', stage).toLowerCase(),
      },
    });
    this.userPool.addClient('MobileAppClient');
  }
}
