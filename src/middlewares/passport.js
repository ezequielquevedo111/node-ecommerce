import { users } from "../data/mongo/manager.mongo.js";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { createHash, verifyHash } from "../utils/hash.utils.js";

passport.use(
  "register",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        const one = await users.readByEmail(email);
        if (one) return done(null, false);
        const data = req.body;
        data.password = createHash(password);
        let user = await users.create(data);
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);
passport.use(
  "login",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        const user = await users.readByEmail(email);
        if (!user) return done(null, false);
        if (!verifyHash(password, user.password)) return done(null, false);
        req.session.email = email;
        req.session.role = user.role;
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

export default passport;
