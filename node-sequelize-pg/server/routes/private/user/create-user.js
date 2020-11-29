const { validateUser, signOutUser, getStatistics, getFiltersData } = require('./User_Service');
const { validateFields } = require('./validate_fields');

async function createUser(httpRequest) {
  const body = httpRequest.body;
  const { error } = validateFields(body, { nameRequired: true, emailRequired: true });

  if (error) {
    throw new Error(`${error.details[0].message}`);
  }

  const result = await validateUser(body);
  return result;
}

async function logOutUser(httpRequest) {
  const { id } = httpRequest.user;
  const result = await signOutUser(id);
  if (result[0]) {
    return 'Logged out successfully.';
  } else {
    return `Unable to log out. Try again.`;
  }
}

async function getData(httpRequest) {
  const data = await getStatistics(httpRequest.query);
  return data;
}

async function getFilters(httpRequest) {
  const filters = await getFiltersData();
  return filters;
}

module.exports = {
  createUser,
  logOutUser,
  getData,
  getFilters
};
