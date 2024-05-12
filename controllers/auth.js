const express = require('express')
const router = express.Router()
const getDB = require('../config/db');

router.get('/login', (req, res) => {
  res.send('Express on Vercel')
})

router.get('/register', async (req, res) => {
    const db = await getDB();
    var result = await db.db('test').collection('test').find().toArray();
    // var myobj = { name: "Company Inc", address: "Highway 37" };
    // var result = await db.db('test').collection('test').insertOne(myobj);
    res.json(result)
})

module.exports = router;