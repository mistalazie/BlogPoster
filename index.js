const express = require('express')
const mainRouter = require('./routes/index')
const app = express()

app.use(express.json()) //is a middleware 

app.listen(3000, ()=> {
    console.log("Server running")
})

app.use('/api', mainRouter)

