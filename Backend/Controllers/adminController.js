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
    try {
        const { email, password } = req.body;
        const admin = await Admin.findOne({ email });
        if (admin && admin.matchPassword(password)) {
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
    } catch (error) {
        console.log(error);
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

module.exports = {
    registerAdmin,
    loginAdmin,
    getUserList
}