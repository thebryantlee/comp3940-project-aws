const express = require('express');
const mqttHandler = require('./mqttHandler');
const mqtt = require('mqtt');

const app = express();
const port = process.env.PORT || 3001;

// MQTT Client Setup
const client = mqtt.connect('mqtt://your-mqtt-broker-url');
client.on('connect', () => {
    client.subscribe('yourTopic');
});

client.on('message', (topic, message) => {
    mqttHandler.handleMqttMessage(topic, message);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
