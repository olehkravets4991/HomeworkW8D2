require("dotenv").config();
const express = require('express');
const morgan = require('morgan');
const PORT = process.env.PORT;
const app = express();
const bodyParser = require('body-parser');
// const path = require('path'); // Add this line
const methodOverride = require("method-override");

const pokemon = require('./controllers/pokemon');

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
app.use(express.static('public'));
app.use(morgan("dev"));
app.use(methodOverride("_method"));
// app.use("/pokemon")

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Index route - GET /pokemon
app.get('/pokemon', (req, res) => {
    res.render('index.ejs', { pokemon: pokemon });
  });


// New route - GET /pokemon/new
app.get('/pokemon/new', (req, res) => {
  res.render('new.ejs');
});

// Create route - POST /pokemon
app.post('/pokemon', (req, res) => {
  const id = pokemon.length + 1;
  const name = req.body.name;
  const img = req.body.image;

  const newPokemon = { id, name, img };
  pokemon.push(newPokemon);

  res.redirect('/pokemon');
});

// Edit route - GET /pokemon/:id/edit
app.get('/pokemon/:id/edit', (req, res) => {
  const id = req.params.id;
  console.log(pokemon, id)
  const pk = pokemon.find(poke => poke.id == id);
 

  if (pk) {
    res.render('edit.ejs', { pokemon:pk });
  } else {
    res.send('Pokemon not found.');
  }
});

// Update route - PUT /pokemon/:id
app.put('/pokemon/:id', (req, res) => {
  const id = req.params.id;
  const pokemon = pokemon.find(pokemon => pokemon.id == id);

  if (pokemon) {
    pokemon.name = req.body.name;
    pokemon.image = req.body.image;

    res.redirect(`/pokemon/${id}`);
  } else {
    res.send('Pokemon not found.');
  }
});

// Destroy route - DELETE /pokemon/:id
app.delete('/pokemon/:id', (req, res) => {
  const id = req.params.id;
  const pokemonIndex = pokemon.findIndex(pokemon => pokemon.id == id);

  if (pokemonIndex !== -1) {
    pokemon.splice(pokemonIndex, 1);
  

  res.redirect('/pokemon');

} else {
    res.send('Pokemon not found.');
  }
});

// Show route - GET /pokemon/:id
app.get('/pokemon/:id', (req, res) => {
    const id = req.params.id;
    const foundPokemon = pokemon.find(pokemon => pokemon.id === id);
  
    if (foundPokemon) {
      res.render('show.ejs', { pokemon: foundPokemon });
    } else {
      res.send('Pokemon not found.');
    }
  });

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});