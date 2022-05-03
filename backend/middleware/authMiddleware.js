const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const protect = asyncHandler(async (req, res, next) => {

    let token ;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            // from heder
            token = req.headers.authorization.split(' ')[1]

            // verify 

            const decoded = jwt.verify(token, 'password123');
            // get user id from token load

            req.user = await User.findById(decoded.id).select('-password');

            next()

        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Not authorised')
        }
    }

    if(!token){
        res.status(401);
        throw new Error('not autorised and no token')
    }
})

module.exports = {
    protect
}