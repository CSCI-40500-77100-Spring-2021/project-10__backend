import { AccountRecovery, UserPool, VerificationEmailStyle } from '@aws-cdk/aws-cognito';
import { Construct } from '@aws-cdk/core';

export default class AppUserPool extends Construct {
  userPool : UserPool

  constructor(scope: Construct, id: string) {
    super(scope, id);
    const userPoolResName = 'MealSnapUserPool';
    this.userPool = new UserPool(
      this,
      userPoolResName,
      {
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
      },
    );
    this.userPool.addDomain('MealSnapUserPoolDomain', {
      cognitoDomain: {
        domainPrefix: 'mealsnap-userpool',
      },
    });
    this.userPool.addClient('MobileAppClient');
  }
}