const express = require('express');
const cors = require('cors');
const { queryTimestream } = require('./timestreamClient');

const app = express();
const port = process.env.PORT || 8080;
const path = require('path');

app.use(express.json());
app.use(cors());

// Define the route for handling the POST request
app.get('/query-timestream', async (req, res) => {
    console.log('Received POST request to /query-timestream');
    try {
        const data = await queryTimestream();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: 'Error querying Timestream' });
    }
});

// Serve the React app
app.use(express.static('client/build'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
