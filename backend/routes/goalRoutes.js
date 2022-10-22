const express = require('express');
const { protect } = require('../authmiddleware/authMiddleware');
const { getGoals, setGoal, updateGoal, deleteGoal } = require('../controllers/goalController');
const router= express.Router();

 router.get('/', protect, getGoals);
 router.put('/:id',protect, updateGoal);
 router.post('/', protect, setGoal);
 router.delete('/:id', protect, deleteGoal);
 


module.exports = router 