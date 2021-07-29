require('dotenv').config();
const User = require('../models/user');

const bcrypt = require('bcrypt');
const cryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            //définie les paramètres pour le cryptage de l'email
            const key = cryptoJS.enc.Hex.parse(process.env.CRYPTO_KEY);
            const iv = cryptoJS.enc.Hex.parse(process.env.CRYPTO_IV);

            User.create({
                email: cryptoJS.AES.encrypt(req.body.email, key, {iv: iv}).toString(),
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
    User.findOne({ where: { email: req.body.email } })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }

            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe invalide !' });
                    }
                    res.status(200).json({
                        userId: user.id,
                        token: jwt.sign(
                            { userId: user.id },
                            process.env.TOKEN_KEY,
                            { expiresIn: '2h'}
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.deleteAccount = (req, res, next) => {
    User.destroy({ where: { id: req.params.id }} )
        .then(() => res.status(200).json({ message: 'Utilisateur supprimé !' }))
        .catch(error => res.status(400).json({ error }));
};

exports.getUser = (req, res, next) => {
    User.findOne({ where: { id: req.params.id } })
        .then(user => res.status(200).json(user))
        .catch(error => res.status(400).json({ error }));
};