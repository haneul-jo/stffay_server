const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const app = express();
const PORT = 4000;
const router = require("./routes/index");

// DB없이 테스트할 경우
const isNonDB = false;

let sessionOpt = {
  secret: "staffy1234",
  resave: false,
  saveUninitialized: false,

};
if(!isNonDB){
  // const dbRoute =
  //   "mongodb+srv://admin:admin1234@cluster0-ndqf2.mongodb.net/test?retryWrites=true&w=majority";
  const dbRoute = "mongodb://localhost/staffy";

  mongoose.connect(dbRoute, { useNewUrlParser: true });
  let db = mongoose.connection;

  db.once("open", () => console.log("connected to the database >>>>>>> "));
  db.on("error", console.error.bind(console, "MongoDB connection error:"));
  sessionOpt.store =  new MongoStore({
    url: dbRoute,
    collection: "sessions"
  });
}

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000"
  })
);
app.use(logger("dev"));
/* use session */
app.use(cookieParser("staffy1234"));
app.use(
  session(sessionOpt)
);
app.use(router);

/* handle error */
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(PORT, function() {
  console.log("Server is running on Port: " + PORT);
});
