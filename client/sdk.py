from AWSIoTPythonSDK.MQTTLib import AWSIoTMQTTClient
import os

# Initialize the MQTT Client
myMQTTClient = AWSIoTMQTTClient("MyRaspberryPiClient")
myMQTTClient.configureEndpoint("a1h7gui22xor7w-ats.iot.us-west-2.amazonaws.com", 8883)
myMQTTClient.configureCredentials(
    "/home/kelly/Downloads/AmazonRootCA1(1).pem", 
    "/home/kelly/Downloads/e5531071a0ee9ef7df45278ad334ac909f47364a9346671c2e3c806460d6489c-private.pem.key", 
    "/home/kelly/Downloads/e5531071a0ee9ef7df45278ad334ac909f47364a9346671c2e3c806460d6489c-certificate.pem.crt")

# Attempt to connect to AWS IoT
try:
    myMQTTClient.connect()
    print("Connected to AWS IoT")
except Exception as e:
    print(f"Failed to connect to AWS IoT: {e}")
    # Handle the exception or exit the script

# If connection was successful, publish a message
try:
    myMQTTClient.publish("topic/test", "Hello from Raspberry Pi", 0)
    print("Message published successfully.")
except Exception as e:
    print(f"Failed to publish message: {e}")

# mosquitto_pub -h a1h7gui22xor7w-ats.iot.us-west-2.amazonaws.com -p 8883 -t "test/topic" -m "Hello, MQTT client!" --cafile /home/kelly/Downloads/AmazonRootCA1(1).pem --cert /home/kelly/Downloads/e5531071a0ee9ef7df45278ad334ac909f47364a9346671c2e3c806460d6489c-certificate.pem.crt --key /home/kelly/Downloads/e5531071a0ee9ef7df45278ad334ac909f47364a9346671c2e3c806460d6489c-certificate.pem.crt -q 1
