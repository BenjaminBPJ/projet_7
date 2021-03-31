const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connectToSql = require ('./middleware/connect')
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const path = require('path');
const fileUpload = require('express-fileupload');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'null');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/avatars', express.static(path.join(__dirname, 'upload')));
app.use(fileUpload());
app.use('/api', userRoutes);
app.use('/api', postRoutes);
app.use('*',(req, res) => { res.status(400).json({error:`Cette route n'existe pas`})});


module.exports = app;
