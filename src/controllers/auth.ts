const User = require("../models/User");
c{onst jwt = require("jsonwebtoken");
// const hashPassword = require("../utils/hashPassword")

const handleErrors = (err) => {
  // console.log(err.message, err.code);
  let errors = { email: "", password: "", phone: "", bio: "" };

  // Incorrect email and/or password
  if (err.message === "Incorrect email or password") {
    return { errors: { error: err.message } };
  }
  // duplicate email error
  if (err.code === 11000) {
    errors.email = "that email is already registered";
    return { errors };
  }
  // validation errors
  if (err.message.toLowerCase().includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return { errors };
};

// create json web token
const maxAge = 10 * 24 * 60 * 60; // 10 days
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: maxAge,
  });
};

 check_auth_post = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token && !req.isAuthenticated()) {
    return res.status(401).json({ user: null });
  } else if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
      if (!err) {
        let user = await User.findById(decodedToken.id);
        if (!user) {
          return res.status(401).json({ user: null });
        }
        user = user.toObject();
        delete user.authId;
        delete user.createdAt;
        delete user.updatedAt;
        delete user.__v;
        delete user.password;
        return res.status(201).json({ user });
      }
      return res.status(401).json({ user: null });
    });
  } else {
    let user = req.user;
    user = user.toObject();
    delete user.authId;
    delete user.createdAt;
    delete user.updatedAt;
    delete user.__v;
    delete user.password;
    if (!user.showPassword) user.passwordLength = 0;
    if (!user.showEmail) delete user.email;
    res.json({ user });
  }
};

 signup_post = async (req, res, next) => {
  var { email, password } = req.body;
  // password = await hashPassword(password);
  try {
    let user = await User.create({
      email,
      password,
      photo: `https://eu.ui-avatars.com/api/?name=${email[0] + email[1]}`,
      name: email,
    });

    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });

    user = user.toObject();
    delete user.authId;
    delete user.createdAt;
    delete user.updatedAt;
    delete user.__v;
    delete user.password;

    res.status(201).json({ user });
  } catch (err) {
    console.error(err);
    res.status(401).json(handleErrors(err));
  }
};

 login_post = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    // @ts-ignore
    let user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    user = user.toObject();
    delete user.authId;
    delete user.createdAt;
    delete user.updatedAt;
    delete user.__v;
    delete user.password;
    res.status(201).json({ user });
  } catch (err) {
    console.error(err);
    res.status(401).json(handleErrors(err));
  }
};

 logout_post = async (req, res, next) => {
  res.cookie("jwt", "", { maxAge: 1 });
  req.logout();
  res.json("ok");
};

 handleErrors = handleErrors;
