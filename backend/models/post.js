const Sequelize = require('sequelize');
const sequelize = require('../database');

const Post = sequelize.define('post', {
    id : {
        type : Sequelize.INTEGER,
        autoIncrement : true,
        allowNull : false,
        primaryKey : true        
    },
    content : {
        type : Sequelize.TEXT,
        allowNull : false
    },
    imageUrl : {
        type : Sequelize.STRING,
    }
});

module.exports = Post;