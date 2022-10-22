//const express = require('express');
const mongoose = require('mongoose');

const connectDb = async () =>{

    try {  


         const conn=  mongoose.connect(process.env.MONGO_URI);
        
         console.log('MongoDb Connected!');

    } catch (error) {
       
         console.log(error);
         process.exit(1);

    }

} 

module.exports = { connectDb }
