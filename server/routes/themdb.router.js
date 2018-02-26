const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/movies', (req, res) => {
    const url ='https://api.themoviedb.org/3/discover/'
    let config = { 
        params: {
            api_key: process.env.THEMOVIEDB_KEY,
            with_genres: req.body.genre
        }
    }
    axios.get(url + req.body.type, config)
        .then(response =>{
            console.log('get response: ', response)
            res.send(response.data)
        }).catch(err => {
            console.log(err);
            res.sendStatus(500)
          })
});
router.use('/ids', (req, res) => {
    let config = { 
        params: {
            api_key: process.env.THEMOVIEDB_KEY
        }
    }
    const url ='https://api.themoviedb.org/3/'
    axios.get(url + req.body.type + '/' +req.body.id, config)
    .then(response => {
      console.log(response.data); 
      res.send(response.data);
    })
    .catch(error => {
      console.log(error);
    });
});
        

module.exports = router;