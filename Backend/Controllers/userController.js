const asyncHandler = require('express-async-handler');
const User = require('../Model/userModel');
const generateToken = require('../utils/generateToken');


const registerUser = asyncHandler(async (req, res) => {
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
            token: generateToken(user._id)
        })
    } else {
        res.status(400);
        throw new Error('Error occured');
    }
});

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && user.matchPassword(password)) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id)
        })
    } else {
        res.status(400);
        throw new Error('Invalid username or password!');
    }
});

module.exports = {
    registerUser,
    authUser
}