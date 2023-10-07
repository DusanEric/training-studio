//Trebaju nam neki moduli i ovde, posto je ovo 'izolovani' modul
const express = require("express");
const {sequelize, Administrator, Treners, Clan, Placanje, Cenovnik,Trenings,TreningGrupas,TreningStudios,PrijavaGrupe,Lokacija} = require("../models");
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

        grupa: Joi.integer()
        .min(1)
        .max(2)
        .required(),

        trenerID: Joi.integer()
        .min(1)
        .max(2)
        .required(),

        treningStudioID: Joi.integer()
        .min(1)
        .max(2)
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
route.get("/treningGrupas", async (req, res) => {
    try{
        const svetreningGrupe = await TreningGrupas.findAll({include: [Treners,TreningStudios,Trenings]});
        return res.json(svetreningGrupe);
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.post("/treningGrupas", async (req, res) => {
    const { role } = req.user;
    if (role !== 'admin' ) {
        return res.sendStatus(403);
    }
    try{
        let novaGrupa = await TreningGrupas.create(req.body);
        res.send(novaGrupa);
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.delete("/treningGrupas/:id", async (req, res) => {
    const { role } = req.user;
    if (role !== 'admin' ) {
        return res.sendStatus(403);
    }
    try{
        let grupa = await TreningGrupas.findByPk( req.params.id );
        await grupa.destroy();
        res.send(grupa);

    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.put("/treningGrupas/:id",async (req, res) => {
    const { role } = req.user;
    if (role !== 'admin' ) {
        return res.sendStatus(403);
    }
    let grupa = await TreningGrupas.findByPk( req.params.id );
    grupa.grupa = req.body.grupa;
    grupa.treningID = req.body.treningID;
    grupa.trenerID = req.body.trenerID;
    grupa.treningStudioID = req.body.treningStudioID;
        await grupa.save();
        res.send(grupa);

});

route.get("/treningGrupas/:id", async (req, res) => {
    try{
        let grupa = await TreningGrupas.findByPk( req.params.id );
        return res.json(grupa);
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});