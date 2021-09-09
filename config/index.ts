import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express, { Application } from "express";
import session from "express-session";
import logger from "morgan";
import path from "path";
import connectDB from "../config/db";
import authRouter from "./routes/auth";
import categoryRouter from "./routes/category";
import productRouter from "./routes/product";
import shoppingListRouter from "./routes/shoppingList";

dotenv.config();

const app: Application = express();
const port = process.env.PORT || "8000";

connectDB(() => {
  app.listen(port);
  console.info("Listening on http://localhost:" + port);
});

app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIES_SECRET));
app.use(express.static(path.join(__dirname, "../public")));

app.use(
  session({
    secret: process.env.SESSION_SECRET || "",
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.DB_URI,
      collectionName: "sessions",
    }),
  })
);

app.use("/api/auth/", authRouter);
app.use("/api/products/", productRouter);
app.use("/api/categories/", categoryRouter);    
app.use("/api/shoppinglists/", shoppingListRouter);

export default app;
