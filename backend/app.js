const express = require('express');
const sequelize = require('./database');
const cors = require("cors");
const helmet = require("helmet");
const path = require('path');

const app = express();

const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');

app.use(cors());

app.use(helmet());

app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/user', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);

module.exports = app;
