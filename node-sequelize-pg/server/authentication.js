const Jwt = require('jsonwebtoken');
const { userNameExists } = require('./DBs/User_DB');
const Config = require('./config');

const TOKEN_EXPIRATION = 60 * 60 * 24 * 365 * 10;

async function authenticate(req, res, next) {
  let token = req.get(Config.server.headers.authToken);
  if (!token) {
    // can be called w/ or w/o auth, in the latter case proceed anyway
    if (req.proceedIfNotAuth) {
      return next();
    }

    req.logger.error('Authorization token missing in request body');
    return res.status(400).send('Authorization token missing in request body');
  }
  token = token.replace('Bearer ', '');
  const tokenPayload = Jwt.verify(token, Config.jwt.secretKey);

  req.tokenPayload = tokenPayload;
  req.logger = req.logger.child({ userId: tokenPayload._id });
  req.logger.info({ userId: tokenPayload._id }, 'Security token verified');
  if (!tokenPayload.email) {
    req.logger.error('Invalid token payload');
    return res.sendStatus(500);
  }

  req.logger.info('Retrieving user data...');
  const user = await userNameExists(tokenPayload.email);
  if (user.token !== token) {
    req.logger.error('Failed to verify the authorization token');
    return res.status(401).send({ message: 'Failed to Verify the user.' });
  }
  req.user = tokenPayload;
  req.user.id = user.id;
  next();
}

async function createToken(contents) {
  return Jwt.sign(contents, Config.jwt.secretKey, {
    expiresIn: TOKEN_EXPIRATION,
  });
}

function isSecure(password) {
  return password.length > 5;
}

async function createForgotPasswordToken(customer) {
  const expiration = 60 * 10;

  return Jwt.sign(
    {
      _id: customer._id,
      username: customer.name,
      verify: '$secure',
    },
    Config.jwt.secretKey,
    {
      expiresIn: expiration,
    },
  );
}

module.exports = {
  authenticate,
  createToken,
  isSecure,
  createForgotPasswordToken,
};
