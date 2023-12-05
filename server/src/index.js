const express = require('express');
const mqttHandler = require('./mqttHandler');
const mqtt = require('mqtt');

const app = express();
const port = process.env.PORT || 3001;

console.log(__dirname);


const { handler } = require('./timestream/timestreamClient.js'); // Import the Lambda function from handler.js

handler({}, null)
  .then(response => {
    console.log('Lambda function executed successfully:', response);
    // Process the response data if needed
  })
  .catch(error => {
    console.error('Error calling Lambda function:', error);
    // Handle the error if the Lambda function encounters an error
  });