const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 4000;

const router = require("./routes/index");

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(router);

app.listen(PORT, function() {
  console.log("Server is running on Port: " + PORT);
});
