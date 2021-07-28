const express = require('express');
const sequelize = require('./database');

const app = express();

const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');

const User = require('./models/user');
const Post = require('./models/post');
const Comment = require('./models/comment');

User.hasMany(Post);
User.hasMany(Comment);
Post.hasMany(Comment);

sequelize.sync();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(express.json());

app.use('/api/auth', userRoutes);
app.use('/api/posts', postRoutes);

module.exports = app;
