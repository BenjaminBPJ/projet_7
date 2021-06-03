const datePubli = require('../middleware/date');
const postModel = require('../models/postModel');
const fs = require('fs');

exports.createPost = (req, res, next) => {
    let postObject = req.file ?
        { ...JSON.parse(req.body.post), imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` }
        : { ...req.body, imageUrl: null };

    postObject = { ...postObject, userId: req.jwtToken.userId };
    console.log(postObject)
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
                    const filename = oldPhoto[0].imageUrl.split('/images/')[1];
                    fs.unlink(`images/${filename}`, () => {
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
    const id = req.params.id;
    const userId = req.jwtToken.userId;

    let postObject = req.file ?
        { ...JSON.parse(req.body.post), imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` }
        : { ...req.body, imageUrl: null };

    postObject = { ...postObject, userId: userId, postId: id };
console.log(postObject)
console.log(req.file)
    postModel.checkUserId(id, userId)
        .then(goodId => {
            postModel.findPhoto(id)
                .then(oldPhoto => {
                    if (oldPhoto[0].imageUrl !== null && req.file) {
                        console.log('tut')
                        const filename = oldPhoto[0].imageUrl.split('/images/')[1];
                        fs.unlink(`images/${filename}`, () => {
                            postModel.update(postObject)
                                .then(result => {
                                    res.status(200).json({ result });
                                })
                                .catch(errorMessage => {
                                    res.status(404).json({ error: errorMessage });
                                });
                        });
                    } else {
                        postModel.update(postObject)
                            .then(result => {
                                res.status(200).json({ result });
                            })
                            .catch(errorMessage => {
                                res.status(404).json({ error: errorMessage });
                            });
                    };
                })
                .catch(errorMessage => {
                    res.status(404).json({ error: errorMessage });
                });
        })
        .catch(errorMessage => {
            res.status(404).json({ error: errorMessage });
        });
};

