import passport from "passport";

export const githubAuth = passport.authenticate("github", { scope: ["user:email"] });

export const githubCallback = (req, res, next) => {
  passport.authenticate("github", { session: false }, (err, data) => {
    if (err || !data) {
      return res.redirect(`https://skill-sharev8.netlify.app/login?error=Authentication failed`);
    }
    // Redirect user to frontend with token
    res.redirect(`https://skill-sharev8.netlify.app/dashboard?token=${data.token}`);
  })(req, res, next);
};
