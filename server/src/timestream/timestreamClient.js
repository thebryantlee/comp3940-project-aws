const AWS = require('aws-sdk');

exports.handler = async (event, context) => {
    AWS.config.update({
        accessKeyId: 'AKIA5DWA4I3PMNMHNAE4',
        secretAccessKey: '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',
        region: 'us-east-2',
    });

    // Create a Timestream client
    const timestream = new AWS.TimestreamQuery();

    // Define query parameters
    const params = {
        QueryString: `SELECT
        truck_id,
        fleet,
        fuel_capacity,
        model,
        load_capacity,
        make,
        measure_name
    FROM "sampleDB".IoTMulti
    GROUP BY truck_id, fleet, fuel_capacity, model, load_capacity, make, measure_name`,
        // Other parameters like client request token, pagination settings, etc., can be included here if needed
    };

    try {
        const data = await timestream.query(params).promise();
        console.log('Query results:', data);

        // Process the query results
        data.Rows.forEach(row => {
            const rowData = row.Data;
            console.log('Row Data:', rowData);
        });

        return { statusCode: 200, body: JSON.stringify(data) };
    } catch (error) {
        console.error('Error querying Timestream:', error);
        return { statusCode: 500, body: JSON.stringify({ message: 'Error querying Timestream' }) };
    }
};

