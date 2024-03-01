const express = require('express');
const { registerUser, authUser, updateUserProflie } = require('../Controllers/userController');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');

router.route('/').post(registerUser);
router.route('/login').post(authUser);
router.route('/profile').post(protect, updateUserProflie);

module.exports = router;