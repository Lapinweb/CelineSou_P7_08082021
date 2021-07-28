const Comment = require('../models/comment');

exports.modifyComment = (req, res, next) => {
    Comment.update({ content: req.body.content }, { where: { id: req.params.id } })
    .then(() => res.status(200).json({ message: 'Commentaire modifié !' }))
    .catch(error => res.status(400).json({ error }));
};

exports.deleteComment = (req, res, next) => {
    Comment.destroy({ where: { id: req.params.id }} )
        .then(() => res.status(200).json({ message: 'Commentaire supprimé !' }))
        .catch(error => res.status(400).json({ error }));
};