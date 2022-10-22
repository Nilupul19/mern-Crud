const express = require('express');
const { protect } = require('../authmiddleware/authMiddleware');
const router = express.Router();
const { registerUser, userLogIn, loggedUser } = require('../controllers/userController');

router.post('/', registerUser);
router.post('/login', userLogIn);
router.get('/user', protect, loggedUser);








module.exports = router