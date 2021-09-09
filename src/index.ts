import connectDB from "config/db";
import { Application } from "express";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import dotenv from "dotenv";
import passport from "passport";
import session from "express-session";
import MongoStore from "connect-mongo";
import compression from "compression";
import helmet from "helmet";

dotenv.config({path:"../config/.env"})

// Passport config
require("./config/passport")(passport);


const app: Application = express();
const port = process.env.PORT || "8000"
connectDB(() => {
  app.listen(port);
  console.info("Listening on http://localhost:" + port);
});


// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Middleware
app.use(compression());
// app.use(helmet());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "uploads")));

// Sessions
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.DB_URI,
      collectionName: "sessions",
    }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.get("/:filename", function (req, res, next) {
  const filePath = path.join(__dirname, `public/${req.params.filename}.html`);
  if(!fs.existsSync(filePath)) next();
  res.sendFile(filePath);
});
app.use("/auth/", require("./routes/auth"));
app.use("/user/", require("./routes/user"));

export default app;