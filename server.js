// const express = require('express');
// const app = express();
// const Pokemon = require('./controllers/pokemon.js');

// // Middleware
// app.use(express.static('public'));

// // Index route - GET /pokemon
// app.get('/pokemon', (req, res) => {
//     // Extract relevant data for the index page
//     const pokemonList = Pokemon.map(pokemon => {
//       return {
//         id: pokemon.id,
//         name: pokemon.name,
//         image: pokemon.image,
//       };
//     });
  
//     res.render('index.ejs', { pokemonList });
//   });
  
//   // Show route - GET /pokemon/:id
//   app.get('/pokemon/:id', (req, res) => {
//     const id = req.params.id;
//     const pokemon = Pokemon.find(pokemon => pokemon.id == id);
  
//     if (pokemon) {
//       res.render('show.ejs', { pokemon });
//     } else {
//       res.send('Pokemon not found.');
//     }
//   });

// // New route - GET /pokemon/new
// app.get('/pokemon/new', (req, res) => {
//   res.render('new.ejs');
// });

// // Edit route - GET /pokemon/:id/edit
// app.get('/pokemon/:id/edit', (req, res) => {
//   const id = req.params.id;
//   const pokemon = Pokemon[id];
//   if (pokemon) {
//     res.render('edit.ejs', { pokemon });
//   } else {
//     res.send('Pokemon not found.');
//   }
// });

// // Create route - POST /pokemon
// app.post('/pokemon', (req, res) => {
//   // Logic to create a new Pokemon
// });

// // Update route - PUT /pokemon/:id
// app.put('/pokemon/:id', (req, res) => {
//   // Logic to update an existing Pokemon
// });

// // Destroy route - DELETE /pokemon/:id
// app.delete('/pokemon/:id', (req, res) => {
//   // Logic to delete a Pokemon
// });

// // Start the server
// app.listen(3000, () => {
//   console.log('Server started on port 3000');
// });


const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path'); // Add this line

const Pokemon = require('./controllers/pokemon');

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

// Set the view engine to EJS
app.set('view engine', 'ejs');


// Index route - GET /pokemon
app.get('/pokemon', (req, res) => {
  res.render('index.ejs', { pokemon: Pokemon });
});

// Show route - GET /pokemon/:id
app.get('/pokemon/:id', (req, res) => {
  const id = req.params.id;
  const pokemon = Pokemon.find(pokemon => pokemon.id == id);

  if (pokemon) {
    res.render('show.ejs', { pokemon });
  } else {
    res.send('Pokemon not found.');
  }
});

// New route - GET /pokemon/new
app.get('/pokemon/new', (req, res) => {
  res.render('new.ejs');
});

// Create route - POST /pokemon
app.post('/pokemon', (req, res) => {
  const id = Pokemon.length + 1;
  const name = req.body.name;
  const image = req.body.image;

  const newPokemon = { id, name, image };
  Pokemon.push(newPokemon);

  res.redirect('/pokemon');
});

// Edit route - GET /pokemon/:id/edit
app.get('/pokemon/:id/edit', (req, res) => {
  const id = req.params.id;
  const pokemon = Pokemon.find(pokemon => pokemon.id == id);

  if (pokemon) {
    res.render('edit.ejs', { pokemon });
  } else {
    res.send('Pokemon not found.');
  }
});

// Update route - PUT /pokemon/:id
app.put('/pokemon/:id', (req, res) => {
  const id = req.params.id;
  const pokemon = Pokemon.find(pokemon => pokemon.id == id);

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
  const pokemonIndex = Pokemon.findIndex(pokemon => pokemon.id == id);

  if (pokemonIndex !== -1) {
    Pokemon.splice(pokemonIndex, 1);
  }

  res.redirect('/pokemon');
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
