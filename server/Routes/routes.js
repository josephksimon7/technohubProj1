const express = require('express');
// Creating router object
const router = new express.Router();
const user = require('../Controllers/userLogic');
const jwtMiddleware = require("../Middleware/jwtMiddleware");
const emailVerification = require("../Controllers/emailControl");
const phoneController = require("../Controllers/phoneControl")

// User register
router.post('/user/register', user.register);

// User login
router.post('/user/login', user.login);


//admin 
router.post("/api/dummyRoute", jwtMiddleware, user.dummyAPI);
 

//email verify
router.post("/emailGeneration",emailVerification.sendEmail);
router.post("/emailverification",emailVerification.verifyOtp);

router.post("/potp",phoneController.sendPhoneOtp);
router.post("/votp",phoneController.verifyOtp);
module.exports = router; 