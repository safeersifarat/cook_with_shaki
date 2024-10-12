import express from "express";
import mongoose from "mongoose";

mongoose
  .connect(
    "mongodb+srv://safeer:7989@cook-with-shaki.btw6x.mongodb.net/cook-with-shaki?retryWrites=true&w=majority&appName=cook-with-shaki"
  )
  .then(() => {
    console.log("MongoDb is connected");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.listen(3000, () => {
  console.log("sever is running on port 3000");
});
