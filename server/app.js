const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const cors=require("cors");
app.use(cors());
const mongoose = require('mongoose');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

async function main() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/Event');
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
}

main()
  .then(() => {
    const eventRouter = require('./event');
    const producerRouter = require('./producer');
    app.use('/event', eventRouter);
    app.use('/producer', producerRouter);
  })
  .catch(err => console.log("Failed to initialize routes:", err));


// מאזין לשרת
app.listen(port, (error) => {
    if (!error) {
      console.log("Server is Successfully Running, and App is listening on port " + port);
    } else {
      console.log("Error occurred, server can't start", error);
    }
  });