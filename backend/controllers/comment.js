const connectionDb = require('../middleware/connect');
const datePubli = require('../middleware/date');
const commentModel = require('../models/commentModel');

exports.createComment = (req, res, next) => {
    const publiId = req.params.idPost;
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
    const id = req.params.id;
    const userId = req.jwtToken.userId;

    commentModel.checkUserId(id, userId)
        .then(goodId => {
            commentModel.delete(id)
                .then(result => {
                    res.status(200).json({ message: result });
                })
                .catch(errorMessage => {
                    res.status(404).json({ error: errorMessage });
                });
        })
        .catch(errorMessage => {
            res.status(404).json({ error: errorMessage });
        });
};

exports.modifyComment = (req, res, next) => {
    const commentId = req.params.id;
    const content = req.body.comments;
    const userId = req.jwtToken.userId;

    commentModel.checkUserId(commentId, userId)
        .then(goodId => {
            commentModel.modify(content, commentId)
                .then(result => {
                    res.status(200).json({ message: result });
                })
                .catch(errorMessage => {
                    res.status(404).json({ error: errorMessage });
                });
        })
        .catch(errorMessage => {
            res.status(404).json({ error: errorMessage });
        });
};

exports.getAllCommentsFromOnePubli = (req, res, next) => {
    const id = req.params.idPost;

    commentModel.find(id)
        .then(result => {
            res.status(200).json({ result });
        })
        .catch(errorMessage => {
            res.status(404).json({ error: errorMessage });
        });
};