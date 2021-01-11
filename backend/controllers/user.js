const connectionDb = require('../middleware/connect')
const bcrypt = require('bcrypt');
//const jwt = require('jsonwebtoken');

exports.signup = (req, res, next) => {
    bcrypt
        .hash(req.body.password, 10)
        .then((hash) => {
            const email = req.body.email;
            const firstname = req.body.firstname;
            const lastname = req.body.lastname;
            const pseudo = req.body.pseudo;
            const password = hash;
            const user = `
                    ('${email}',
                    '${firstname}',
                    '${lastname}',
                    '${pseudo}',
                    '${password}'
                    )`;

            const sql = `INSERT INTO users (email, lastName, firstName, pseudo, password) VALUES ${user} `;
            connectionDb.query(sql, user, (error, result) => {
                if (error) {
                    return res.status(403).json({
                        message: error
                    })
                };
                return res.status(201).json({
                    message: `L'utilisateur ${pseudo} vient d'être ajouté aux profils.`
                })
            });
        })
        .catch((error) => res.status(403).json({
            error: `Veuillez créer un utilisateur`
        }))
};
