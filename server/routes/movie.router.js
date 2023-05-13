const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const { legacy_createStore } = require('redux');

// router to get the genre details of a specific movie
router.get('/single/:id', (req, res) => {
  const movieID = req.params.id;

  let sqlText = `SELECT * FROM "movies_genres" WHERE movies_genres.movie_id = $1;`;
  let sqlValues = [movieID]

  pool.query(sqlText, sqlValues)
    .then(dbRes => {
      // dbRes.rows could be an array of multiple row objects, so I extract them with map to make an array of just the genre_id's. Now I'll send those back as the key for the genre reducers
      const genres = dbRes.rows.map(obj => {return obj.genre_id})
      console.log("Got our genres for the single movie:", genres);
      res.send(genres)
    }).catch(dbErr => {
      console.log("Error connecting with DB:", dbErr);
    })
})


router.get('/', (req, res) => {

  const query = `SELECT * FROM movies ORDER BY "title" ASC`;
  pool.query(query)
    .then( result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get all movies', err);
      res.sendStatus(500)
    })

});

router.post('/', (req, res) => {
  console.log(req.body);
  // RETURNING "id" will give us back the id of the created movie
  const insertMovieQuery = `
  INSERT INTO "movies" ("title", "poster", "description")
  VALUES ($1, $2, $3)
  RETURNING "id";`

  // FIRST QUERY MAKES MOVIE
  pool.query(insertMovieQuery, [req.body.title, req.body.poster, req.body.description])
  .then(result => {
    console.log('New Movie Id:', result.rows[0].id); //ID IS HERE!
    
    const createdMovieId = result.rows[0].id

    // Now handle the genre reference
    const insertMovieGenreQuery = `
      INSERT INTO "movies_genres" ("movie_id", "genre_id")
      VALUES  ($1, $2);
      `
      // SECOND QUERY ADDS GENRE FOR THAT NEW MOVIE
      pool.query(insertMovieGenreQuery, [createdMovieId, req.body.genre_id]).then(result => {
        //Now that both are done, send back success!
        res.sendStatus(201);
      }).catch(err => {
        // catch for second query
        console.log(err);
        res.sendStatus(500)
      })

// Catch for first query
  }).catch(err => {
    console.log(err);
    res.sendStatus(500)
  })
})

module.exports = router;