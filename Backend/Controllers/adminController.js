const asyncHandler = require("express-async-handler");
const Admin = require('../Model/adminModel');
const { generateTokenForAdmin } = require("../utils/generateToken");
const User = require("../Model/userModel");

const registerAdmin = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const userExist = await Admin.findOne({ email });
    if (userExist) {
        res.status(400);
        throw new Error('User Already exists')
    }
    const admin = await Admin.create({
        name,
        email,
        password,
    })
    if (admin) {
        res.status(201).json({
            _id: admin._id,
            name: admin.name,
            email: admin.email,
            token: generateTokenForAdmin(admin._id)
        })
    } else {
        res.status(400);
        throw new Error('Error occured');
    }
})

const loginAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    console.log(admin);
    console.log(admin.matchPassword(password))
    if (admin && (await admin.matchPassword(password))) {
        console.log('hay')
        res.json({
            _id: admin._id,
            name: admin.name,
            email: admin.email,
            token: generateTokenForAdmin(admin._id)
        })
    } else {
        res.status(400);
        throw new Error('Invalid username or password!');
    }
})
const getUserList = asyncHandler(async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.log(error);
    }
})

const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        res.json(user);
    } else {
        res.status(400).json({ message: "User not found" });
    }
})

const updateUser = asyncHandler(async (req, res) => {
    const { name, email, password, pic } = req.body;
    const user = await User.findById(req.params.id);
    if (user) {
        user.name = name || user.name;
        user.email = email || user.email;
        user.pic = pic || user.pic;

        if (password) {
            user.password = password;
        }
        const updateUser = await user.save();
        res.json({
            _id: updateUser._id,
            name: updateUser.name,
            email: updateUser.email,
            pic: updateUser.pic,
            token: generateTokenForAdmin(updateUser._id)
        })
    } else {
        res.status(404);
        throw new Error('User Not Found!');
    }
})

const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        await User.deleteOne({ _id: req.params.id });
        res.json({ message: 'user removed!' });
    } else {
        res.status(404);
        throw new Error({ message: 'user not found!' });
    }
})
const addedUser = asyncHandler(async (req, res) => {
    const { name, email, password, pic } = req.body;
    const userExist = await User.findOne({ email });
    if (userExist) {
        res.status(400);
        throw new Error('User Already exists')
    }
    const user = await User.create({
        name,
        email,
        password,
        pic,
    })
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateTokenForAdmin(user._id)
        })
    } else {
        res.status(400);
        throw new Error('Error occured');
    }
})

module.exports = {
    registerAdmin,
    loginAdmin,
    getUserList,
    getUserById,
    updateUser,
    deleteUser,
    addedUser
}