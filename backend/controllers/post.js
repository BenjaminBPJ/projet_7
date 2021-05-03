const datePubli = require('../middleware/date');
const postModel = require('../models/postModel');
const fs = require('fs');

exports.createPost = (req, res, next) => {
    /*if (!req.files) {
        return res.status(400).send('Aucun fichier téléchargé.');
    };*/

    console.log(req.post)

    //const postObject = JSON.parse(req.body.post);

    const userId = req.jwtToken.userId;
    const datePublication = datePubli;
    /*const titre = req.body.post.title;
    const publication = req.body.post.content;*/
    const imageUrl = `${req.protocol}://${req.get('host')}/images/${req.files.name}`;

    /*const post = new Post({
        userId : userId,
        datePublication: datePublication,
        ...postObject,
        titre: titre,
        publication: publication,
        file: req.files.contentImage,
        imageUrl: imageUrl
    })*/

    const publi = `
    ('${userId}',
    '${datePublication}',
    '${titre}',
    '${publication}',
    '${imageUrl}'
    )`;

    console.log(publi)
    console.log(postObject)
    console.log(titre)

    postModel.insert(publi)
        .then(result => {
            res.status(200).json({ result });
        })
        .catch(errorMessage => {
            res.status(404).json({ error: errorMessage });
        });
    /*const userId = req.jwtToken.userId
    const datePublication = datePubli;
    const titre = req.body.title;
    const publication = req.body.content;
    const file = req.files.contentImage;
    const imageUrl = Date.now() + file.name;
    const publi = `
    ('${userId}',
    '${datePublication}',
    '${titre}',
    '${publication}',
    '${imageUrl}'
    )`;

    postModel.insert(publi)
        .then(result => {
            if (file.mimetype == "image/jpeg" || file.mimetype == "image/png") {
                file.mv('images/' + imageUrl, function (err) {
                    if (err) {
                        return res.status(500).send(err);
                    } else {
                        return res.status(200).json({ message: result });
                    };
                });
            } else {
                return res.status(403).json({
                    error: `Format non autorisé, veuillez télécharger des fichiers aux formats '.png','.jpg'.`
                });
            };
        })
        .catch(errorMessage => {
            res.status(404).json({ error: errorMessage });
        });*/
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
    const imageUrl =  `${req.protocol}://${req.get('host')}/images/${req.files.name}`;

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
