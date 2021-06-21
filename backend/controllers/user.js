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
            const lastName = req.body.lastName;
            const firstName = req.body.firstName;
            const password = hash;
            const user = `
                    ('${email}',
                    '${lastName}',
                    '${firstName}',
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
                                }),
                                role: result[0].role
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
        .catch((error) => res.status(403).json({ error: `Erreur dans l'inscripton d'un utilisateur.` }))
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
                        }),
                        role: getUser[0].role
                    });
                })
                .catch(error => res.status(404).json({
                    error: 'Mot de passe incorrect, utilisateur non trouvé.'
                }));
        })
        .catch(errorMessage => {
            res.status(404).json({ error: 'Nous avons échoué à retrouver cet utilisateur.' });
        });
};

exports.deleteUser = (req, res, next) => {
    const id = req.params.id;
    const userId = req.jwtToken.userId;

    userModel.checkUserId(id, userId)
        .then(goodId => {
            userModel.findPhoto(id)
                .then(oldPhoto => {
                    if (oldPhoto[0].imageUrl !== null) {
                        fs.unlink(`images/${oldPhoto[0].imageUrl}`, () => {
                            userModel.delete(id)
                                .then(deleteUser => {
                                    res.status(200).json({ message: deleteUser });
                                })
                                .catch(errorMessage => {
                                    res.status(404).json({ error: errorMessage });
                                });
                        });
                    } else {
                        fs.unlink(`images/${oldPhoto[0].imageUrl}`, () => {
                            userModel.delete(id)
                                .then(deleteUser => {
                                    res.status(200).json({ message: deleteUser });
                                })
                                .catch(errorMessage => {
                                    res.status(404).json({ error: errorMessage });
                                });
                        });
                    };
                })
                .catch(errorMessage => {
                    res.status(404).json({ error: errorMessage });
                })
                .catch(errorMessage => {
                    res.status(404).json({ error: errorMessage });
                });
        });
};

exports.modifyUser = (req, res, next) => {
    const id = req.params.id;
    const userId = req.jwtToken.userId;

    let userObject = req.file ?
        { ...JSON.parse(req.body.description), imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` }
        : { ...req.body, imageUrl: null };

    userObject = { ...userObject, userId: userId };

    userModel.checkUserId(id, userId)
        .then(goodId => {
            userModel.findPhoto(id)
                .then(oldPhoto => {
                    if (oldPhoto[0].imageUrl !== null || oldPhoto[0].imageUrl !== req.file) {
                        const filename = oldPhoto[0].imageUrl.split('/images/')[1];
                        fs.unlink(`images/${filename}`, () => {
                            userModel.update(userObject)
                                .then(result => {
                                    res.status(200).json({ result });
                                })
                                .catch(errorMessage => {
                                    res.status(404).json({ error: errorMessage });
                                });
                        });
                    } else {
                        userModel.update(userObject)
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