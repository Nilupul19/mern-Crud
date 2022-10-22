const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../modals/user');




//Register user
const registerUser = asyncHandler(async(req,res) =>{
    
    const { name,email,password } = req.body;

    if (!name || !email || !password) {
        res.status(400);
        throw new Error('please enter all fields'); 
    }
    //check if user exists
    const isUserExists = await User.findOne({email});
    if (isUserExists) {
        res.status(400);
        throw new Error('user already exists');
    }
    //hash the password
    const salt = await bcrypt.genSalt(10);
    const hashPw = await bcrypt.hash(password, salt);
    //register user
    const user = await User.create({
       name,
       email,
       password: hashPw 
    });
    if (user) {
        res.status(201);  
        res.json([user,
            {
                token: generateToken(user._id)
            }
            ]);
    }
    else{
        res.status(400);
        throw new Error( 'Invalid User Data!'); 
    }
});

//Authenticate user login
const userLogIn = asyncHandler(async(req,res) =>{

    
    const {email,password} = req.body;

//find user by email
const user = await User.findOne({email});


    if (user &&(await bcrypt.compare(password, user.password))) {
        res.status(200);
      
        res.json([user,
        {
            token: generateToken(user._id)
        }
        ]);

    }else {
        res.status(400);
        throw new Error('Invalid user credentials!'); 
    }
});

//Get logged user
const loggedUser = asyncHandler(async(req,res) =>{
    const { _id, name, email} = await User.findById(req.user.id);

    res.status(200).json({
        id: _id,
        name,
        email,

    })
    

});

//Generate jwt token
const generateToken = (id) =>{
    return jwt.sign({id}, process.env.JWT_KEY,{
      expiresIn: '700d'
    });
}


module.exports = {registerUser, userLogIn, loggedUser}