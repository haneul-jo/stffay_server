const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const logger = require("morgan");
const app = express();
const PORT = 4000;

// const dbRoute =
//   "mongodb+srv://admin:admin1234@cluster0-ndqf2.mongodb.net/test?retryWrites=true&w=majority";
const dbRoute = "mongodb://localhost/staffy";

mongoose.connect(dbRoute, { useNewUrlParser: true });
let db = mongoose.connection;

db.once("open", () => console.log("connected to the database >>>>>>> "));
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const router = require("./routes/index");

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(logger("dev"));
app.use(router);

app.listen(PORT, function() {
  console.log("Server is running on Port: " + PORT);
});
