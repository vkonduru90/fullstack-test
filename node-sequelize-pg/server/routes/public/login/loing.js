const {validateUser} = require('./login_service');

async function checkCreds(httpRequest) {
  const body = httpRequest.body;

  if (!body.username) {
    throw new Error('username required.');
  }
  if (!body.password) {
    throw new Error('password required.');
  }
  return await validateUser(body);
}

module.exports = {
  checkCreds,
};
