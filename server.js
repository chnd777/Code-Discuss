const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const path = require("path");
const app = express();

// Body parser Middleware
app.use(express.json());

// logger Middleware. --DEV mode.
app.use(require("./middleware/logger"));

// use routes.
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));

// DB config
var mongoURI="mongodb+srv://chnd_777:11223344@cluster0.dkjcuej.mongodb.net/myDB";

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://chnd_777:11223344@cluster0.dkjcuej.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, });
client.connect(err => {
  const collection = client.db("myDB").collection("devices");
  // perform actions on the collection object
  client.close();
});

// Production step.
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html")); // relative path
  });
}

// Port Variable
const PORT = process.env.PORT || 3000;

// listenting to server.
app.listen(PORT, () => console.log(`Server is started on PORT : ${PORT}`));
