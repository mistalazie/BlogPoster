const express = require('express');
const { postSchema } = require('../types');
const { NewPostScehma } = require('../db');
const postRoute = express.Router();

postRoute.get('/', (req, res) => {
    res.send('Works')
})

postRoute.post('/newpost', async (req, res) => {
    const postPayload = req.body;
    const parsedPayload = postSchema.safeParse(postPayload)
    if(!parsedPayload.success) {
        return res.status(400).json({msg: "Missing title or description"})
    }
    try {
        const newPost = await NewPostScehma.create(parsedPayload.load)
        res.status(200).json({msg: "Successfully created post", post: newPost})
    } catch(error) {
        console.error('Error creating post:', error);
        res.status(500).json({ msg: "Internal Server Error" });
    }

})

module.exports = postRoute;