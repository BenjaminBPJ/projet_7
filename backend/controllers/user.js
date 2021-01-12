const connectionDb = require('../middleware/connect')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
            connectionDb.query(sql, user, (error, result, fields) => {
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
            error: `Impossible de créer un utilisateur`
        }))
};

exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    const sql = `SELECT * FROM users WHERE email='${email}'`;

    connectionDb.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        bcrypt
        .compare(password, result[0].password)
        .then((valid) => {
            if (!valid) {
                return res.status(401).json({
                    error: 'Mot de passe incorrect.'
                });
            }
            res.status(200).json({
                userPseudo: result[0].pseudo,
                userId: result[0].id,
                token: jwt.sign({
                    userId: result[0].id
                }, 'RANDOM_TOKEN_SECRET', {
                    expiresIn: '24h'
                })
            })
        })
        .catch(error => res.status(401).json({
            error: 'Utilisateur non trouvé.'
        }))
});
};

exports.deleteUser = (req, res, next) => {
    const userId = req.params.id;

    connectionDb.query(`DELETE FROM users WHERE id=${userId}`, (error, results, fields) => {
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



exports.updateUser = (req, res, next) => {
    bcrypt
        .hash(req.body.password, 10)
        .then((hash) => {
            const email = req.body.email;
            const firstname = req.body.firstname;
            const lastname = req.body.lastname;
            const pseudo = req.body.pseudo;
            const password = hash;
            const description = req.body.description;
            const id = req.params.id;

            const sql = `UPDATE Users SET firstName='${firstname}', lastName='${lastname}', pseudo='${pseudo}', password='${password}', email='${email}', description='${description}' WHERE id=${id};`

            connectionDb.query(sql, (error, result) => {
                if (error) {
                    return res.status(403).json({
                        error: `Veuillez à modifier un utilisateur existant.`
                    })
                };
                return res.status(201).json({
                    message: `L'utilisateur a été modifié.`
                })
            });
        })
        .catch((error) => res.status(500).json({ error }));
};

