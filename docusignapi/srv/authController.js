const express = require('express');
//const user = require('../models/User'); //Criar 
const router = express.Router();

router.get('/register', async (req, res) => {

    //Rota para cadastro
    try {

        //const user = await User.create(req.body);
        //return res.send(user);
        return res.send("Rota Cadastro de Usuário executada!");

    }
    catch ( err ){
        res.status(400).send({ error: 'Registration Failed!' });
    }

});

module.exports = app => app.use('/auth', router);