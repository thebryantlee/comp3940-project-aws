import {CognitoUserPool, AuthenticationDetails, CognitoUser, CognitoUserAttribute} from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: 'us-west-2_PgylBvXXN',
  ClientId: '3mo3jpnuqo30jsp1l7vekj52fl'
};

const userPool = new CognitoUserPool(poolData);

export const signUp = (username, password, email, onSuccess, onFailure) => {
  const attributeList = [
    new CognitoUserAttribute({
      Name: 'email',
      Value: email
    })
  ];

  userPool.signUp(username, password, attributeList, null, (err, result) => {
    if (err) {
      onFailure(err);
      return;
    }
    onSuccess(result);
  });
};

export const signIn = (username, password, onSuccess, onFailure, onNewPasswordRequired) => {
  const authenticationDetails = new AuthenticationDetails({
    Username: username,
    Password: password,
  });

  const cognitoUser = new CognitoUser({
    Username: username,
    Pool: userPool
  });

  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: onSuccess,
    onFailure: onFailure,
    newPasswordRequired: (userAttributes, requiredAttributes) => {
      console.log('New password is required');
      delete userAttributes.email_verified; // Delete attributes you don't want to update
      onNewPasswordRequired(userAttributes, requiredAttributes);
    }
  });
};

export const signOut = () => {
  const cognitoUser = userPool.getCurrentUser();
  if (cognitoUser) {
    cognitoUser.signOut();
  }
};
