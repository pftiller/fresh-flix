const express = require('express');
const router = express.Router();
const axios = require('axios');

router.use('/', (req, res) => {
    const config = {
        params: {i: req.body.id,
                apikey: process.env.OMDB_KEY}
    }
    console.log(req.body.id);
    axios.get('http://www.omdbapi.com/', config)
    .then(response => {
      console.log(response);
      res.send(response.data);
    })
    .catch(error => {
      console.log(error);
    });
});

module.exports = router;