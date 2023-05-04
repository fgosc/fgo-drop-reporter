/* Amplify Params - DO NOT EDIT
	AUTH_FGODROPREPORTER_USERPOOLID
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const AWS = require("aws-sdk");
const cognito = new AWS.CognitoIdentityServiceProvider();

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  const { username } = event.arguments;
  const params = {
    UserPoolId: process.env.AUTH_FGODROPREPORTER_USERPOOLID,
    Username: username,
  };

  try {
    const user = await cognito.adminGetUser(params).promise();
    const nameAttribute = user.UserAttributes.find(
      (attr) => attr.Name === "name"
    );
    const twitterIdAttribute = user.UserAttributes.find(
      (attr) => attr.Name === "custom:twitter_id"
    );
    const twitterNameAttribute = user.UserAttributes.find(
      (attr) => attr.Name === "custom:twitter_name"
    );
    const twitterUsernameAttribute = user.UserAttributes.find(
      (attr) => attr.Name === "custom:twitter_username"
    );

    const result = {
      name: nameAttribute.Value,
      twitterId: twitterIdAttribute ? twitterIdAttribute.Value : null,
      twitterName: twitterNameAttribute ? twitterNameAttribute.Value : null,
      twitterUsername: twitterUsernameAttribute
        ? twitterUsernameAttribute.Value
        : null,
    };
    console.log(result);
    return JSON.stringify(result);
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching user info");
  }
};
