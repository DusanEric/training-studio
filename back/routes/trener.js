//Trebaju nam neki moduli i ovde, posto je ovo 'izolovani' modul
const express = require("express");
const {sequelize, Administrator, Treners, Clan, Placanje, Cenovnik,Trening,TreningGrupa,TreningStudio,PrijavaGrupe,Lokacija} = require("../models");
const jwt = require('jsonwebtoken');
require('dotenv').config();

//Dohvatamo router nase express aplikacije (u redu 2 je dohvacena ista instanca kao i u app.js)
const route = express.Router();

//Treba nam json() middleware
route.use(express.json());
//Treba nam i urlencoded middleware, koji ce da sredi sadrzaj url-a ako ima nase znakove i sl.
route.use(express.urlencoded({extended:true}));

function authToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (token == null) return res.status(401).json({ msg: err });
  
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

        ime: Joi.string()
        .min(1)
        .max(30)
        .required(),

        prezime: Joi.string()
        .min(1)
        .max(30)
        .required(),

        broj_telefona: Joi.string()
        .min(9)
        .max(9)
        .required(),

        email: Joi.string()
            .email()
            .min(5)
            .max(50)
            .required(), 
    });
    return JoiSchema.validate(user)
}

//Eksportujemo route objekat, da bude vidljiv u app.js
module.exports = route;

//Punimo route objekat sa handlerima ruta
//Sve rute imaju prefiks /student jer je ovaj modul tako prikljucen u app.js, sa app.use("/student", studentRoutes);

//Ruta /student
route.get("/treners", async (req, res) => {
    try{
        const svitreneri = await Treners.findAll();
        return res.json(svitreneri);
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.post("/treners", async (req, res) => {
    const { role } = req.user;
    if (role !== 'admin' ) {
        return res.sendStatus(403);
    }
    try{
        let novitrener = await Treners.create(req.body);
        res.send(novitrener);
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.delete("/treners/:id", async (req, res) => {
    const { role } = req.user;
    if (role !== 'admin' ) {
        return res.sendStatus(403);
    }
    try{
        let trener = await Treners.findByPk( req.params.id );
        await trener.destroy();
        res.send(trener);

    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.put("/treners/:id",async (req, res) => {
    const { role } = req.user;
    if (role !== 'admin' ) {
        return res.sendStatus(403);
    }
    let trener = await Treners.findByPk( req.params.id );
    trener.ime = req.body.ime;
    trener.prezime = req.body.prezime;
    trener.broj_telefona = req.body.broj_telefona;
    trener.email = req.body.email;
        await trener.save();
        res.send(trener);

});

route.get("/treners/:id", async (req, res) => {
    try{
        let trener = await Treners.findByPk( req.params.id );
        return res.json(trener);
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});