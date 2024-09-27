const {
  PutCommand,
  GetCommand,
  QueryCommand,
} = require("@aws-sdk/lib-dynamodb");
const uuid = require("uuid");
const { dynamoDb, TableName, createTable } = require("../util/db");

exports.shortUrl = async (event) => {
  try {
    const { url } = JSON.parse(event.body);
    console.log("Url ==>", url);
    await createTable();

    const queryParams = {
      TableName,
      IndexName: "UrlIndex",
      KeyConditionExpression: "#url = :url",
      ExpressionAttributeNames: {
        "#url": "url",
      },
      ExpressionAttributeValues: {
        ":url": url,
      },
    };

    const result = await dynamoDb.send(new QueryCommand(queryParams));
    console.log("Result====>", result);

    if (result?.Items?.length > 0) {
      return {
        statusCode: 200,
        body: JSON.stringify({
          shortUrl: result?.Items?.[0].shortUrl,
          message: "Getting Short URL Already exist",
        }),
      };
    }

    const shortUrl = uuid.v4().slice(0, 6);
    const saveUrl = {
      TableName,
      Item: {
        shortUrl,
        url,
      },
    };
    console.log("SAVE DATA", saveUrl)
    await dynamoDb.send(new PutCommand(saveUrl));

    return {
      statusCode: 200,
      body: JSON.stringify({
        shortUrl,
        message: "Converted to Short URL successfully",
      }),
    };
  } catch (error) {
    console.error("Error saving URL ==>", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Something went wrong",
      }),
    };
  }
};

exports.originalUrl = async (event) => {
  try {
    await createTable();
    const { shortUrl } = event.pathParameters;

    const params = {
      TableName,
      Key: {
        shortUrl,
      },
    };

    const result = await dynamoDb.send(new GetCommand(params));

    if (result?.Item) {
      return {
        statusCode: 200,
        body: JSON.stringify({
          url: result?.Item?.url,
          message: "Successfully fetched original URL from DB",
        }),
      };
    } else {
      return {
        statusCode: 404,
        body: JSON.stringify({
          message: "Short URL not found",
        }),
      };
    }
  } catch (error) {
    console.error("Error fetching URL ==>", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Something went wrong",
      }),
    };
  }
};
