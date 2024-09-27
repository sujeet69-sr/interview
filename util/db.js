const {
  DynamoDBClient,
  CreateTableCommand,
  DescribeTableCommand,
} = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient } = require("@aws-sdk/lib-dynamodb");
const config = require("./config");

const client = new DynamoDBClient({
  region: config.DB_REGION,
  endpoint: config.DB_URL,
  credentials: {
    accessKeyId: config.AWS_ACCESS_KEY,
    secretAccessKey: config.AWS_SECRET_KEY,
  },
});

const dynamoDb = DynamoDBDocumentClient.from(client);
const TableName = config.DB_TABLE;

const createTable = async () => {
  const params = {
    TableName,
    AttributeDefinitions: [
      { AttributeName: "shortUrl", AttributeType: "S" },
      { AttributeName: "url", AttributeType: "S" },
    ],
    KeySchema: [{ AttributeName: "shortUrl", KeyType: "HASH" }],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1,
    },
    GlobalSecondaryIndexes: [
      {
        IndexName: "UrlIndex",
        KeySchema: [{ AttributeName: "url", KeyType: "HASH" }],
        Projection: { ProjectionType: "ALL" },
        ProvisionedThroughput: {
          ReadCapacityUnits: 1,
          WriteCapacityUnits: 1,
        },
      },
    ],
  };

  try {
    const describeCommand = new DescribeTableCommand({ TableName });
    const result = await client.send(describeCommand);
    console.log("Table already exists ===>", result);
  } catch (error) {
    console.log("error===>", error);
    if (error.name === "ResourceNotFoundException") {
      try {
        const createCommand = new CreateTableCommand(params);
        const createResult = await client.send(createCommand);
        console.log("Table created ====>", createResult);
      } catch (createError) {
        console.error("Error while creating table ==>", createError);
      }
    } else {
      console.error("Error checking table existence ==>", error);
    }
  }
};

module.exports = { dynamoDb, TableName, createTable };
