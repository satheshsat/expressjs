const express = require("express");
var cors = require('cors');
require("dotenv").config();
require('./config/db');
const cookieparser = require('cookie-parser');
const tokenMiddleware = require('./middleware/token');

const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieparser()); 

app.use('/api/auth', require('./controllers/auth'));

// app.use('/api/users', tokenMiddleware.validateToken);

app.use('/api/users', tokenMiddleware.validateToken, require('./controllers/users'));
app.use('/api/profile', tokenMiddleware.validateToken, require('./controllers/profile'));
app.get("/", (req, res) => {
  res.send("Express on Vercel");
});

app.listen(5000, () => {
  console.log("Running on port 5000.");
});

// Export the Express API
module.exports = app;