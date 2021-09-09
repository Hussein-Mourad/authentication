const User = require("../models/User");
const handleErrors = require("../controllers/authController").handleErrors;
const fs = require("fs");
const multiparty = require("multiparty");
const path = require("path");
const UPLOAD_PATH = path.join(__dirname, "..", process.env.IMG_STORAGE);

module.exports.editUserData = async (req, res, next) => {
  for (var field in req.body) {
    req.body[field] = req.body[field].trim();
  }
  var { photo, name, bio, phone, email, password } = req.body;

  User.findById(req.params.id, async function (err, user) {
    console.error(err);
    if (err || !user) {
      res.json({ error: "User does not exits" });
    } else {
      if (name) user.name = name;
      if (photo) user.photo = photo;
      if (bio) user.bio = bio;
      if (phone) user.phone = phone;
      if (!user.phone) delete user.phone;
      if (password) {
        user.password = password;
        user.showPassword = true;
      }
      if (!user.isOAuthUser && email) user.email = email;

      user.save(function (err) {
        console.error(err);
        if (err) res.json(handleErrors(err));
        else res.json("User data updated successfully.");
      });
    }
  });
};

module.exports.uploadPhoto = async (req, res, next) => {
  if (!fs.existsSync(UPLOAD_PATH)) {
    fs.mkdirSync(UPLOAD_PATH);
  }
  var form = new multiparty.Form({
    maxFilesSize: 10 * 1024 * 1024,
    uploadDir: UPLOAD_PATH,
  }); //10 MB

  form.on("error", (err) => console.error(err.message));

  form.parse(req, function (err, fields, files) {
    console.error(files);
    try {
      if(!files || !files.image) throw new Error("No files recieved!");
      const allowedExtensions = ["jpg", "png", "jpeg"];
      const filePath = path.join(
        "/user",
        "img",
        files.image[0].path.replace(UPLOAD_PATH, "")
      );
      const fileExtension = filePath
        .split(".")
        [filePath.split(".").length - 1].toLowerCase();

      // console.log(fileExtension);
      if (!allowedExtensions.includes(fileExtension)) {
        fs.unlinkSync(files.image[0].path);
        throw new Error("Invalid file extension! Only jpg and png are allowed");
      }

      User.findById(req.params.id, async function (err, user) {
        if (err || !user) {
          res.json({ error: "User does not exits" });
        } else {
          user.photo = filePath;
          user.save(function (err) {
            if (err) res.json(handleErrors(err));
            else res.json({ filePath });
          });
        }
      });
    } catch (err) {
      console.error(err);
      // throw new Error(err);
      res.status(401).json({ error: err.message });
    }
  });
};

module.exports.getImage = (req, res, next) => {
  const filePath = path.join(UPLOAD_PATH, req.params.id);
  res.sendFile(filePath);
};
