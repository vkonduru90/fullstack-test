const db = require('../models');
const { Sequelize } = require('sequelize');

async function userNameExists(userName) {
  const user = await db.Users.findOne({ where: { email: userName } });
  if (user) {
    return user;
  }
  return null;
}

async function createUser(data) {
  const user = await db.Users.create(data);
  return user;
}

async function veifyUser(username) {
  return await db.Users.findOne({
    where: {
      email: username,
    },
  });
}

async function updateToken(id, token) {
  return await db.Users.update(
    { token },
    {
      where: {
        id: id,
      },
    },
  );
}

async function getStatisticsData(query) {
  const queryKeys = Object.keys(query);
  const whereCondition = {};
  if (queryKeys.length > 0) {
    queryKeys.forEach((key) => {
      if (query[key]) {
        whereCondition[key] = query[key];
      }
    });
  }
  return await db.Statistics.findAll({
    where: whereCondition,
    raw: true,
    attributes: ['name', 'label', ['value', 'y']],
  });
}

async function getDataForFilters(query) {
  // return await db.Statistics.findAll('name', ['DISTINCT', 'name'], { plain: false }); // ({whereCondition, raw: true, attributes: ['name', 'label' , ['value', 'y']]});
  return await db.Statistics.findAll({
    attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('name')), 'name']],
  });
}

module.exports = {
  userNameExists,
  createUser,
  veifyUser,
  updateToken,
  getStatisticsData,
  getDataForFilters,
};
