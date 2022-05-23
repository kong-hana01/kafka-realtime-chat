import { getMsgHistory, sendMsg, receiveMsg, createRoom, deleteRoom } from ".";

describe("Chat interfaces", () => {
  const senderId = 1;
  const receiverId = 100;
  let roomId;
  const msgId = 10000;

  beforeAll(async () => {
    roomId = await createRoom();
  });

  afterAll(async () => {
    await deleteRoom(roomId);
  });

  it("should send msg", async () => {
    console.debug(roomId);
    const msg = await sendMsg(senderId, receiverId, roomId, "hello world");

    expect(msg.id).toBeDefined();
  });
});
