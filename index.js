//----------------------------------------------- Dotenv config
import 'dotenv/config';

//----------------------------------------------- Debug config
import debug from 'debug';
const logger = debug('EntryPoint');

//----------------------------------------------- Express config
import express from 'express';
const app = express();

//----------------------------------------------- Helmet config
import helmet from 'helmet';
app.use(helmet());

//----------------------------------------------- CORS
// app.use((req, res, next) => {

//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type");
//   res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,PATCH,DELETE");
//   res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Authorization, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Allow-Credentials, Access-Control-Request-Method, Access-Control-Request-Headers");
//   next();
// });

import cors from 'cors';
const corsOptions = {
  withCredentials: true,
  origin: ["http://localhost:5000"],
  method: ["GET", "POST", "PUT", "DELETE"],
  responseHeader: ["Content-Type", "Origin", "X-Requested-With", "Authorization"],
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(cors(corsOptions));

//----------------------------------------------- Session config
import session from 'express-session';

app.use(session({
  saveUninitialized: true,
  resave: true,
  secret: process.env.SECRET_SESSION,
  cookie: {
    maxAge: 1 * 60 * 60 * 1000, //1 hours
    httpOnly: true,
    secure: true,
    sameSite: 'none' //'lax', // or 'strict'
    //expires : new Date(Date.now() + 60 * 60 * 1000) //1 hour
  }
}));

//----------------------------------------------- JSON
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


//----------------------------------------------- Launch Router
import { router } from './app/router/index.js';
import { _404 } from './app/service/errorHandling.js';

app.use("/api/v1", router);
app.use(_404)

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => {
  logger(` \x1b[1;33m⚡⚡ http://localhost:${PORT} ⚡⚡ \x1b[0m`)
});