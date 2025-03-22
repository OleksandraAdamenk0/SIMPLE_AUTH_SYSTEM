const express = require('express');
const {loginController, loginUser} = require('../controllers/login');
const {registerController, registerUser} = require('../controllers/register');
const verifyEmail = require("../controllers/emailConfirm");
const router = express.Router();

router.get('/login', loginController);
router.get('/register', registerController);
router.get('/verify-email', verifyEmail);

router.post('/register', registerUser);
router.post('/login', loginUser);


module.exports = router;