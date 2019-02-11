const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const tweetRoute = require("./routes/tweet");

require("dotenv").config();

const port = process.env.PORT || 8080;

const app = express();
const dbRoute = "mongodb://aratak:7jn5nE9Gnpz2TNh@ds127655.mlab.com:27655/grocery-app";

app.use(express.static(path.join(__dirname, "client","build")))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/tweets", tweetRoute);

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || dbRoute, { useMongoClient: true }, (err) => {
    if (err) console.error(err);
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});
app.listen(port, () => {
    console.log("Listening on " + port);
});


