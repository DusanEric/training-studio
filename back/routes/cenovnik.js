//Trebaju nam neki moduli i ovde, posto je ovo 'izolovani' modul
const express = require("express");
const {sequelize, Administrator, Trener, Clan, Placanje, Cenovniks,Trenings,TreningGrupa,TreningStudio,PrijavaGrupe,Lokacija} = require("../models");
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

        cena: Joi.string()
                  .min(1)
                  .max(30)
                  .required(), 

        treningID: Joi.integer()
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
route.get("/cenovniks", async (req, res) => {
    try{
        const sveCene = await Cenovniks.findAll({ include:  [Trenings] });
        return res.json(sveCene);
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.post("/cenovniks", async (req, res) => {
    const { role } = req.user;
    if (role !== 'admin' ) {
        return res.sendStatus(403);
    }
    try{
        let novaCena = await Cenovniks.create(req.body);
        res.send(novaCena);
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.delete("/cenovniks/:id", async (req, res) => {
    const { role } = req.user;
    if (role !== 'admin' ) {
        return res.sendStatus(403);
    }
    try{
        let cena = await Cenovniks.findByPk( req.params.id );
        await cena.destroy();
        res.send(cena);

    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.get("/cenovniks/:id", async (req, res) => {
    try{
        let cena = await Cenovniks.findByPk( req.params.id ,{ include:  [Trenings] });
        return res.json(cena);
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.put("/cenovniks/:id", async (req, res) => {
    const { role } = req.user;
    if (role !== 'admin' ) {
        return res.sendStatus(403);
    }
    try{
        let cenovnik = await Cenovniks.findByPk( req.params.id );
        cenovnik.cena = req.body.cena;
        cenovnik.treningID = req.body.treningID;
        await cenovnik.save();
        res.send(cenovnik);

    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});