const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");

// Connect to mongo DB
mongoose.connect(
  process.env.MONGODB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("DB connected!");
  }
);

// Import Routes
const authRoute = require("./routes/auth");
const boardRoute = require("./routes/board");

//Middleware
app.use(express.json());
app.use(cors());

app.get('/',(req,res) => {
  res.send("This is a api for retro app")
})

// Route Middleware
app.use("/api/user", authRoute);
app.use("/api/board", boardRoute);
// Run app
app.listen(5000, () => {
  console.log("Server is running!");
});
