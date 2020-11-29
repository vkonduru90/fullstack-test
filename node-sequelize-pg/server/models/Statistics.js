module.exports = (sequelize, DataTypes, schema) => {
  const Statistics  = sequelize.define(
    'Statistics',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: DataTypes.STRING },
      label: { type: DataTypes.STRING, allowNull: false },
      value: { type: DataTypes.INTEGER, allowNull: false },
    },
    { schema: schema },
  );
  Statistics.associate = function (models) {
    // associations can be defined here
  };
  return Statistics;
};
