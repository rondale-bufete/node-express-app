const Users = require('../models/users')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d'})
}

// LOGIN USER
const loginUser = async (req, res) => {
    
    const {email, password} = req.body

    try {
     const user = await Users.login(email, password)
        
        if(!user){
            return res.status(400).json({error: error.message})
        }
        // GENERATE USER TOKEN
        const token = createToken(user._id)

         res.status(200).json({
            name: user.name,
            email: user.email,
            token: token
         })
    } catch(error) {
        return res.status(400).json({error: error.message})
    }
}

// SIGN UP USER
const signUpUser = async (req, res) => {
    const {name, email, password} = req.body

    try {
        const user = await Users.signup(name, email, password)
        
        if(!user){
            return res.status(400).json({error: error.message})
        }
        // GENERATE USER TOKEN
        const token = createToken(user._id)

         res.status(200).json({
            email: user.email,
            name: user.name, 
            token: token
        })
    } catch(error) {
        return res.status(400).json({error: error.message})
    }

    
}

module.exports = { loginUser, signUpUser}