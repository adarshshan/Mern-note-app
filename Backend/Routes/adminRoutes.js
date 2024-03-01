const express = require('express');
const { registerAdmin, loginAdmin, getUserList } = require('../Controllers/adminController');
const { adminProtect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', registerAdmin);
router.post('/login', loginAdmin);
router.get('/user-list', adminProtect, getUserList);

module.exports = router;