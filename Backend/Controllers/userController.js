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

const updateUserProflie = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.pic = req.body.pic || user.pic;

        if (req.body.password) {
            user.password = req.body.password;
        }
        const updateUser = await user.save();
        res.json({
            _id: updateUser._id,
            name: updateUser.name,
            email: updateUser.email,
            pic: updateUser.pic,
            token: generateToken(updateUser._id)
        })
    } else {
        res.status(404);
        throw new Error('User Not Found!');
    }
})
module.exports = {
    registerUser,
    authUser,
    updateUserProflie
}