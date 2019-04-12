import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import db from "../../database/index";
passport.use(
  new Strategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET
    },
    async (payload, done) => {
      try {
        // Check if a user matches with token.
        const userMatch = await db("users")
          .where("email", payload.email)
          .returning("*");
        if (userMatch.length == 0) {
          // No Match
          return done(null, false);
        }
        return done(null, userMatch[0]);
      } catch (ex) {
        return done(ex.message, false);
      }
    }
  )
);
