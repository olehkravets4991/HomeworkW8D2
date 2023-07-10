require("dotenv").config()
const express = require("express");
const morgan = require("morgan");
const PORT = process.env.PORT;
const app = express();
const methodOverride = require("method-override");
const pokemon = require("./models/pokemon.js");

// MIDDLEWARE
// PARSING URLENCODED
app.use(morgan("dev"))
app.use(express.static("public"))
app.use(express.urlencoded({extended: false}))
app.use(methodOverride("_method"))  

// ROUTES

// INDEX - GET
app.get('/pokemon', (req, res) => {
    console.log(pokemon)
        res.render('index.ejs', {pokemon});

    })
    
// NEW - GET 
app.get('/pokemon/new', (req, res) => {
    res.render('./new.ejs')
})

// DESTROY - DELETE
app.delete("/pokemon/:id", (req, res) => {
    const id = req.params.id
    pokemon.splice(id, 1)
    res.redirect("/pokemon")
})

// UPDATE - PUT
app.put("/pokemon/:id", (req, res) => {
    const id = req.params.id;
    pokemon[id] = { 
        name: req.body.name,
        img: req.body.image,
        type: [
            req.body.type
        ],
        stats: {
            attack: req.body.attack,
            hp: req.body.hp,
            defense: req.body.defense,
            speed: req.body.speed
        },
        damages: {
            normal: req.body.normal,
            fire: req.body.fire,
            water: req.body.water,
            ice: req.body.ice
        }
    }
    res.redirect("/pokemon")
})

// CREATE - POST 
app.post('/pokemon/', (req, res) => { 
    let newPokemon = {
        name: req.body.name,
        img: req.body.image,
        type: [
            req.body.type
        ],
        stats: {
            attack: req.body.attack,
            hp: req.body.hp,
            defense: req.body.defense,
            speed: req.body.speed
        },
        damages: {
            normal: req.body.normal,
            fire: req.body.fire,
            water: req.body.water,
            ice: req.body.ice
        }
    }
    pokemon.push(newPokemon)

    res.redirect('/pokemon')
})

// EDIT - GET
app.get("/pokemon/:id/edit", (req, res) => {
    const id = req.params.id;
    const Pokemon = pokemon[id];
    res.render("edit.ejs", {Pokemon, id});
}) 

// SHOW
app.get('/pokemon/:id', (req, res) => {
    const id = req.params.id;
    const Pokemon = pokemon[id];
    res.render('show.ejs', {Pokemon, id});
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})