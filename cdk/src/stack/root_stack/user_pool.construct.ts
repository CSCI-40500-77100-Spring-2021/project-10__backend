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
    const userPoolResName = resourceName('MealSnapUserV2', stage);
    this.userPool = new UserPool(this, userPoolResName, {
      userPoolName: userPoolResName,
      signInAliases: {
        email: true,
        username: true,
      },
      standardAttributes: {
        givenName: {
          required: false,
          mutable: true,
        },
        familyName: {
          required: false,
          mutable: true,
        },
      },
      selfSignUpEnabled: true,
      accountRecovery: AccountRecovery.EMAIL_AND_PHONE_WITHOUT_MFA,
      userVerification: {
        emailStyle: VerificationEmailStyle.LINK,
      },
    });
    this.userPool.addDomain(resourceName('MealSnapUserDomainV2', stage), {
      cognitoDomain: {
        domainPrefix: resourceName('mealsnap-user-v2', stage).toLowerCase(),
      },
    });
    this.userPool.addClient('MobileAppClient');
  }
}
