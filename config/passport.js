const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const TwitterStrategy = require("passport-twitter").Strategy;
const GithubStrategy = require("passport-github2").Strategy;
const User = require("../models/User");
const crypto = require("crypto");

const handleData = async (profile, done) => {
  let newUser = {
    authId: profile?.id,
    name: profile?.displayName,
    email: profile?.id + "@authapp.com",
    photo: `https://eu.ui-avatars.com/api/?name=${profile?.displayName}`,
    password: "A" + crypto.randomBytes(16).toString("hex"),
    isOAuthUser: true,
    showPassword:false,
    showEmail:false
  };
  if (profile?.photos) {
    newUser.photo = profile?.photos[0]?.value;
  }
  if (profile?.emails) {
    newUser.email = profile?.emails[0]?.value;
    newUser.showEmail=true;
  }

  try {
    let user = await User.findOne({ authId: profile?.id });

    if (!user) {
      user = await User.create(newUser);
    }
    done(null, user);
  } catch (err) {
    console.error(err);
    done(null, null);
  }
};

function passportConfig(passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        handleData(profile, done);
      }
    )
  );

  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: "/auth/facebook/callback",
        profileFields: ["id", "displayName", "photos"],
      },
      async (accessToken, refreshToken, profile, done) => {
        handleData(profile, done);
      }
    )
  );

  passport.use(
    new TwitterStrategy(
      {
        consumerKey: process.env.TWITTER_CONSUMER_ID,
        consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
        callbackURL: "/auth/twitter/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        handleData(profile, done);
      }
    )
  );

  passport.use(
    new GithubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: "/auth/github/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        handleData(profile, done);
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user));
  });
}

module.exports = passportConfig;
