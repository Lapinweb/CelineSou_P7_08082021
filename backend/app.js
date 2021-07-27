const express = require('express');
const sequelize = require('./database');

const app = express();

const User = require('./models/user');
const Post = require('./models/post');
const Comment = require('./models/comment');

User.hasMany(Post);
User.hasMany(Comment);
Post.hasMany(Comment);

sequelize.sync()
.then((res) => {
    console.log(res);
})
.catch((err) => {
    console.log(err);
});

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

module.exports = app;
