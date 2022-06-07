import { Kafka, logLevel } from "kafkajs";
import { generateUniqueID } from "../utils.js";
import { getRoomId } from "./room.js";

const kafka = new Kafka({
  clientId: "app",
  brokers: ["localhost:29092"],
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

const receiveMsg = async (userId, roomId) => {
  return null;
};

const createRoom = async (senderId, receiverId) => {
  const roomId = getRoomId(senderId, receiverId);

  const producer = kafka.producer();
  await producer.connect();

  const admin = kafka.admin();
  admin.connect();

  await admin.createTopics({
    waitForLeaders: true,
    topics: [{ topic: roomId }],
  });

  await producer.disconnect();
  await admin.disconnect();

  return roomId;
};

const deleteRoom = async (roomId) => {
  const admin = kafka.admin();
  await admin.connect();

  await admin.deleteTopics({
    topics: [roomId],
    timeout: 3000,
  });

  await admin.disconnect();
};

export { sendMsg, getMsgHistory, receiveMsg, createRoom, deleteRoom };
