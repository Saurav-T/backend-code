const { register, verifyEmail, forgetpassword, resetPassword } = require('../controller/userController')
const router = require('./productRoute')

const express = require('express').Router()

router.post('/register', register)
router.post('/verify/:token', verifyEmail)
router.post('/forgetpassword', forgetpassword)
router.post('/resetpassword', resetPassword)


module.exports = router