const path = require("path");
const express = require("express");
const {sequelize, Administrator, Trener, Clan, Placanje, Cenovnik,Trening,TreningGrupa,TreningStudio,PrijavaGrupe,Lokacija} = require("./models");

const app = express();
app.use(express.json());

const cors = require('cors');
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions));

function getCookies(req) {
    if (req.headers.cookie == null) return {};

    const rawCookies = req.headers.cookie.split('; ');
    const parsedCookies = {};

    rawCookies.forEach( rawCookie => {
        const parsedCookie = rawCookie.split('=');
        parsedCookies[parsedCookie[0]] = parsedCookie[1];
    });

    return parsedCookies;
};

function authToken(req, res, next) {
    const cookies = getCookies(req);
    const token = cookies['token'];
  
    if (token == null) return res.redirect(301, '/login');
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    
        if (err) return res.redirect(301, '/login');
    
        req.user = user;
    
        next();
    });
}

// const administartorRoutes = require("./routes/administrator.js");
// app.use("/api", administartorRoutes);

// const cenovnikRoutes = require("./routes/cenovnik.js");
// app.use("/api", cenovnikRoutes);

// const clanRoutes = require("./routes/clan.js");
// app.use("/api", clanRoutes);

// const lokacijaRoutes = require("./routes/lokacija.js");
// app.use("/api", lokacijaRoutes);

// const placanjeRoutes = require("./routes/placanje.js");
// app.use("/api", placanjeRoutes);

// const prijavaGrupeRoutes = require("./routes/prijavaGrupe.js");
// app.use("/api", prijavaGrupeRoutes);

// const trenerRoutes = require("./routes/trener.js");
// app.use("/api", trenerRoutes);

// const treningRoutes = require("./routes/trening.js");
// app.use("/api", treningRoutes);

// const treningGrupaRoutes = require("./routes/treningGrupa.js");
// app.use("/api", treningGrupaRoutes);

// const treningStudioRoutes = require("./routes/treningStudio.js");
// app.use("/api", treningStudioRoutes);



app.get('/register', (req, res) => {
    res.sendFile('register.html', { root: './static' });
});

app.get('/login', (req, res) => {
    res.sendFile('login.html', { root: './static' });
});

app.get("/", authToken ,(req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'index.html'));
});

app.get("/trenings", authToken ,(req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'trening.html'));
});
app.get("/treners", authToken ,(req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'trener.html'));
});
app.get("/cenovniks", authToken ,(req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'cenovnik.html'));
});
app.get("/treningGrupas", authToken ,(req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'index.html'));
});
app.get("/treningStudios", authToken ,(req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'treningStudio.html'));
});
app.get("/prijavaGrupes", authToken ,(req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'prijavaGrupe.html'));
});
app.get("/placanjes", authToken ,(req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'placanje.html'));
});
app.get("/lokacijas", authToken ,(req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'lokacija.html'));
});
app.get("/administrators", authToken ,(req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'administrator.html'));
});
app.get("/clans", authToken ,(req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'clan.html'));
});

app.use(express.static(path.join(__dirname, 'static')));

app.listen({port:8000}, async() => {
    console.log("Started on port 8000");
    await sequelize.authenticate();
});