const asyncHandler = require('express-async-handler');
const { Error } = require('mongoose');
const Goal = require('../modals/goal');
const User = require('../modals/user');

const getGoals = asyncHandler(async(req,res)=>{
        
      const goals = await Goal.find({user: req.user.id}); 
        

        res.status(200).json(goals);
});

const setGoal = asyncHandler(async(req,res)=>{
    if(!req.body.text){
    res.status(400);
    throw new Error('please add text')
    }
    
    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id, 
    })

    res.status(201).json(goal); 
});

const updateGoal = asyncHandler(async(req,res)=>{
    
    const currentGoal = await Goal.findById(req.params.id);

    if(!currentGoal){
        res.status(400);
        throw new Error('goal not found');
    }

    const user = await User.findById(req.user.id);

    //check user loggedin or not
    if (!user) {
        res.status(401);
        throw new Error('user not loggedin!')
    }
    //check user match with the goal
    if (currentGoal.user.toString() !== user.id) {
        res.status(401);
        throw new Error('forbidden!, user not allowed!')
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id,req.body,{
        new: true 
    });

    res.status(200).json(updatedGoal);
 });

    const deleteGoal = asyncHandler(async(req,res)=>{
    
    const existingGoal = await Goal.findById(req.params.id);

    if (!existingGoal) {
    res.status(400);
    throw new Error('goal not found');
    }

    const user = await User.findById(req.user.id);

    //check user loggedin or not
    if (!user) {
        res.status(401);
        throw new Error('user not loggedin!');
    }
    //check user match with the goal
    if (existingGoal.user.toString() !== user.id) {
        res.status(401);
        throw new Error('forbidden!, user not allowed!');
    }

    await Goal.remove();
    res.status(200).json({id :req.params.id});
 });
 
module.exports= { getGoals, setGoal, updateGoal, deleteGoal }   