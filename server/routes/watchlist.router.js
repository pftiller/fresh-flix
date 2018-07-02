const express = require('express');
const pool = require('../modules/pool.js');
const router = express.Router();

  router.get('/:id', (req, res)=>{
    console.log('this is req.params.ids', req.params.id);
    let queryText = `SELECT *
                    FROM watchlists
                    WHERE id = $1`
                    pool.query(queryText, [req.params.id])
                    .then((result) => {
                        res.send(result.rows);
                    })
                    .catch((err) => {
                        console.log('error getting watchlist', err);
            
                    })
            });

router.post('/remove', (req, res)=>{
    console.log('this is req.body', req.body);
    console.log('this is req.params', req.params);
    console.log('this is req.body', req.query);
    const queryText = `DELETE FROM watchlists WHERE id = $1 and movie_id = $2`;
    pool.query(queryText, [req.body.id, req.body.movie_id])
    .then((results) =>{
        console.log('query delete results: ', results);        
        res.sendStatus(200);
    })
    .catch((err) =>{
        console.log('error making delete query:', err);
        res.sendStatus(500);
    })
});



router.post('/add', (req, res)=>{
    console.log('this is req.body', req.body);
        const queryText = `INSERT INTO watchlists (
                        movie_id, title, genre, synopsis, director, actors, mpaa_rating, length, release_year, rotten_tomatoes, release_date, website, id)
                        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13);`;
    pool.query(queryText, [req.body.movie_id, req.body.title, req.body.genre, req.body.synopsis, req.body.director, req.body.actors, req.body.mpaa_rating, req.body.length, req.body.release_year, req.body.rotten_tomatoes, req.body.release_date, req.body.website, req.body.id])
        .then((result)=>{
            console.log('post success resulted in this', result);
            res.sendStatus(200);
        })
        .catch((err)=>{
            console.log('this is the error that I received', err);
            res.sendStatus(500);
        });
});

module.exports = router;