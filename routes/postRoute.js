const express = require('express');
const { postSchema } = require('../types');
const { NewPostData } = require('../db');
const postRoute = express.Router();

postRoute.get('/', async (req, res) => {
    try {
        const posts = await NewPostData.find({});
        res.status(200).json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
})

postRoute.post('/newpost', async (req, res) => {
    const postPayload = req.body;
    const parsedPayload = postSchema.safeParse(postPayload)
    if (!parsedPayload.success) {
        return res.status(400).json({ msg: "Missing title or description" })
    }
    try {
        const newPost = await NewPostData.create(parsedPayload.data)
        res.status(200).json({ msg: "Successfully created post", post: newPost })
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ msg: "Internal Server Error" });
    }

})

postRoute.delete('/delete/:id', async (req, res) => {
    const { id } = req.params
    try {
        const deletePost = await NewPostData.findByIdAndDelete(id)
        res.status(200).json({ msg: "Post deleted successfully!" })
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
})

module.exports = postRoute;