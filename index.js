const express = require('express')
const userRoute = require('./routes/userRoute')
const postRoute = require('./routes/postRoute')
const app = express()

app.use(express.json()) //is a middleware 

app.listen(3000, ()=> {
    console.log("Server running")
})

app.use('/users', userRoute)

app.use('/posts', postRoute)