const connectionDb = require('../middleware/connect');
const datePubli = require('../middleware/date');
const commentModel = require('../models/commentModel');

exports.createComment = (req, res, next) => {
    const publiId = req.params.id;
    const content = req.body.comments;
    const publiAt = datePubli;
    
    commentModel.insert(publiId, content, publiAt)
        .then(result => {
            res.status(200).json({ message: result });
        })
        .catch(errorMessage => {
            res.status(404).json({ error: errorMessage });
        });
};

exports.deleteComment = (req, res, next) => {
    const id = req.body.id;
    connectionDb.query(`DELETE FROM commentaires WHERE id='${id}'`, (error, results, fields) => {
        if (error) {
            return res.status(404).json({
                message: `Ce commentaire n'existe pas.`
            });
        };
        return res.status(204).json({
            message: `Vous avez supprimé votre commentaire.`
        });
    });
};

exports.getAllCommentsFromOnePubli = (req, res, next) => {
    const id = req.params.id;
    commentModel.find(id)
        .then(result => {
            res.status(200).json({ result });
        })
        .catch(errorMessage => {
            res.status(404).json({ error: errorMessage });
        });
};