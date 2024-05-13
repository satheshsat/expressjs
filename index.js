const express = require("express");
require("dotenv").config();
require('./config/db');

const app = express();

app.use('/api/auth', require('./controllers/auth'));

app.use('/api/users', require('./controllers/users'));
app.get("/", (req, res) => {
  res.send("Express on Vercel");
});

app.listen(5000, () => {
  console.log("Running on port 5000.");
});

// Export the Express API
module.exports = app;