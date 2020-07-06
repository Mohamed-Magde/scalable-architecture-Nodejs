'use strict';
const registerController = require('../../controllers/apis/register');
const loginController = require('../../controllers/apis/login');
const passport = require('passport');
const dashboardService = require('../../services/dashboard/dashboard');
const express = require('express');
let router = express.Router();

router.use('/register', registerController);
router.use('/login', loginController);
router.get('/', passport.authenticate('jwt', { session: false }), dashboardService.getDashboard);
module.exports = router;