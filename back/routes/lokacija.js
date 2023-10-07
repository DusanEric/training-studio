//Trebaju nam neki moduli i ovde, posto je ovo 'izolovani' modul
const express = require("express");
const {sequelize, Administrator, Trener, Clan, Placanje, Cenovnik,Trening,TreningGrupa,TreningStudio,PrijavaGrupe,Lokacijas} = require("../models");
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

        lokacija: Joi.string()
        .min(1)
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
route.get("/lokacijas", async (req, res) => {
    try{
        const svelokacije = await Lokacijas.findAll();
        return res.json(svelokacije);
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.post("/lokacijas", async (req, res) => {
    const { role } = req.user;
    if (role !== 'admin' ) {
        return res.sendStatus(403);
    }
    try{
        let novaLokacija = await Lokacijas.create(req.body);
        res.send(novaLokacija);
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.delete("/lokacijas/:id", async (req, res) => {
    const { role } = req.user;
    if (role !== 'admin' ) {
        return res.sendStatus(403);
    }
    try{
        let lokacija = await Lokacijas.findByPk( req.params.id );
        await lokacija.destroy();
        res.send(lokacija);

    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.put("/lokacijas/:id",async (req, res) => {
    const { role } = req.user;
    if (role !== 'admin' ) {
        return res.sendStatus(403);
    }
    let lokacija = await Lokacijas.findByPk( req.params.id );
        lokacija.lokacija = req.body.lokacija;
        await lokacija.save();
        res.send(lokacija);

});

route.get("/lokacijas/:id", async (req, res) => {
    try{
        let lokacija = await Lokacijas.findByPk( req.params.id );
        return res.json(lokacija);
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});