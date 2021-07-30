const Comment = require('../models/comment');
const User = require('../models/user');

exports.modifyComment = (req, res, next) => {
    //cherche le commentaire qui correspond à l'id en paramètre
    Comment.findOne({ where: { id: req.params.id } })
        .then(comment => {
            //vérifie si l'id dans le token correspond à l'id du créateur ou si le user est administrateur
            if ( comment.userId != req.user.id && req.user.isAdmin == false) { //si non, retourne une erreur
                return res.status(403).json({ error: 'Seul le créateur peut modifier ce commentaire !'})
            } else {  //si oui
                Comment.update({ content: req.body.content }, { where: { id: req.params.id } })
                .then(() => res.status(200).json({ message: 'Commentaire modifié !' }))
                .catch(error => res.status(400).json({ error }));                        
            }
        })
        .catch(error => res.status(404).json({ error }));
};

exports.deleteComment = (req, res, next) => {
    //cherche le commentaire qui correspond à l'id en paramètre
    Comment.findOne({ where: { id: req.params.id }})
        .then(comment => {
            //vérifie si l'id dans le token correspond à l'id du créateur ou si le user est administrateur
            if (comment.userId != req.user.id && req.user.isAdmin == false) {
                return res.status(403).json({ error: 'Seul le créateur peut supprimer ce commentaire !'})
            } else {  //si oui
                Comment.destroy({ where: { id: req.params.id }} )
                .then(() => res.status(200).json({ message: 'Commentaire supprimé !' }))
                .catch(error => res.status(400).json({ error }));
            }
        })
        .catch(error => res.status(404).json({ error }));
};