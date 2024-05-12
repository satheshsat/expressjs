const express = require('express')
const router = express.Router()
const getDB = require('../config/db');

const db = getDB();

router.get('/users', (req, res) => {
  res.send('Express on Vercel')
})

module.exports = router;