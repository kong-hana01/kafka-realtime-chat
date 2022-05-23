import { v4 as uuidv4 } from "uuid";

import { Kafka } from "kafkajs";

const kafka = new Kafka({ clientId: "app", brokers: ["localhost:29092"] });

const sendMsg = async (senderId, receiverId, roomId, text) => {
  return {
    id: 10000,
    roomId: roomId,
    timestamp: "2020-01-01 00:00:00",
    text: text,
    senderId: senderId,
    receiverId: receiverId,
  };
};

const getMsgHistory = async (roomId) => {
  const msgHistory = [
    {
      id: 1,
      roomId: roomId,
      timestamp: "2020-01-01 00:00:00",
      text: "Hello, world!",
      senderId: 1,
      receiverId: 100,
    },
    {
      id: 2,
      roomId: roomId,
      timestamp: "2020-01-02 00:00:00",
      text: "Hello2 world! End of Sync",
      senderId: 100,
      receiverId: 1,
    },
  ];

  return msgHistory;
};

const receiveMsg = async (userId, roomId) => {
  return null;
};

const createRoom = async () => {
  const roomId = uuidv4();

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

export { sendMsg, getMsgHistory, receiveMsg, createRoom };
