<<<<<<< HEAD
fetch("/api/sessions/", { method: "POST" })
  .then((res) => res.json())
  .then((res) => {
    //console.log(res);
    if (res.statusCode === 200) {
      document
        .querySelector(".navbar-nav")
        .removeChild(document.querySelector("#registerNav"));
      document
        .querySelector(".navbar-nav")
        .removeChild(document.querySelector("#loginNav"));
      document.querySelector("#signout").addEventListener("click", async () => {
        try {
          const opts = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
=======
import { users } from "../data/mongo/manager.mongo.js";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { createHash, verifyHash } from "../utils/hash.utils.js";
import { createToken } from "../utils/token.utils.js";

const { CLIENT_ID, CLIENT_SECRET, SECRET } = process.env;

passport.use(
  "register",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        const one = await users.readByEmail(email);
        if (one)
          return done(null, false, {
            messages: "Already exists",
            statusCode: 400,
          });
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
        if (user && verifyHash(password, user.password)) {
          const token = createToken({ email, role: user.role });
          req.token = token;
          // console.log(user);
          return done(null, user);
        } else {
          return done(null, false, {messages: "Bad auth from passport cb"});
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);


passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      callbackURL: "http://localhost:8080/api/sessions/google/callback",
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        let user = await users.readByEmail(profile.id);
        if (!user) {
          user = {
            email: profile.id,
            name: profile.name.givenName,
            lastName: profile.name.familyName,
            photo: profile.coverPhoto,
            password: createHash(profile.id),
>>>>>>> 61fffd5ffa944fa15b7a3d7c943a06ad5a7f694e
          };
          let response = await fetch("/api/sessions/signout", opts);
          response = await response.json();
          console.log(response);
          if (response.statusCode === 200) {
            alert(response.message);
            location.replace("/");
          }
        } catch (error) {
          console.log(error);
        }
      });
    } else {
      document
        .querySelector(".navbar-nav")
        .removeChild(document.querySelector("#formNav"));
      document
        .querySelector(".navbar-nav")
        .removeChild(document.querySelector("#ordersNav"));
      document
        .querySelector(".navbar-nav")
        .removeChild(document.querySelector("#signout"));
    }
    if (res.response?.role === 0) {
      document
        .querySelector(".navbar-nav")
        .removeChild(document.querySelector("#formNav"));
    } else if (res.response?.role === 1) {
      document
        .querySelector(".navbar-nav")
        .removeChild(document.querySelector("#ordersNav"));
    }
<<<<<<< HEAD
  });
=======
  )
);

export default passport;

>>>>>>> 61fffd5ffa944fa15b7a3d7c943a06ad5a7f694e
