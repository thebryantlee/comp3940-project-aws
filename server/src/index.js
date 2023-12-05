const express = require('express');
const fileUpload = require('express-fileupload');
const AWS = require('aws-sdk');

// AWS DynamoDB configuration
AWS.config.update({
  region: 'us-east-2',
  // TODO: credentials: ... (Set up credentials securely, e.g., using environment variables or IAM roles)
});

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const app = express();
app.use(fileUpload());

const port = process.env.PORT || 3001;

// Route for file upload
app.post('/upload', async (req, res) => {
  if (!req.files || !req.files.file) {
    return res.status(400).send('No file uploaded.');
  }

  const {file} = req.files;
  const {title, description} = req.body;

  // Define the item to be inserted into DynamoDB
  const params = {
    TableName: 'MySampleTable',
    Item: {
      id: new Date().getTime().toString(),
      title: title,
      description: description,
      fileName: file.name,
      fileType: file.mimetype,
      fileSize: file.size,
    },
  };

  // Insert the item into DynamoDB
  try {
    await dynamoDb.put(params).promise();
    res.json({message: 'File uploaded successfully'});
  } catch (error) {
    console.error('Error uploading to DynamoDB:', error);
    res.status(500).send('Error uploading file');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
