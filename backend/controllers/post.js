const Post = require('../models/post');
const Comment = require('../models/comment');

const fs = require('fs');

exports.getAllPosts = (req, res, next) => {
    Post.findAll()
        .then(posts => res.status(200).json(posts))
        .catch(error => res.status(400).json({ error }));
};

exports.getOnePost = (req, res, next) => {
    Post.findOne({ where: { id: req.params.id } })
        .then(post => res.status(200).json(post))
        .catch(error => res.status(400).json({ error }));
};

exports.createPost = (req, res, next) => {
    const postObject = req.file ?
    {
        ...JSON.parse(req.body.post),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body.post };

    Post.create(postObject)
    .then(() => res.status(201).json({ message: 'Post créé !'}))
    .catch(error => res.status(400).json({ error }));
};

exports.modifyPost = (req, res, next) => {
    //vérifie si le post a une image ajouté ou modifié
    const postObject = req.file ?   
    (
        //si oui, supprime l'image...
        Post.findOne({ where: { id: req.params.id } })
        .then(post => {
            if (post.imageUrl) {
                const filename = post.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    Post.destroy({ where: { id: req.params.id }} )
                    .then(() => res.status(200).json({ message: 'Post supprimé !' }))
                    .catch(error => res.status(400).json({ error }));
                });
            }
        })
        .catch(error => res.status(500).json({ error })),

        //...et renvoie le corps de la requête avec un nouveau imageUrl
        {
        ...JSON.parse(req.body.post),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        }
    ): {...req.body.post}; //si non, renvoie le corps de la requête

    console.log(postObject);
    
    Post.update(postObject, { where: { id: req.params.id } })
        .then(() => res.status(200).json({ message: 'Post modifié !' }))
        .catch(error => res.status(400).json({ error }));
};

exports.deletePost = (req, res, next) => {
    Post.findOne({ where: { id: req.params.id } })
        .then(post => {
            if (post.imageUrl) {
                const filename = post.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    Post.destroy({ where: { id: req.params.id }} )
                    .then(() => res.status(200).json({ message: 'Post supprimé !' }))
                    .catch(error => res.status(400).json({ error }));
                });
            } else {
                Post.destroy({ where: { id: req.params.id }} )
                .then(() => res.status(200).json({ message: 'Post supprimé !' }))
                .catch(error => res.status(400).json({ error }));                
            }
        })
        .catch(error => res.status(500).json({ error }));
};

exports.getAllComments = (req, res, next) => {
    Comment.findAll({ where: { postId: req.params.id }})
        .then(comments => res.status(200).json(comments))
        .catch(error => res.status(400).json({ error }));
};

exports.createComment = (req, res, next) => {
    Comment.create({
        userId: req.body.userId,
        postId: req.params.id,
        content: req.body.content
    })
    .then(() => res.status(201).json({ message: 'Commentaire créé !' }))
    .catch(error => res.status(400).json({ error }));
};