require('dotenv').config();

const sequelize = require('../database');
const { RateLimiterMySQL } = require('rate-limiter-flexible');

const consecutiveRateLimiter = new RateLimiterMySQL({
    storeClient: sequelize,
    dbName: process.env.DB_DATABASE,
    tableName: 'consecutive_login',
    points: 5,
    duration: 60 * 60, //en secondes, la limite est actualisé après 1h
    blockDuration: 60 * 15,  //bloque pendant 15 min
});

const slowRateLimiter = new RateLimiterMySQL({
    storeClient: sequelize,
    dbName: process.env.DB_DATABASE,
    tableName: 'slow_login',
    points: 50,
    duration: 60 * 60 * 24, //en secondes, la limite est actualisé après 24h
    blockDuration: 60 * 60 * 24,  //bloque pendant 24h
});

const rateLimiter = (req, res, next) => {
    const username = req.body.email;
    const ip = req.ip;
    slowRateLimiter.consume(`${username}_${ip}`) //soustrait 1 point
        .then(() => {
            consecutiveRateLimiter.consume(`${username}_${ip}`) //soustrait 1 point
                .then(() => {
                    next();
                })
                .catch(() => {
                    res.status(429).json({ error :'Trop de requêtes consécutives envoyées !' })
                });
        })
        .catch(() => {
            res.status(429).json({ error: 'Trop de requêtes envoyées dans la journée !' })
        });
};

module.exports = rateLimiter;
