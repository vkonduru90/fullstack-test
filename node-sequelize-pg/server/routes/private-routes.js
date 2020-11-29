const express = require('express');
const TelcoMiddleware = require('./telco-middleware');
const { createUser, logOutUser, getData, getFilters } = require('./private/user/create-user');

const router = express.Router();

router.post('/user', TelcoMiddleware(createUser));
router.post('/logout', TelcoMiddleware(logOutUser));
router.get('/data', TelcoMiddleware(getData));
router.get('/filters', TelcoMiddleware(getFilters));


module.exports = router;
