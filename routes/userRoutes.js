const express = require('express')

const {loginUser, signUpUser } = require('../controllers/userController')

const router = express.Router()


// LOGIN ROUTE
router.post('/login', loginUser)

// SIGN UP ROUTE
router.post('/signup', signUpUser)


module.exports = router