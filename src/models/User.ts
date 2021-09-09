import bcrypt from "bcrypt";
import { Document, Model, model, Schema } from "mongoose";
import isEmail from 'validator/lib/isEmail';
import isMobilePhone from 'validator/lib/isMobilePhone';
import isStrongPassword from "validator/lib/isStrongPassword";
import isValidBio from "../utils/isValidBio";

export interface IUser {
  authId?:string;
  name?:string;
  bio?:string;
  phone?:string;
  photo?:string;
  email:string;
  password:string;
  passwordLength:number;
  isOAuthUser?:boolean;
  showEmail?:boolean;
  showPassword?:boolean
}

export interface UserModel extends Model<IUser>{
  login(email:string, password:string):Promise<IUser & Document<any, any, IUser>>;
}

const userSchema = new Schema<IUser, UserModel, IUser>(
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
        (str:string) => isStrongPassword(str, { minSymbols: 0 }),
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
userSchema.statics.login = async function (email:string, password:string) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
  }
  throw Error("Incorrect email or password");
};

var User = model<IUser, UserModel>("User", userSchema);

export default User;/
