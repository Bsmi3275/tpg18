const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");

const app = express();
const PORT = process.env.PORT || 3000;

//connecting to Atlas (tricky)
//mongodb+srv://Bsmi3275:<Bensmith1>@tpg.uxc4o.mongodb.net/<tpg>?retryWrites=true&w=majority

app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/budget", {
  useNewUrlParser: true,
  useUnitedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

// routes
app.use(require("./routes/api.js"));

//PORT function
app.listen(PORT, function () {
  console.log(`App listening on http://localhost:${PORT}`);
  
});