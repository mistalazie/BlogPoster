const express = require('express')
const router = express.Router()
const authRoute = require('./authRoute')
const postsRoute = require('./postsRoute')
const usersRoute = require('./usersRoute')

router.get('/', (req, res) => {
    res.send('routed here')
})

router.use('/auth', authRoute)
router.use('/posts', postsRoute)
router.use('/users', usersRoute)


module.exports = router