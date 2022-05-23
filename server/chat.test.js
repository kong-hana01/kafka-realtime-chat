import { v4 as uuidv4 } from "uuid";
import { getMsgHistory, sendMsg, receiveMsg, createRoom } from "./chat";

describe("Chat interfaces", () => {
  const senderId = 1;
  const receiverId = 100;
  const roomId = uuidv4();
  const msgId = 10000;

  it("should send msg", async () => {
    const msg = await sendMsg(senderId, receiverId, roomId, "hello world");

    expect(msg.id).toBe(msgId);
  });

  it("should get history", async () => {
    const msgHistory = await getMsgHistory(roomId);

    msgHistory.forEach((msg) => {
      expect(msg.roomId).toBe(roomId);
      expect(msg.senderId === senderId || msg.receiverId === senderId).toBe(
        true
      );
    });
  });

  it("receive msg", async () => {
    while ((await receiveMsg(senderId, roomId)) !== null) {
      // do nothing
    }
  });

  it("should create room", async () => {
    const roomId = await createRoom();

    expect(roomId).toBeDefined();
  });
});
