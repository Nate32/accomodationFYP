const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
// Register new user 
// @route Post api/users
//@access  public 

const registerUser = asyncHandler (async(req, res) => {
    
    const {name, email, password} = req.body;

    if(!name || !email || !password){
        res.status(400);
        throw new Error('please enter values');
    } 

    const userExists = await User.findOne({email})

    if(userExists){
        res.status(400)
        throw new Error('User already exists')

    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
        name, email, password: hashedPassword
    })

    if(user){
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('invalid user data')
    }
})

// login  user 
// @route Post api/users/login
//@access  public 

const loginUser = asyncHandler (async (req, res) => {
    const {email, password} = req.body
    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password, user.password))){
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email, 
            token: generateToken(user._id)
        })
    } else{
        res.status(400)
        throw new Error('wrong credential')
    }
})

// get user 
// @route GET api/users/me
//@access  priavte 

const getUser = asyncHandler (async (req, res) => {
    res.status(200).json(req.user)
})

// generate jwt

const generateToken = (id) => {
    return jwt.sign({id}, 'password123', {
        expiresIn: '30d',
    } )
} 

module.exports = {
    registerUser,
    loginUser, 
    getUser 
}