//Trebaju nam neki moduli i ovde, posto je ovo 'izolovani' modul
const express = require("express");
const {sequelize, Administrators, Trener, Clans, Placanje, Cenovnik,Trening,TreningGrupas,TreningStudio,PrijavaGrupes,Lokacija} = require("../models");
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

        clanID: Joi.integer()
        .min(1)
        .max(2)
        .required(),

        treningGrupaID: Joi.integer()
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
route.get("/prijavaGrupes", async (req, res) => {
    try{
        const sveprijave = await PrijavaGrupes.findAll({include: [Clans,TreningGrupas]});
        return res.json(sveprijave);
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.post("/prijavaGrupes", async (req, res) => {
    try{
        let novaPrijava = await PrijavaGrupes.create(req.body);
        res.send(novaPrijava);
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.delete("/prijavaGrupes/:id", async (req, res) => {
    const { role } = req.user;
    if (role !== 'admin' ) {
        return res.sendStatus(403);
    }
    try{
        let prijava = await PrijavaGrupes.findByPk( req.params.id );
        await prijava.destroy();
        res.send(prijava);

    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.put("/prijavaGrupes/:id",async (req, res) => {
    const { role } = req.user;
    if (role !== 'admin' ) {
        return res.sendStatus(403);
    }
    let prijava = await PrijavaGrupes.findByPk( req.params.id );
        prijava.clanID = req.body.clanID;
        prijava.treningGrupaID = req.body.treningGrupaID;
        prijava.status = req.body.status;
        await prijava.save();
        res.send(prijava);

});

route.get("/prijavaGrupes/:id", async (req, res) => {
    try{
        let prijava = await PrijavaGrupes.findByPk( req.params.id );
        return res.json(prijava);
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});