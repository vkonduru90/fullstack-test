const { createUser, updateToken, getStatisticsData, getDataForFilters } = require('../../../DBs/User_DB');
const _ = require('lodash');

async function validateUser(data) {
  const user = await createUser(data);
  return user;
}

async function signOutUser(id) {
  const user = await updateToken(id, '');
  return user;
}

async function getStatistics(query) {
  const data = await getStatisticsData(query);
  const groupByYear = _.groupBy(data, 'name');
  console.log(groupByYear);
  const nameKeys = Object.keys(groupByYear);
  const returnData = [];
  nameKeys.forEach((key) => {
    returnData.push({
      name: key,
      dataPoints: groupByYear[key],
    });
  });
  return returnData;
}

async function getFiltersData() {
  return await getDataForFilters();
}

module.exports = {
  validateUser,
  signOutUser,
  getStatistics,
  getFiltersData
};
