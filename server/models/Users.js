export default function (sequelize, DataTypes) {
  const Users = sequelize.define(
    "Users",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      password: {
        type: DataTypes.STRING(128),
      },
      username: {
        type: DataTypes.STRING(128),
        unique: true,
      },
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci",
      tableName: "Users",
      timestamps: true,
      paranoid: true,
    }
  );

  return Users;
}
