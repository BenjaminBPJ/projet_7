const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connectToSql = require ('./middleware/connect')
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());
//app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api', userRoutes);
app.use('/api', postRoutes);
app.use('*',(req, res) => { res.status(400).json({error:`Cette route n'existe pas`})});


module.exports = app;
