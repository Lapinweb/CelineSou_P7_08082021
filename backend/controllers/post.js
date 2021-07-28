const Post = require('../models/post');
const Comment = require('../models/comment');

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
    Post.create({
        userId: req.body.userId,
        content: req.body.content
    })
    .then(() => res.status(201).json({ message: 'Post créé !'}))
    .catch(error => res.status(400).json({ error }));
};

exports.modifyPost = (req, res, next) => {
    Post.update({ content: req.body.content }, { where: { id: req.params.id } })
        .then(() => res.status(200).json({ message: 'Post modifié !' }))
        .catch(error => res.status(400).json({ error }));
};

exports.deletepost = (req, res, next) => {
    Post.destroy({ where: { id: req.params.id }} )
        .then(() => res.status(200).json({ message: 'Post supprimé !' }))
        .catch(error => res.status(400).json({ error }));
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