import passport from "passport";
import UserModel from "../models/UsersModel.js";
import { Strategy as LocalStrategy } from "passport-local";
import User from "../models/UsersModel.js";

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  UserModel.findById(id, (err, user) => {
    done(err, user);
  });
});

passport.use(
  "local.signup",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    (req, email, password, done) => {
      req.checkBody("email", "email is not valid").notEmpty().isEmail();
    }
  )
);
