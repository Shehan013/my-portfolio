const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const educationRouters = require('./routes/education');

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api/education', educationRouters);
app.use(helmet());

app.get('/',(req, res) => {
    res.json({ message: 'API is working'});
});

module.exports = app;