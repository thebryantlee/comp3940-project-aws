const AWS = require('aws-sdk');

AWS.config.update({
    accessKeyId: 'AKIA5DWA4I3PMNMHNAE4',
    secretAccessKey: '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',
    region: 'us-east-2',
});

const timestream = new AWS.TimestreamQuery();

async function queryTimestream() {
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
    };

    try {
        const data = await timestream.query(params).promise();
        console.log('Query results:', data);

        // Process the query results
        data.Rows.forEach(row => {
            const rowData = row.Data;
            console.log('Row Data:', rowData);
        });

        const viewModel = data.Rows.map((row) => {
            const rowData = {};
            row.Data.forEach((cell, index) => {
                const columnName = data.ColumnInfo[index].Name;
                rowData[columnName] = cell.ScalarValue;
            });
            return rowData;
        });

        return viewModel;
    } catch (error) {
        console.error('Error querying Timestream:', error);
        throw error;
    }
}

module.exports = {
    queryTimestream,
};
