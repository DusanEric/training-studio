//Trebaju nam neki moduli i ovde, posto je ovo 'izolovani' modul
const express = require("express");
const {sequelize, Administrator, Trener, Clans, Placanjes, Cenovniks,Trening,TreningGrupa,TreningStudio,PrijavaGrupe,Lokacija} = require("../models");
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

        iznos: Joi.integer()
        .min(1)
        .max(30)
        .required(),

        racun: Joi.string()
        .min(12)
        .max(12)
        .required(),

        cenovnikID: Joi.integer()
        .min(1)
        .max(2)
        .required(),

        clanID: Joi.integer()
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
route.get("/placanjes", async (req, res) => {
    const { role } = req.user;
    if (role !== 'admin' ) {
        return res.sendStatus(403);
    }
    try{
        const svaplacanja = await Placanjes.findAll({include: [Cenovniks,Clans]});
        return res.json(svaplacanja);
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.post("/placanjes", async (req, res) => {
    const { role } = req.user;
    if (role !== 'admin' ) {
        return res.sendStatus(403);
    }
    try{
        let novoPlacanje = await Placanjes.create(req.body);
        res.send(novoPlacanje);
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.delete("/placanjes/:id", async (req, res) => {
    const { role } = req.user;
    if (role !== 'admin' ) {
        return res.sendStatus(403);
    }
    try{
        let placanje = await Placanjes.findByPk( req.params.id );
        await placanje.destroy();
        res.send(placanje);

    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.put("/placanjes/:id",async (req, res) => {
    const { role } = req.user;
    if (role !== 'admin' ) {
        return res.sendStatus(403);
    }
    let placanje = await Placanjes.findByPk( req.params.id );
        placanje.iznos = req.body.iznos;
        placanje.racun = req.body.racun;
        placanje.cenovnikID = req.body.cenovnikID;
        placanje.clanID = req.body.clanID;
        placanje.status = req.body.status;
        await placanje.save();
        res.send(placanje);

});

route.get("/placanjes/:id", async (req, res) => {
    const { role } = req.user;
    if (role !== 'admin') {
        return res.sendStatus(403);
    }
    try{
        let placanje = await Placanjes.findByPk( req.params.id );
        return res.json(placanje);
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});