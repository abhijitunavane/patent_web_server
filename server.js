import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import Router from "./src/Routes.js";
dotenv.config();

// Mongoose conection
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_SECRET_KEY}@cluster0.z3rha.mongodb.net/${process.env.DB_DATABASE_NAME}?retryWrites=true&w=majority`;
mongoose
  .connect(uri)
  .then(() => {
    const app = express();
    const port = process.env.PORT || 5000;

    app.use(express.json());
    app.use(cors());

    //   Server api extension
    app.use("/api", Router);

    // App start
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
      console.log(`Mongodb Database Connected!`);
    });    
  })
  .catch((err) => {
    console.log(err);
  });
