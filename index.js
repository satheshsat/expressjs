const express = require("express");
var cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
require("dotenv").config();
require('./config/db');
const cookieparser = require('cookie-parser');
const tokenMiddleware = require('./middleware/token');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const basicAuth = require('express-basic-auth');
// var geoip = require('geoip-lite');

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

// app.set('trust proxy', true);

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

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Your API Title',
      version: '1.0.0',
      description: 'Your API description',
      license: {
        name: 'Licensed Under MIT',
        // url: 'https://spdx.org/licenses/MIT.html',
      },
      contact: {
        name: 'Sathesh',
        url: 'https://satheshsat.github.io',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
      {
        url: 'https://expressjs-murex.vercel.app',
        description: 'Production server',
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./controllers/*.js'], // Path to your API documentation files
};

const swaggerSpec = swaggerJSDoc(options);
app.use('/api-docs', basicAuth({
  users: {'admin': 'password'},
  challenge: true,
}), swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/auth', require('./controllers/auth'));

// app.use('/api/users', tokenMiddleware.validateToken);

app.use('/api/users', tokenMiddleware.validateToken, require('./controllers/users'));
app.use('/api/profile', tokenMiddleware.validateToken, require('./controllers/profile'));
app.get("/", (req, res) => {
  const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  // var geo = geoip.lookup(clientIp);
  // res.send(`Your IP address is ${clientIp} and  ${JSON.stringify(geo)}`);
  res.send("Express on Vercel");
});

app.listen(5000, () => {
  console.log("Running on port 5000.");
});

// Export the Express API
module.exports = app;