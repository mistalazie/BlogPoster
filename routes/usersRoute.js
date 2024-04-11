const express = require('express')
const usersRoute = express.Router()

usersRoute.get('/', (req, res) =>{
    res.send('routed to usersRoute')
})

module.exports = usersRoute