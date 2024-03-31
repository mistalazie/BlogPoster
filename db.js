require('dotenv').config()
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection;

db.on('error', (error) => {
    console.error('Database connection error:', error);
});

db.once('connected', () => {
    console.log('Database connected');
});

const signUpSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const postSchema = mongoose.Schema({
    title: String,
    description: String
})

const NewUserData = mongoose.model('UserData', signUpSchema)
const NewPostData = mongoose.model('PostData', postSchema)

module.exports = {NewUserData, NewPostData}