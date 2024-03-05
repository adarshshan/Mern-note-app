const express = require('express');
const { registerAdmin,
    loginAdmin,
    getUserList,
    getUserById,
    updateUser,
    deleteUser,
    addedUser } = require('../Controllers/adminController');
const { adminProtect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', registerAdmin);
router.post('/login', loginAdmin);
router.get('/user-list', getUserList);
router.get('/:id', getUserById)
    .put('/:id', adminProtect, updateUser)
    .delete('/:id', adminProtect, deleteUser)
router.post('/add-user', adminProtect, addedUser);

module.exports = router;