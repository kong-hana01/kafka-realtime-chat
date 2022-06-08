import Sequelize from "sequelize";

export default function (sequelize, DataTypes) {
  const Rooms = sequelize.define(
    "Rooms",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci",
      tableName: "Rooms",
      timestamps: true,
      paranoid: true,
    }
  );

  Rooms.belongsTo(sequelize.Users, {
    foreignKey: "senderId",
    uniqueKey: "UniqueSenderIdReceiverId",
  });
  Rooms.belongsTo(sequelize.Users, {
    foreignKey: "receiverId",
    uniqueKey: "UniqueSenderIdReceiverId",
  });

  return Rooms;
}
