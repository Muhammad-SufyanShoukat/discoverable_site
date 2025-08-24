const express = require('express');
const router = express.Router();
const authRoutes = require('./auth');
const userRoutes = require('./user');
const adminRoutes = require('./admin');
const guestUserRoutes = require('./guestUser');
const {ApiAuthValidator} = require('../middleware/authValidator/index');


router.use('/auth', /* #swagger.tags = ['Authentication'] */ authRoutes);
router.use('/user', /* #swagger.tags = ['User APIs'] */ ApiAuthValidator.validateAccessToken, userRoutes);
router.use('/admin', /* #swagger.tags = ['Admin APIs'] */ ApiAuthValidator.validateAccessToken, adminRoutes);
router.use('/guestUser', /* #swagger.tags = ['Authentication'] */ guestUserRoutes);

module.exports = router;
