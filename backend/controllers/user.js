const connectionDb = require('../middleware/connect');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passwordIsValide = require('../middleware/goodpassword');
const emailIsValide = require('../middleware/goodemail');
const fs = require('fs');
require('dotenv').config();
const userModel = require('../models/userModel');

exports.signup = (req, res, next) => {
    if (!emailIsValide.goodEmail(req.body.email) && !passwordIsValide.goodPassword(req.body.password)) {
        return res.status(401).json({ message: 'Votre adresse mail doit être correcte et votre mot de passe doit contenir au moins un chiffre, une minuscule, une majuscule et être composé de 8 caractères minimum !  ' });
    };
    if (!emailIsValide.goodEmail(req.body.email)) {
        return res.status(401).json({ message: 'Votre adresse mail doit être correcte ' });
    };
    if (!passwordIsValide.goodPassword(req.body.password)) {
        return res.status(401).json({ message: 'Votre mot de passe doit contenir au moins un chiffre, une minuscule, une majuscule et être composé de 8 caractères minimum !' });
    };
    bcrypt
        .hash(req.body.password, 10)
        .then((hash) => {
            const email = req.body.email;
            const firstName = req.body.firstName;
            const lastName = req.body.lastName;
            const password = hash;
            const user = `
                    ('${email}',
                    '${firstName}',
                    '${lastName}',
                    '${password}'
                    )`;

            userModel.insert(user)
                .then(insertIntoUser => {
                    userModel.findByEmail(email)
                        .then(result => {
                            res.status(200).json({
                                userId: result[0].id,
                                token: jwt.sign({
                                    userId: result[0].id
                                }, process.env.JWT_TOKEN, {
                                    expiresIn: '24h'
                                })
                            });
                        })
                        .catch(errorMessage => {
                            res.status(404).json({ error: errorMessage });
                        });
                })
                .catch(errorMessage => {
                    res.status(404).json({ error: errorMessage });
                });
        })
        .catch((error) => res.status(403).json({ error: `Impossible de créer un utilisateur` }))
};


exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    userModel.findByEmail(email)
        .then(getUser => {
            bcrypt
                .compare(password, getUser[0].password)
                .then((valid) => {
                    if (!valid) {
                        return res.status(401).json({
                            error: 'Mot de passe incorrect.'
                        });
                    };
                    res.status(200).json({
                        userId: getUser[0].id,
                        token: jwt.sign({
                            userId: getUser[0].id
                        }, process.env.JWT_TOKEN, {
                            expiresIn: '24h'
                        })
                    });
                })
                .catch(error => res.status(404).json({
                    error: 'Utilisateur non trouvé.'
                }));
        })
        .catch(errorMessage => {
            res.status(404).json({ error: 'utilisateur non trouvé' });
        });
};

exports.deleteUser = (req, res, next) => {
    const user = req.params.id;

    connectionDb.query(`DELETE FROM users WHERE id='${user}'`, (error, results, fields) => {
        if (error) {
            return res.status(404).json({
                message: `Cet utilisateur n'existe pas.`
            });
        };
        return res.status(204).json({
            message: `Vous avez supprimé votre profil.`
        });
    });
};

exports.updateDescription = (req, res, next) => {
    const description = req.body.description;
    const id = req.params.id;

    userModel.updateDescription(description, id)
        .then(update => {
            res.status(200).json({ message: update });
        })
        .catch(errorMessage => {
            res.status(404).json({ error: errorMessage });
        });
};

exports.updatePhoto = (req, res, next) => {
    if (!req.files) {
        return res.status(400).json({error: 'Aucun fichier téléchargé.'});
    };

    const file = req.files.uploadImage;  // uploadImage = clef = nom de l'input coté front
    const fileName = Date.now() + file.name;
    const id = req.params.id;
    const userId = req.userIdAuth;

    userModel.checkUserId(id, userId)
        .then(goodId => {
            userModel.findPhoto(id)
                .then(oldPhoto => {
                    fs.unlink(`avatars/${oldPhoto[0].imageUrl}`, () => {
                        userModel.updatePhoto(fileName, id)
                            .then(update => {
                                if (file.mimetype == "image/jpeg" || file.mimetype == "image/png") {
                                    file.mv('avatars/' + fileName, (err) => {
                                        if (err) {
                                            return res.status(500).json({err});
                                        } else {
                                            res.status(200).json({ message: update });
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


exports.getUser = (req, res, next) => {
    const id = req.params.id;
    userModel.findById(id)
        .then(result => {
            res.status(200).json({ result });
        })
        .catch(errorMessage => {
            res.status(404).json({ error: errorMessage });
        });
};