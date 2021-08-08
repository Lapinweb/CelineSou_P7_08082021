require('dotenv').config();

const Post = require('../models/post');
const Comment = require('../models/comment');
const User = require('../models/user');

const fs = require('fs');

exports.getAllPosts = (req, res, next) => {
    Post.findAll({
        include: {model: User, attributes: ['firstName', 'lastName']},
        order: [['createdAt', 'DESC']] })
        .then(posts => res.status(200).json(posts))
        .catch(error => res.status(400).json({ error }));
};

exports.getPagePosts = (req, res, next) => {
    const postsPerPages = 10;
    Post.findAll({ order: [['createdAt', 'DESC']], offset: postsPerPages * (req.params.page - 1), limit: postsPerPages })
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(400).json({ error }));
}

exports.getOnePost = (req, res, next) => {
    Post.findOne({
        where: { id: req.params.id },
        include: {model: User, attributes: ['firstName', 'lastName']} })
        .then(post => res.status(200).json(post))
        .catch(error => res.status(404).json({ error }));
};

exports.createPost = (req, res, next) => {
    const postObject = req.file ?
    {
        userId: req.user.id,
        content: JSON.parse(req.body.content),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {
        userId: req.user.id,
        content: req.body.content
    };

    Post.create(postObject)
    .then(() => res.status(201).json({ message: 'Post créé !'}))
    .catch(error => res.status(400).json({ error }));
};

exports.modifyPost = (req, res, next) => {
    //cherche le post correspondant à l'id en paramètre
    Post.findByPk(req.params.id)
        .then(post => {
            //vérifie si l'id dans le token correspond à l'id du créateur du post ou si le user est administrateur
            if ( post.userId != req.user.id && req.user.isAdmin == false) {  //si non
                if (req.hasOwnProperty('file')) {  //supprime l'image enregistrée par multer si elle existe
                    fs.unlink(`images/${req.file.filename}`, () => {});
                }

                return res.status(403).json({ error: 'Seul le créateur peut modifier ce poste !'})
                
            } else {  //si oui
                const postObject = definePostObject();

                //vérifie si le post a une image ajoutée, modifiée ou supprimée
                function definePostObject() {
                    //si la requête a une image
                    if (req.hasOwnProperty('file')) {
                        //supprime l'image existante si il y en a une
                        if (post.imageUrl !== null) {
                            const filename = post.imageUrl.split('/images/')[1];
                            fs.unlink(`images/${filename}`, () => {});
                        }

                        //renvoie le corps de la requête avec un nouveau imageUrl
                        return {
                            content: JSON.parse(req.body.content),
                            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                        };
                        
                    } else {//sinon, renvoie le corps de la requête
                        return {
                            content: req.body.content                   
                        };
                    }
                };

                Post.update(postObject, { where: { id: req.params.id } })
                .then(() => res.status(200).json({ message: 'Post modifié !' }))
                .catch(error => res.status(400).json({ error }));
            }
        })
        .catch(error => res.status(404).json({ error }));
};

exports.deletePost = (req, res, next) => {
    //cherche le post correspondant à l'id en paramètre
    Post.findByPk(req.params.id)
        .then(post => {
            //vérifie si l'id dans le token correspond à l'id du créateur du post ou si le user est administrateur
            if (post.userId !== req.user.id && req.user.isAdmin == false) {
                return res.status(403).json({ error: 'Seul le créateur peut supprimer ce poste !'});
            }

            //supprime les commentaires du post
            Comment.destroy({ where: {postId: req.params.id} });

            //supprime l'image du post si elle existe puis supprime le post
            if (post.imageUrl !== null) {
                const filename = post.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    Post.destroy({ where: { id: req.params.id }} )
                    .then(() => res.status(200).json({ message: 'Post supprimé !' }))
                    .catch(error => res.status(400).json({ error }));
                });
            } else {  //ou supprime le post directement
                Post.destroy({ where: { id: req.params.id }} )
                .then(() => res.status(200).json({ message: 'Post supprimé !' }))
                .catch(error => res.status(400).json({ error }));                
            }
        })
        .catch(error => res.status(404).json({ error }));
};

exports.getAllComments = (req, res, next) => {
    Comment.findAll({ where: { postId: req.params.id }})
        .then(comments => res.status(200).json(comments))
        .catch(error => res.status(400).json({ error }));
};

exports.createComment = (req, res, next) => {
    Comment.create({
        userId: req.user.id,
        postId: req.params.id,
        content: req.body.content
    })
    .then(() => res.status(201).json({ message: 'Commentaire créé !' }))
    .catch(error => res.status(404).json({ error }));
};