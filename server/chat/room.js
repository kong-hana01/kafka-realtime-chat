import db from "../models/index.js";

const getRoomId = async (senderId, receiverId) => {
  let room;

  room = await db.Rooms.findOne({
    where: { firstUserId: senderId, secondUserId: receiverId },
  });

  if (!room) {
    room = await db.Rooms.findOne({
      where: { firstUserId: receiverId, secondUserId: senderId },
    });
  }

  if (!room) {
    room = await db.Rooms.create({
      firstUserId: senderId,
      secondUserId: receiverId,
    });

    await createRoom();
  }

  return room.id;
};

const createRoom = async (roomId) => {
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

export { getRoomId, createRoom };
