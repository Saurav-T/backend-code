const User = require('../models/userModel')

const bcrypt = require('bcrypt')

const Token = require('../models/TokenModel')
const crypto = require('crypto')
const sendMail = require('../middleware/emailSender')

exports.register = async(req, res)=>{
    //check if username is availabale
let usernameExists = await User.findOne({username: req.body.username})
if(usernameExists){
    return res.status(400).json({error: "Usrname not available"})
}
    //check if email is already registered
    let emailExists = await User.findOne({email: req.body.username})
if(emailExists){
    return res.status(400).json({error: "Usrname not available"})
}

    //encrypt password
let saltRounds = 10
let salt = await bcrypt.genSalt(saltRounds)
let hashed_password = await bcrypt.hash(req.body.password, salt)

    //save user
let user = await User.create({
    username: req.body.username,
    email: req.body.email,
    password: hashed_password
})

if(!user){
    return res.status(400).json({error: "someting went wrong"})
}

let token = await Token.create({
    token : crypto.randomBytes(24).toString('hex'),
    user: user._id
})

if(!token){
    return res.status(400).json({error: "someting went wrong"})
}

const URL = `https://localhost:5000/verify/${token.token}`
sendMail({
    from: 'no-reply@something.com',
    to: req.body.email,
    subject: 'Verification Email',
    text: 'Thank you for Registration',
    html: `<a href='${URL}'><button>Verify Now</button></a>`
})

res.send(user)
    //send email
    //send message to user
}

exports.verifyEmail = async(req, res) => {
    //  check if token is valid
    let token = await Token.findOne({token: req.params.token})

    if(!token){
        return res.status(400).json({error: "Invalid Token"})
    }

    //  find user

    let user = await User.findById(token.user)
    if(!user){
        return res.status(400).json({error: "User not found"})
    }

    //  check if user is already verified

    if(user.isVerified){
        return res.status(400).json({error: "Email already verified"})
    }
    //  verify user
    user.isVerified = true
    user = await user.save()
    //  send message to user

    res.send({message: "Email verified successfully"})
}

exports.forgetpassword = async (req,res) => {
    let user = await User.findOne({email: req.body.email})

    // Check if user is verified
    if(!user){
        return res.status(400).json({error: "User not found"})
    }

    // Generate Password Reset Token
    let token = await Token.create({
        token: crypto.randomBytes(24).toString('hex'),
        user: user._id
    })

    if(!token){
        return res.status(400).json({error: "Error generating token"})
    }

    const URL = `http://localhost:5000/resetpassword/${token.token}`

    sendMail({
        from: 'no-reply@something.com',
        to: req.body.email,
        subject: "Password Reset",
        text: "You requested a password reset" + URL,
        html: `<a href='${URL}'><button>Reset Password</button></a>`
    })
}

exports.resetPassword = async(req,res)=>{
    //check if token is valid
    let token = await Token.findOne({token: req.params.token})
    if(!token){
        return res.status(400).json({error: "invalid token or token may have xpoires"})
    }
    let saltRounds = 10
    let salt = await bcrypt.genSalt(saltRounds)
    let hashed_password = await bcrypt.hash(req.body.password, salt)

    user.password = hashed_password

    user = await user.save()

    res.send({message: "Password reset successfully"})
    
}