const mongoose = require("mongoose");
const { isEmail, isMobilePhone, isStrongPassword } = require("validator");
const bcrypt = require("bcrypt");
const isValidBio = require("../utils/isValidBio");

const userSchema = new mongoose.Schema(
  {
    authId: String,
    name: String,
    bio: {
      type: String,
      validate: [isValidBio, "Bio must be less than 200 characters"],
    },
    phone: {
      type: String,
      trim: true,
      validate: [isMobilePhone, "Please enter a valid phone number"],
    },
    photo: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      required: [true, "Please enter an email"],
      validate: [isEmail, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
      minLength: [8, "Minimum length is 8 characters"],
      validate: [
        (str) => isStrongPassword(str, { minSymbols: 0 }),
        "Password must contain at least one uppercase, and one number.",
      ],
    },
    passwordLength: String,
    isOAuthUser: { type: Boolean, default: false },
    showEmail:{type:Boolean, default:true},
    showPassword:{type:Boolean, default:true}
  },
  { timestamps: true }
);

userSchema.index({ email: "text" });

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.passwordLength = user.password.length;
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);
  }
  next();
});

// Method to login a user
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
  }
  throw Error("Incorrect email or password");
};

var User = mongoose.model("User", userSchema);

module.exports = User;
