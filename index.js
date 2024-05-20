const express = require("express");
var cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
require("dotenv").config();
require('./config/db');
const cookieparser = require('cookie-parser');
const tokenMiddleware = require('./middleware/token');
// const cluster = require('cluster');
// const os = require('os');
// const numCPUs = os.cpus().length;

// if (cluster.isMaster) {
//   console.log(`Master process ${process.pid} is running`);

//   for (let i = 0; i < numCPUs; i++) {
//     cluster.fork();
//   }

//   cluster.on('exit', (worker, code, signal) => {
//     console.log(`Worker process ${worker.process.pid} died. Restarting...`);
//     cluster.fork();
//   });
//   return;
// }

const app = express();

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 15 minutes
	limit: 60, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
});

app.use(limiter);
app.use(hpp());
app.use(helmet());
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