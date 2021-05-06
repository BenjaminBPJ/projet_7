const datePubli = require('../middleware/date');
const postModel = require('../models/postModel');
const fs = require('fs');

exports.createPost = (req, res, next) => {
    let postObject = req.file ?
        { ...JSON.parse(req.body.post), imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` }
        : { ...req.body, imageUrl: null };
        
    postObject = { ...postObject, userId: req.jwtToken.userId };

    postModel.insert(postObject)
        .then(result => {
            res.status(200).json({ result });
        })
        .catch(errorMessage => {
            res.status(404).json({ error: errorMessage });
        });
};


exports.deletePost = (req, res, next) => {
    const id = req.params.id;
    const userId = req.jwtToken.userId;

    postModel.checkUserId(id, userId)
        .then(goodId => {
            postModel.findPhoto(id)
                .then(oldPhoto => {
                    fs.unlink(`images/${oldPhoto[0].imageUrl}`, () => {
                        postModel.delete(id)
                            .then(deletePost => {
                                res.status(200).json({ message: deletePost });
                            })
                            .catch(errorMessage => {
                                res.status(404).json({ error: errorMessage });
                            });
                    });
                })
                .catch(errorMessage => {
                    res.status(404).json({ error: errorMessage });
                });
        })
        .catch(errorMessage => {
            res.status(404).json({ error: errorMessage });
        });
};

exports.getAllPosts = (req, res, next) => {
    postModel.findAll()
        .then(result => {
            res.status(200).json({ result });
        })
        .catch(errorMessage => {
            res.status(404).json({ error: errorMessage });
        });
};

exports.getPost = (req, res, next) => {
    const id = req.params.id;

    postModel.find(id)
        .then(result => {
            res.status(200).json({ result });
        })
        .catch(errorMessage => {
            res.status(404).json({ error: errorMessage });
        });
};

exports.modifyPost = (req, res, next) => {
    const userId = req.jwtToken.userId
    const id = req.params.id;
    const datePublication = datePubli;
    const imageUrl = `${req.protocol}://${req.get('host')}/images/${req.files.imageUrl}`;


    const postObject = req.file ?
        {
            ...JSON.parse(req.body.post),
            imageUrl: imageUrl
        } : { ...req.body };

    const titre = req.body.post.title;
    const publication = req.body.post.content;

    postModel.update(userId, datePublication, titre, publication, imageUrl, id)
        .then(result => {
            res.status(200).json({ result });
        })
        .catch(errorMessage => {
            res.status(404).json({ error: errorMessage });
        });
};

//id, userId, datePublication, titre, publication, imageUrl
