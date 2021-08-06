require('dotenv').config();
const User = require('../models/user');

const bcrypt = require('bcrypt');
const cryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
const MaskData = require('maskdata');
const fs = require('fs');

exports.signup = (req, res, next) => {
    //voir le model User pour la validation et le cryptage des données
    User.create({
        email: req.body.email,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    })
    .then(() => res.status(201).json({ message: 'Utilisateur créé !'}))
    .catch(error => res.status(400).json({ error }));
};

exports.login = (req, res, next) => {
    //définie les paramètres pour le cryptage de l'email
    const key = cryptoJS.enc.Hex.parse(process.env.CRYPTO_KEY);
    const iv = cryptoJS.enc.Hex.parse(process.env.CRYPTO_IV);

    //cherche le user qui correspond à l'email
    User.findOne({ where: { email: cryptoJS.AES.encrypt(req.body.email, key, {iv: iv}).toString() } }) //compare les emails cryptés
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
                        isAdmin: user.isAdmin,
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
    User.findByPk(req.params.id)
        .then(user => {
            //vérifie si l'id correspond à l'id du token stocké dans req.id ou si l'utilisateur est administrateur
            if (user.id !== req.user.id) {
                return res.status(403).json({ error: "Seul le propriétaire du compte peut le supprimer !"})
            } else {
                //supprime l'image du profile si elle existe
                if (user.imageUrl !== null) {
                    const filename = user.imageUrl.split('/images/')[1];
                            fs.unlink(`images/${filename}`, () => {
                                User.destroy({ where: { id: req.params.id }} )
                                    .then(() => res.status(200).json({ message: 'Utilisateur supprimé !' }))
                                    .catch(error => res.status(400).json({ error }));
                            });
                } else {  //ou supprime l'utilisateur directement
                    User.destroy({ where: { id: req.params.id }} )
                                    .then(() => res.status(200).json({ message: 'Utilisateur supprimé !' }))
                                    .catch(error => res.status(400).json({ error }));
                }

            }
        })
        .catch(error => res.status(400).json({ error }));

};

exports.getUser = (req, res, next) => {
    User.findByPk(req.params.id)
        .then(user => {
            //définie les paramètres pour le décryptage des données utilisateurs
            const key = cryptoJS.enc.Hex.parse(process.env.CRYPTO_KEY);
            const iv = cryptoJS.enc.Hex.parse(process.env.CRYPTO_IV);
            const email = cryptoJS.AES.decrypt(user.email, key, {iv: iv}).toString(cryptoJS.enc.Utf8);

            //masque l'email
            const emailMask2Options = {
                maskWith: "*", 
                unmaskedStartCharactersBeforeAt: 1,
                unmaskedEndCharactersAfterAt: 0,
                maskAtTheRate: false
            };
            const maskedEmail = MaskData.maskEmail2(email, emailMask2Options);
            
            res.status(200).json({email: maskedEmail, firstName: user.firstName, lastName: user.lastName, imageUrl: user.imageUrl})
        })
        .catch(error => res.status(400).json({ error }));
};

exports.modifyProfilePicture = (req, res, next) => {
    User.findByPk(req.params.id)
        .then(user => {
            //vérifie si l'id dans le token correspond à l'id utilisateur
            if ( user.id != req.user.id ) {  //si non
                if (req.hasOwnProperty('file')) {  //supprime l'image enregistrée par multer si elle existe
                    fs.unlink(`images/${req.file.filename}`, () => {
                        return res.status(403).json({ error: 'Seul le propriétaire peut modifier sa photo de profil !'})
                    });
                }
            } else {
                //supprime l'image existante si il y en a une
                if (user.imageUrl !== null) {
                    const filename = user.imageUrl.split('/images/')[1];
                            fs.unlink(`images/${filename}`, () => {});
                }
                User.update(
                    {imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`},
                    { where: { id: req.params.id } }
                )
                .then(() => res.status(200).json({ message: 'Image de profile modifié !' }))
                .catch(error => { 
                    console.log(error);
                    res.status(400).json({ error }) 
                });
            }
        })
        .catch(error => res.status(400).json({ error }));
}