const Sequelize = require('sequelize');
const sequelize = require('../database');
const User = require('./user');
const Comment = require('./comment');

const Post = sequelize.define('post', {
    id : {
        type : Sequelize.INTEGER,
        autoIncrement : true,
        allowNull : false,
        primaryKey : true        
    },
    userId : {
        type : Sequelize.INTEGER,
        allowNull : false
    },
    content : {
        type : Sequelize.TEXT,
        allowNull : false
    },
    imageUrl : {
        type : Sequelize.STRING,
    }
});

Post.belongsTo(User);
Post.hasMany(Comment);

module.exports = Post;