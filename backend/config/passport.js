import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
import dotenv from "dotenv";
import { user } from "../model/userModel.js";
import jwt from "jsonwebtoken";

dotenv.config();

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let existingUser = await user.findOne({ email: profile.emails?.[0]?.value });

        if (!existingUser) {
          // If user does not exist, create a new user
          existingUser = new user({
            username: profile.displayName,
            email: profile.emails?.[0]?.value || "",
            password: "", // No password needed for GitHub users
          });

          await existingUser.save();
        }

        // Generate JWT Token
        const token = jwt.sign(
          { id: existingUser._id, username: existingUser.username, email: existingUser.email },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "2d" }
        );

        return done(null, { token });
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

export default passport;
