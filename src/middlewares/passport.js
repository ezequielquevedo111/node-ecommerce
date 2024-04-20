import passport from "passport";
import repository from "../repositories/users.rep.js";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { createHash, verifyHash } from "../utils/hash.utils.js";
import { createToken } from "../utils/token.utils.js";
import CustomError from "../utils/errors/CustomError.js";
import errors from "../utils/errors/errors.js";

const { CLIENT_ID, CLIENT_SECRET, SECRET } = process.env;

passport.use(
  "register",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        // console.log(req.body.email);
        const one = await repository.readByEmail(email);
        // console.log(one);
        if (one) {
          return done(null, false, CustomError.new(errors.userExist));
        } else {
          let user = await repository.create(req.body);
          return done(null, user);
        }
        // const data = req.body;
        // data.password = password;
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
        const user = await repository.readByEmail(email);
        // console.log(user);
        // console.log(password, user.password);
        //AGREGAR CONDICIONAL SI NO ENCUENTRA USER
        //YA QUE TIRA ERROR 500 SI NO ENCUENTRA LA PASSWORD
        //INDICANDO QUE NO PUEDE LEER PROPIEDADES DE NULL
        const verify = verifyHash(password, user.password);
        if (user?.verified && verify) {
          const token = createToken({ _id: user._id, role: user.role });
          // console.log(token);
          req.token = token;
          req.user = user;
          // console.log(user);
          return done(null, user);
        } else {
          return done(null, false, CustomError.new(errors.badAuthPassport));
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
        let user = await repository.readByEmail(profile.id);
        if (!user) {
          user = {
            email: profile.id,
            name: profile.name.givenName,
            lastName: profile.name.familyName,
            photo: profile.coverPhoto,
            password: createHash(profile.id),
          };
          user = await repository.create(user);
        }
        req.session.email = user.email;
        req.session.role = user.role;
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

// passport.use(
//   "jwt",
//   new JwtStrategy(
//     {
//       jwtFromRequest: ExtractJwt.fromExtractors([
//         (req) => req?.cookies["token"],
//       ]),
//       secretOrKey: SECRET,
//     },
//     async (jwt_payload, done) => {
//       try {
//         let user = await repository.readByEmail(jwt_payload.email);
//         if (user) {
//           user.password = null;
//           return done(null, user);
//         } else return done(null, false);
//       } catch (error) {
//         return done(error);
//       }
//     }
//   )
// );

//

passport.use(
  "jwt",
  new JwtStrategy(
    {
      secretOrKey: process.env.SECRET,
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => req?.cookies["token"],
      ]),
    },
    async (payload, done) => {
      try {
        const user = await repository.readOne(payload._id);
        if (user) {
          return done(null, user);
        } else {
          return done(null, false, { statusCode: 403 });
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);

export default passport;
