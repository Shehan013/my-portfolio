const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const educationRouters = require('./routes/education');
const projectRouters = require('./routes/projectRoutes');
const techSkillRouters = require('./routes/techSkillRoutes');
const leaderhipRouters = require('./routes/leadershipRoutes');

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api/education', educationRouters);
app.use('/api/projects', projectRouters);
app.use('/api/techSkills', techSkillRouters);
app.use('/api/leadership', leaderhipRouters);

app.use(helmet());

app.get('/',(req, res) => {
    res.json({ message: 'API is working'});
});

module.exports = app;