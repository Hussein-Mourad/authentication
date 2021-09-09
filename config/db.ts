import { connect } from "mongoose";

export default function connectDB(cb: () => void) {
  if (process.env.DB_URI) {
    connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
      .then((result) => {
        console.log(`Connected to db: ${result.connection.host}`);
        cb();
      })
      .catch((err) => {
        process.exit(1);
      });
  } else {
    throw new Error("DB_URI is not found in .env file");
  }
}
