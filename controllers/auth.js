const express = require('express')
const router = express.Router()
const userModel = require('../schemas/users');

router.get('/login', (req, res) => {
  res.send('Express on Vercel')
})

router.get('/register', async (req, res) => {
    var result = await userModel.find();
    // var result = await userModel.create({
    //   name: 'test',
    //   email: 'test@test.com',
    //   password: 'test',
    //   createdby: 'test',
    //   modifiedby: 'test',
    //   modifiedat: Date.now(),
    // });
    res.json(result)
})

module.exports = router;