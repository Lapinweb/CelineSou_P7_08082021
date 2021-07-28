require('dotenv').config();

const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  logging : false
});


try {
  sequelize.authenticate();
  console.log('Connexion à MySQL réussie.');
}
catch (error) {
  console.error('Connexion à MySQL échouée :', error);
}

module.exports = sequelize;