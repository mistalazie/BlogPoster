const express = require('express')
const { NewUserData } = require('../db');
const { signUpSchema, loginSchema } = require('../types');
const authRoute = express.Router()

const jwt = require('jsonwebtoken')

const JWT_SECRET = require('../config/config')

authRoute.post('/signup', async (req, res) => {
    const signUpPayload = req.body;
    const parsedPayload = signUpSchema.safeParse(signUpPayload);
    if (!parsedPayload.success) {
        return res.status(400).json({ msg: "Invalid Input" });
    }
    try {
        const newUser = await NewUserData.create(parsedPayload.data);
        res.status(200).json({ msg: "Sign-up Successful!", user: newUser });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
})

authRoute.post('/login', async (req, res) => {
    const loginPayload = req.body;
    const parsedPayload = loginSchema.safeParse(loginPayload)
    if (!parsedPayload.success) {
        console.error('Error')
        return res.status(400).json({ msg: "Invalid Input" });

    }
    try {
        const { username, password } = parsedPayload.data
        const user = await NewUserData.findOne({ username })
        if (!user || user.password !== password) {
            return res.status(400).json({ msg: "Invalid username or password" })
        }
        const token = jwt.sign({ userId: user._id }, JWT_SECRET)
        res.status(200).json({ msg: "Login Successful!", token })
    } catch (error) {
        console.error('Error authenticating users:', error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
})

authRoute.post('/logout', (req, res) => {

})

authRoute.post('/refresh', (req, res) => {

})

authRoute.get('/user', (req, res) => {

})

authRoute.get('/', (req, res) => {
    res.send('routed to authRoute')
})

module.exports = authRoute