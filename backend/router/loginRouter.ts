import express from "express";
import passport from "../util/passport.js";
import bcrypt from "bcryptjs";
import { z } from "zod";
import protect from "../util/protect.js";

import User from "../model/User.js";

const router = express.Router();

// router.get("/", async (req, res) => {
//   const users = await User.query().select("name", "email", "id");
//   res.json(users);
// });

router.get("/user", protect, async (req, res) => {
  if (!req.user?.id) {
    return res.sendStatus(400);
  }
  const result = await User.query().select("name", "email", "id").findById(req.user?.id);
  const user = {
    name: result?.name,
    email: result?.email,
    id: result?.id,
  };
  return res.json(user);
});

router.post("/login", passport.authenticate("local"), async (req, res) => {
  if (!req.user) {
    return res.send(400);
  }
  return res.status(200).json(req.user);
});

router.post("/register", async (req, res, next) => {
  const schema = z.object({
    name: z.string().optional(),
    email: z.string(),
    password: z.string(),
  });
  const value = schema.safeParse(req.body);
  if (!value.success) {
    return res.sendStatus(400);
  }
  const hashPassword = await bcrypt.hash(value.data.password, 10);

  if ((await User.query().where("email", "=", value.data.email)).length) {
    return res
      .status(400)
      .json({ message: "The same email has already been registered." });
  }
  const user = await User.query().insert({
    email: value.data.email,
    name: value.data.name,
    hashPassword,
  });
  req.logIn(user, (err) => {
    if (err) next(err);
    return res.sendStatus(200);
  });
  return res.sendStatus(200);
});

router.post("/logout", async (req, res, next) => {
  req.session.destroy((err) => {
    if (err) return next(err);
    return next();
  });
});

export default router;
