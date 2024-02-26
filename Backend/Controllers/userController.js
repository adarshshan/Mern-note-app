const asyncHandler = require('express-async-handler');
const User = require('../Model/userModel');


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
        })
    } else {
        res.status(400);
        throw new Error('Error occured');
    }
});

module.exports = {
    registerUser
}