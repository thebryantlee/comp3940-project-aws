from AWSIoTPythonSDK.MQTTLib import AWSIoTMQTTClient
import os

# Initialize the MQTT Client
myMQTTClient = AWSIoTMQTTClient("MyRaspberryPiClient")
myMQTTClient.configureEndpoint("a1h7gui22xor7w-ats.iot.us-west-2.amazonaws.com", 8883)
myMQTTClient.configureCredentials("/home/kelly/Downloads/AmazonRootCA1(1).pem", "/home/kelly/Downloads/e5531071a0ee9ef7df45278ad334ac909f47364a9346671c2e3c806460d6489c-private.pem.key", "/home/kelly/Downloads/e5531071a0ee9ef7df45278ad334ac909f47364a9346671c2e3c806460d6489c-certificate.pem.crt")

# Connect and subscribe to AWS IoT
myMQTTClient.connect()
print("Connected to AWS IoT")

# Publish a message
myMQTTClient.publish("topic/test", "Hello from Raspberry Pi", 0)
