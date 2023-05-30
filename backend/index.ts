import chalk from "chalk";
import express from "express";
import session from "express-session";
import cors from "cors";
import * as dotenv from "dotenv";
dotenv.config();
import connectRedis from "connect-redis";
import { createClient } from "redis";
import RedisStore from "rate-limit-redis";
import { rateLimit } from "express-rate-limit";

import logger from "./util/logger";
import passport from "./util/passport";
import loginRouter from "./router/loginRouter";
import postRouter from "./router/postRouter";

import initDB from "./util/db";

const redisClient = createClient({ url: process.env.REDIS_URL });
redisClient.connect().catch(console.error);

const redisStore = new connectRedis({
  client: redisClient,
  prefix: "myapp:",
});

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 1000,
  standardHeaders: true,
  legacyHeaders: false,
  store: new RedisStore({
    sendCommand: (...args: string[]) => redisClient.sendCommand(args),
  }),
});

const app = express();

app.use(
  session({
    store: redisStore,
    resave: false,
    saveUninitialized: false,
    secret: process.env.SECRET ?? "",
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 10,
    },
  })
);
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:4173"],
    credentials: true,
    exposedHeaders: ["set-cookie"],
  })
);
app.use(limiter);
app.use(logger);

// Authentication
app.use(passport.initialize());
app.use(passport.session());

const PORT = process.env.PORT || 3001;

app.use("/", loginRouter);

app.use("/v", postRouter);

initDB();

app.listen(PORT, () => {
  console.log(chalk.blue(`Listening to port ${PORT}`));
});
