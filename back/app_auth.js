const express = require('express');
const { sequelize, Administrators,Treners,Clans } = require('./models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

const app = express();

const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions));

app.use(express.json());

// app.post('/register', (req, res) => {

//     const obj = {
//         name: req.body.name,
//         email: req.body.email,
//         admin: req.body.admin,
//         password: bcrypt.hashSync(req.body.password, 10)
//     };

//     Administrators.create(obj).then( rows => {
        
//         const usr = {
//             userId: rows.id,
//             user: rows.name
//         };

//         const token = jwt.sign(usr, process.env.ACCESS_TOKEN_SECRET);

//         console.log(token);
        
//         res.json({ token: token });

//     }).catch( err => res.status(500).json(err) );
// });

app.post('/login', (req, res) => {

    if(req.body.type == "admin"){
        Administrators.findOne({ where: { username: req.body.username } })
            .then( usr => {

                if (req.body.pass === usr.pass) {
                    const obj = {
                        id: usr.id,
                        username: usr.username,
                        role : "admin"
                    };
            
                    const token = jwt.sign(obj, process.env.ACCESS_TOKEN_SECRET);
                    
                    res.json({ token: token });
                } else {
                    res.status(400).json({ msg: "Invalid credentials"});
                }
            })
            .catch( err => res.status(500).json(err) );
    }
    else if(req.body.type == "trener"){
        Treners.findOne({ where: { ime: req.body.username } })
            .then( usr => {

                if (req.body.pass === usr.prezime) {
                    const obj = {
                        id: usr.id,
                        ime: usr.ime,
                        broj_telefona: usr.broj_telefona,
                        email: usr.email,
                        role : "trener"
                        
                    };
            
                    const token = jwt.sign(obj, process.env.ACCESS_TOKEN_SECRET);
                    
                    res.json({ token: token });
                } else {
                    res.status(400).json({ msg: "Invalid credentials"});
                }
            })
            .catch( err => res.status(500).json(err) );
    }
    else if(req.body.type == "clan"){
        Clans.findOne({ where: { ime: req.body.username } })
            .then( usr => {

                if (req.body.pass === usr.prezime) {
                    const obj = {
                        id: usr.id,
                        ime: usr.username,
                        role : "clan"

                    };
            
                    const token = jwt.sign(obj, process.env.ACCESS_TOKEN_SECRET);
                    
                    res.json({ token: token });
                } else {
                    res.status(400).json({ msg: "Invalid credentials"});
                }
            })
            .catch( err => res.status(500).json(err) );
    }
});

app.listen({ port: 9000 }, async () => {
    console.log("Started on port 9000");
    await sequelize.authenticate();
});