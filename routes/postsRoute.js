const express = require('express')
const { postSchema } = require('../types');
const { NewPostData } = require('../db');
const {authMiddleware} = require('./authMiddleware');
const postsRoute = express.Router()

postsRoute.get('/', (req, res) => {
    res.send('routed to postsRoute')
})

postsRoute.get('/all', authMiddleware, async (req, res) => {
    try {
        const posts = await NewPostData.find({});
        res.status(200).json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
})

postsRoute.get('/:id', authMiddleware, async (req, res) => {
    const { id } = req.params
    try {
        const findPost = await NewPostData.findById(id);
        if (!findPost) {
            return res.status(404).json({ msg: "Post not found" })
        }
        res.status(200).json(findPost)
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
})

postsRoute.post('/', async (req, res) => {
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



postsRoute.put('/:id', authMiddleware, async (req, res) => {
    const { id } = req.params
    const updatePayload = req.body
    const parsedPayload = postSchema.safeParse(updatePayload)
    if (!parsedPayload.success) {
        return res.status(400).json({ msg: "Invalid inputs" })
    }
    try {
        const updatePost = await NewPostData.findOneAndUpdate(
            { _id: id },
            { $set: parsedPayload.data },
            { new: true }
        )
        if (!updatePost) {
            return res.status(404).json({ msg: "Post not found" })
        }
        res.status(200).json({ msg: "Post updated successfully!" })
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
})

postsRoute.delete('/:id', authMiddleware, async (req, res) => {
    const { id } = req.params
    try {
        const deletePost = await NewPostData.findByIdAndDelete(id)
        if (deletePost === null) {
            return res.status(404).json({ msg: "Post not found" })
        }
        res.status(200).json({ msg: "Post deleted successfully!" })
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
})


module.exports = postsRoute