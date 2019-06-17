const AWS = require("aws-sdk");
/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */
exports.lambdaHandler = async (event, context, callback) => {
  let response;
  const lambda = new AWS.Lambda();

  try {
    const param = {
      FunctionName: "hoge",
      InvocationType: "Event",
      Payload: JSON.stringify({ hoge: "foo" })
    };

    await lambda
      .invoke(param)
      .promise()
      .then(() => {
        response = {
          statusCode: 200,
          body: JSON.stringify({
            message: "hello world"
          })
        };
        callback(null, response);
      })
      .catch(e => {
        console.log(e);
        callback(e.message);
      });
  } catch (err) {
    console.log(err);
    callback(err);
  }
};
