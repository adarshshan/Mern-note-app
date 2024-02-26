const express = require('express');
const { registerUser } = require('../Controllers/userController');
const router = express.Router();

router.route('/').post(registerUser);

module.exports = router;