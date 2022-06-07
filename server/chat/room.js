const rooms = {
  "1-2": "12",
  "2-3": "23",
  "1-3": "13",
};

const getRoomId = (senderId, receiverId) => {
  let roomKey;
  if (senderId < receiverId) {
    roomKey = `${senderId}-${receiverId}`;
  } else {
    roomKey = `${receiverId}-${senderId}`;
  }

  return rooms[roomKey];
};

export { getRoomId };
