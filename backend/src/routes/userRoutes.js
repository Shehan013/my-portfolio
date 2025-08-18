const express = require('express');
const router = express.Router();

let users = [];

router.post('/',(req, res) => {
    const user = { 
        id: users.length+1,
        ...req.body
    }
    users.push(user);
    res.status(201).json({message: 'User created' , user});
});

router.get('/',(req, res) => {
    res.json(users);
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const updatedUser = req.body;
    users[id] = updatedUser;
    res.json({message: 'User updated', updatedUser});
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    users.splice(id, 1);
    res.json({ message: 'User Deleted!'});
});

module.exports = router;