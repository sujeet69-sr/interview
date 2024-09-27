const uuid = require("uuid");

exports.shortUrl = async (event) => {
  try {
    const { url } = JSON.parse(event.body);
    const shortUrl = uuid.v4().slice(0, 6);
    //Need to save in DB URL and shortURL
    return {
      statusCode: 200,
      body: JSON.stringify({
        shortUrl,
        url,
        message: "Converted to Short url successfully",
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: {
        message: "something went wrong",
      },
    };
  }
};


exports.originalUrl = async (event) => {
    try {
        const { shortUrl } = event.pathParameters;
        // Fetch long url from DB base on shortURl
        return {
        statusCode: 200,
        body: JSON.stringify({
          shortUrl,
          message: "Fetch long url from DB",
        }),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: {
          message: "something went wrong",
        },
      };
    }
  };
  