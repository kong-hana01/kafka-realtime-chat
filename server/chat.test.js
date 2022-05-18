import { getMsgHistory, sendMsg, receiveMsg } from "./chat";

describe("Chat interfaces", () => {
  const senderId = 1;
  const receiverId = 100;
  const roomId = 1000;
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
});
