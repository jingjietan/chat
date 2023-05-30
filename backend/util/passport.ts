import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";
import { z } from "zod";
import User from "../model/User";

declare global {
  namespace Express {
    interface User {
      id: number;
    }
  }
}

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      const user = (await User.query().where("email", email))[0]
      if (!user || !bcrypt.compareSync(password, user.hashPassword)) {
        return done(null, false, { message: "Incorrect username or password" });
      }
      return done(null, user);
    }
  )
);

passport.serializeUser((user, done) => {
  return done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const numberID = z.coerce.number().parse(id);
    const user = await User.query().findById(numberID)
    if (user) return done(null, user);
  } catch (error) {
    return done(error, false);
  }
  return done(null, false);
});

export default passport;
