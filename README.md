=> Architecture and Components:
Service Name: my-service

Framework Version: Serverless framework version 3.

Provider: AWS Lambda is the provider for this service, using the nodejs18.x runtime.

Functions:
1. shortUrl: This function convert crl to sort. It is triggered via an HTTP POST request to the /shortUrl endpoint, allowing Cross-Origin Resource Sharing (CORS).

2. riginalUrl: This function retrieves the original URL based on a shortened one. It is triggered via an HTTP GET request to the /originalUrl/{shortUrl} endpoint with CORS enabled.

Plugins:
serverless-offline: This plugin allows the service to run locally for testing without deploying it to AWS.

Prerequisites
    1.Install Node.js and Serverless framework (npm install -g serverless).
    2. Configure AWS credentials (aws configure).

Deployment:
    1.Clone the repository containing this project.
    2.Navigate to the project folder.
    3.Run serverless deploy to deploy the service to AWS.

Test Locally
    To test in local use the serverless-offline plugin
        1. install dependency npm install
        2. Run serverless offline
        3. Will get list of endpoint's api list