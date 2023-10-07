//Trebaju nam neki moduli i ovde, posto je ovo 'izolovani' modul
const express = require("express");
const {sequelize, Administrator, Trener, Clan, Placanje, Cenovnik,Trening,TreningGrupa,TreningStudios,PrijavaGrupe,Lokacijas} = require("../models");
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

        naziv: Joi.string()
        .min(1)
        .max(30)
        .required(),

        lokacijaID: Joi.integer()
        .min(1)
        .max(2)
        .required(),
 
    });
    return JoiSchema.validate(user)
}

//Eksportujemo route objekat, da bude vidljiv u app.js
module.exports = route;

//Punimo route objekat sa handlerima ruta
//Sve rute imaju prefiks /student jer je ovaj modul tako prikljucen u app.js, sa app.use("/student", studentRoutes);

//Ruta /student
route.get("/treningStudios", async (req, res) => {
    try{
        const sveTeretane = await TreningStudios.findAll({include: [Lokacijas]});
        return res.json(sveTeretane);
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.post("/treningStudios", async (req, res) => {
    const { role } = req.user;
    if (role !== 'admin' ) {
        return res.sendStatus(403);
    }
    try{
        let noviStudio = await TreningStudios.create(req.body);
        res.send(noviStudio);
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.delete("/treningStudios/:id", async (req, res) => {
    const { role } = req.user;
    if (role !== 'admin' ) {
        return res.sendStatus(403);
    }
    try{
        let studio = await TreningStudios.findByPk( req.params.id );
        await studio.destroy();
        res.send(studio);

    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.put("/treningStudios/:id",async (req, res) => {
    const { role } = req.user;
    if (role !== 'admin' ) {
        return res.sendStatus(403);
    }
    let studio = await TreningStudios.findByPk( req.params.id );
    studio.naziv = req.body.naziv;
    studio.lokacijaID = req.body.lokacijaID;
        await studio.save();
        res.send(studio);

});

route.get("/treningStudios/:id", async (req, res) => {
    const { role } = req.user;
    if (role !== 'admin' ) {
        return res.sendStatus(403);
    }
    try{
        let studio = await TreningStudios.findByPk( req.params.id );
        return res.json(studio);
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});