import { Kafka, logLevel } from "kafkajs";
import { generateUniqueID } from "../utils.js";

const kafka = new Kafka({
  clientId: "app",
  brokers: [process.env.KAFKA_URL],
  logLevel: logLevel.ERROR,
});

const sendMsg = async (senderId, receiverId, roomId, text) => {
  const msgId = generateUniqueID();

  const producer = kafka.producer();
  await producer.connect();

  const msg = {
    id: msgId,
    senderId,
    receiverId,
    text,
  };

  const kafkaMsg = {
    key: roomId,
    value: JSON.stringify(msg),
  };

  await producer.send({
    topic: roomId,
    messages: [kafkaMsg],
  });

  return msg;
};

const getMsgHistory = async (roomId, cb) => {
  const consumer = kafka.consumer({ groupId: generateUniqueID() });

  await consumer.connect();
  await consumer.subscribe({ topic: roomId, fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message: kafkaMsg }) => {
      const msg = JSON.parse(kafkaMsg.value.toString());
      msg.timestamp = kafkaMsg.timestamp;

      cb(msg);
    },
  });
};

export { sendMsg, getMsgHistory };
