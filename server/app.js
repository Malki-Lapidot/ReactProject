const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const mongoose = require("mongoose");

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../client/public/image"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

app.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  res.json({imagePath: `/image/${req.file.filename}` });
});

async function main() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/Event");
    console.log("Connected to MongoDB");

    app.listen(port, () => {
      console.log("Server is running on http://localhost:" + port);
    });

  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
}
main();

const eventRouter = require("./event");
const producerRouter = require("./producer");

app.use("/event", eventRouter);
app.use("/producer", producerRouter);