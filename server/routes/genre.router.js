const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/', (req, res) => {
  pool.query(`SELECT * FROM "genres"`)
    .then((dbRes) => {
      console.log('Got our genres:', dbRes.rows)
      res.send(dbRes.rows)
    }).catch((dbErr) => {
      console.log("Error connecting to DB from genres/GET", dbErr);
    })
});

module.exports = router;