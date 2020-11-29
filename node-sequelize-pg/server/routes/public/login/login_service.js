const bcrypt = require('bcryptjs');

const { veifyUser, updateToken } = require('../../../DBs/User_DB.js');
const { jwtToken } = require('../../../../server/utils/jwt');

async function validateUser(data) {
  let user = await veifyUser(data.username);
  if (user.length == 0) {
    throw new Error(`Unable to find your account. Please Register.`);
  }

  //? Check if password is correct
  const passwordsMatch = await bcrypt.compare(data.password, user.password);
  if (!passwordsMatch) {
    throw new Error('Invalid email and/or password!');
  }
  console.log('+++++++++ Password Verified ++++++++++++++');

  //? Generate token
  const token = jwtToken.sign({
    userid: user.userid,
    email: user.email,
    name: user.name,
    id: user.id
  });
  await updateToken(user.id, token);
  return { token };
}

module.exports = {
  validateUser,
};
