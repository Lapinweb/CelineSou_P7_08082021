const Sequelize = require('sequelize');
const sequelize = require('../database');
const User = require('./user');

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

Post.belongsTo(User)

module.exports = Post;