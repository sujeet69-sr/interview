const config = {
    DB_URL: process.env.DB_URL || "http://localhost:8000",
    DB_REGION: process.env.DB_REGION || "localhost",
    AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY || "fakeAccessKey",
    AWS_SECRET_KEY: process.env.AWS_SECRET_KEY || "fakeSecretKey",
    DB_TABLE: process.env.DB_TABLE || "UrlsTable",
  };
  
 module.exports = config
  