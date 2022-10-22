const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../modals/user');

const protect = asyncHandler(async (req, res, next) =>{
 
    let token;
    
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
             //get token from header
             token = req.headers.authorization.split(' ')[1]; 
             //verify token
             const decodedToken = jwt.verify(token, process.env.JWT_KEY);
             //get user from token
             req.user = await User.findById(decodedToken.id).select('-password');
                                 
             next();
        } catch (error) {
            console.log(error);
            res.status(401);
            throw new Error('Not Authorized!');
        }
    }
    if (!token) {
        res.status(403);
        throw new Error('Not Authorized!, no token'); 
    }

});

module.exports = {protect}