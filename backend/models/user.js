require('dotenv').config();

const bcrypt = require('bcrypt');
const cryptoJS = require('crypto-js');

const Sequelize = require('sequelize');
const sequelize = require('../database');

const User = sequelize.define('user', {
    id : {
        type : Sequelize.INTEGER,
        autoIncrement : true,
        allowNull : false,
        primaryKey : true
    },
    email : {
        type : Sequelize.STRING,
        allowNull : false,
        unique : true,
        validate: {
            isEmail: {
            msg: "L'email est invalide !",
            logging: console.log
            }
        }
    },
    password : {
        type : Sequelize.STRING,
        allowNull : false,
        validate: {
            isStrongPassword: {
                msg: 'Le mot de passe doit faire au moins 8 lettres, avoir une majuscule, une minuscule, un chiffre et un symbole !',
                logging: console.log
            }
        }
    },
    isAdmin : {
        type : Sequelize.BOOLEAN,
        defaultValue : false
    },
    firstName : {
        type : Sequelize.STRING,
        allowNull : false,
        validate: {
            isAlpha: {
                args: ['fr-FR', {ignore: ' -'}]
            }
        }
    },
    lastName : {
        type : Sequelize.STRING,
        allowNull : false,
        validate: {
            isAlpha: {
                args: ['fr-FR', {ignore: ' -'}]
            }
        }
    },
    imageUrl : {
        type: Sequelize.STRING,
    }
},{
    updatedAt: false,
    hooks: {
        beforeCreate: async (user) => {
            user.password = await bcrypt.hash(user.password, 10);

            const key = cryptoJS.enc.Hex.parse(process.env.CRYPTO_KEY);
            const iv = cryptoJS.enc.Hex.parse(process.env.CRYPTO_IV);
            user.email = cryptoJS.AES.encrypt(user.email, key, {iv: iv}).toString();
            return user;
        }
    }
});

module.exports = User;