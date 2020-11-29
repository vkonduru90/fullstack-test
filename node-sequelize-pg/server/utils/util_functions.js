const bcrypt = require('bcryptjs');

async function generateRandomString() {
  return Math.random().toString(36).slice(2);
}

async function generateHash(string) {
  // encrypt the password
  const salt = await bcrypt.genSalt(10);
  const stringHash = await bcrypt.hash(string, salt);
  return stringHash;
}

module.exports = {
  generateRandomString,
  generateHash,
};
