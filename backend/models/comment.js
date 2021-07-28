const Sequelize = require('sequelize');
const sequelize = require('../database');

const Comment = sequelize.define('comment', {
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
    postId : {
        type : Sequelize.INTEGER,
        allowNull : false
    },
    content : {
        type : Sequelize.TEXT,
        allowNull : false
    }    
});

module.exports = Comment;