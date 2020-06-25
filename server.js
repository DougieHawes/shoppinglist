require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

const mongoUri = process.env.MONGO_URI;
const port = process.env.PORT;

const ItemRoute = require("./routes/item.js");

mongoose.connect(
  mongoUri,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("mongo connected")
);

app.use(express.json());

app.use("/items", ItemRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () => console.log(`app listening on port ${port}`));
