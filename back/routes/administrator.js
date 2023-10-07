//Trebaju nam neki moduli i ovde, posto je ovo 'izolovani' modul
const express = require("express");
const {sequelize, Administrators, Trener, Clan, Placanje, Cenovnik,Trening,TreningGrupa,TreningStudio,PrijavaGrupe,Lokacija} = require("../models");
const jwt = require('jsonwebtoken');
const { response } = require("express");
require('dotenv').config();
const Joi = require('joi');

//Dohvatamo router nase express aplikacije (u redu 2 je dohvacena ista instanca kao i u app.js)
const route = express.Router();

//Treba nam json() middleware
route.use(express.json());
//Treba nam i urlencoded middleware, koji ce da sredi sadrzaj url-a ako ima nase znakove i sl.
route.use(express.urlencoded({extended:true}));

function authToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (token == null) return res.status(401).json((err)=>{ msg: err });
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    
        if (err) return res.status(403).json({ msg: err });
    
        req.user = user;
    
        next();
    });
}

route.use(authToken);

function validateUser(user)
{
    const JoiSchema = Joi.object({

        username: Joi.string()
                  .min(1)
                  .max(30)
                  .required(), 

        pass: Joi.string()
               .min(4)
               .max(30)
               .required(),

    });
    return JoiSchema.validate(user)
}

//Eksportujemo route objekat, da bude vidljiv u app.js
module.exports = route;

//Punimo route objekat sa handlerima ruta
//Sve rute imaju prefiks /student jer je ovaj modul tako prikljucen u app.js, sa app.use("/student", studentRoutes);

//Ruta /student
route.get("/administrators", async (req, res) => {

    const { role } = req.user;
    if (role !== 'admin') {
        return res.sendStatus(403);
    }
    try{
        const sviadmini = await Administrators.findAll();
        return res.json(sviadmini);
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.post("/administrators", async (req, res) => {
    const { role } = req.user;
    if (role !== 'admin' ) {
        return res.sendStatus(403);
    }
    try{
        let noviAdmin = await Administrators.create(req.body);
        response = validateUser(noviAdmin);
        if(response.errored){
            console.log(response.errored.message);
        }else {
            res.send(noviAdmin);
        }
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.delete("/administrators/:id", async (req, res) => {
    const { role } = req.user;
    if (role !== 'admin' ) {
        return res.sendStatus(403);
    }
    try{
        let admin = await Administrators.findByPk( req.params.id );
        await admin.destroy();
        res.send(admin);

    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.get("/administrators/:id", async (req, res) => {
    try{
        let admin = await Administrators.findByPk( req.params.id );
        return res.json(admin);
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.put("/administrators/:id", async (req, res) => {
    const { role } = req.user;
    if (role !== 'admin' ) {
        return res.sendStatus(403);
    }
    try{
        let admin = await Administrators.findByPk( req.params.id );
        admin.username = req.body.username;
        admin.pass = req.body.pass;
        await admin.save();
        res.send(admin);

    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});