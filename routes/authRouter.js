const router = require("express").Router();
const authController = require("../controllers/authController");
const passport = require("passport");

// @desc  Checks if a user is auth
// @route POST /auth
router.post("/", authController.check_auth_post);

// @desc  Signup a user with email and password
// @route POST /auth/signup
router.post("/signup", authController.signup_post);

// @desc  login a user
// @route POST /auth/login
router.post("/login", authController.login_post);

// @desc    Logout user
// @route   /auth/logout
router.post("/logout", authController.logout_post);

// @desc    Auth with Google
// @route   GET /auth/google
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// @desc    Google auth callback
// @route   GET /auth/google/callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/",
  })
);

// @desc    Auth with Facebook
// @route   GET /auth/facebook
router.get("/facebook", passport.authenticate("facebook"));

// @desc    Facebook auth callback
// @route   GET /auth/facebook/callback
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/",
    failureRedirect: "/",
  })
);

// @desc    Auth with Github
// @route   GET /auth/github
router.get(
  "/github",
  passport.authenticate("github", { scope: ["read:user","user:email"] })
);

// @desc    Github auth callback
// @route   GET /auth/github/callback
router.get(
  "/github/callback",
  passport.authenticate("github", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

// @desc    Auth with Twitter
// @route   GET /auth/twitter
router.get(
  "/twitter",
  passport.authenticate("twitter")
);

// @desc    Twitter auth callback
// @route   GET /auth/twitter/callback
router.get(
  "/twitter/callback",
  passport.authenticate("twitter", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);


module.exports = router;
