module.exports = (sequelize, DataTypes, schema) => {
  const Users = sequelize.define(
    'Users',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      email: { type: DataTypes.STRING, unique: true, allowNull: false },
      name: { type: DataTypes.STRING },
      password: { type: DataTypes.STRING, allowNull: false },
      token: { type: DataTypes.STRING },
      is_deleted: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    { schema: schema },
  );
  Users.associate = function (models) {
    // associations can be defined here
  };
  return Users;
};
