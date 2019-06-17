"use strict";

const AWS = require("aws-sdk-mock");
const AWS_SDK = require("aws-sdk");
AWS.setSDKInstance(AWS_SDK);

const app = require("../../app.js");
var event, context;

describe("Tests index", () => {
  const lambdaSpy = jest.fn();
  beforeEach(() => {
    lambdaSpy.mockResolvedValue("mock ok");
    AWS.mock("Lambda", "invoke", lambdaSpy);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("verifies successful response", async () => {
    const callback = jest.fn();
    const result = await app.lambdaHandler(event, context, callback);

    expect(typeof callback.mock.calls[0][1]).toBe("object");
    expect(callback.mock.calls[0][1].statusCode).toBe(200);

    const message = JSON.parse(callback.mock.calls[0][1].body).message;

    expect(message).toBe("hello world");
    expect(lambdaSpy.mock.calls.length).toBe(1);
    expect(lambdaSpy.mock.calls[0][0].FunctionName).toBe("hoge");
  });
});
