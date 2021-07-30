require('dotenv').config();
const User = require('../models/user');

const bcrypt = require('bcrypt');
const cryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

exports.signup = (req, res, next) => {
    //hashe le mot de passe
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            //définie les paramètres pour le cryptage de l'email
            const key = cryptoJS.enc.Hex.parse(process.env.CRYPTO_KEY);
            const iv = cryptoJS.enc.Hex.parse(process.env.CRYPTO_IV);

            //crée une nouvelle instance de User
            User.create({
                email: cryptoJS.AES.encrypt(req.body.email, key, {iv: iv}).toString(), //crypte l'email
                password: hash,
                firstName: req.body.firstName,
                lastName: req.body.lastName
            })
            .then(() => res.status(201).json({ message: 'Utilisateur créé !'}))
            .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
    //cherche le user qui correspond à l'email
    User.findOne({ where: { email: req.body.email } })
        .then(user => {
            if (!user) { //si le user n'existe pas
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }

            //compare le hash des mots de passe
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {  //si le mot de passe est invalide
                        return res.status(401).json({ error: 'Mot de passe invalide !' });
                    }
                    res.status(200).json({
                        userId: user.id,
                        token: jwt.sign(
                            { userId: user.id },
                            process.env.TOKEN_KEY,
                            { expiresIn: '24h'}
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.deleteAccount = (req, res, next) => {
    //cherche le user qui correspond à l'id en paramètre
    User.findOne({ where: {id: req.params.id} })
        .then(oneUser => {
            //vérifie si l'id correspond à l'id du token stocké dans req.id ou si l'utilisateur est administrateur
            if (oneUser.id !== req.user.id) {
                return res.status(403).json({ error: "Seul l'utilisateur peut supprimer son compte !"})
            } else {
                User.destroy({ where: { id: req.params.id }} )
                    .then(() => res.status(200).json({ message: 'Utilisateur supprimé !' }))
                    .catch(error => res.status(400).json({ error }));
            }
        })
        .catch(error => res.status(400).json({ error }));

};

exports.getUser = (req, res, next) => {
    User.findOne({ where: { id: req.params.id } })
        .then(user => res.status(200).json(user))
        .catch(error => res.status(400).json({ error }));
};