// server.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://himanshu:himanshu9999@pzdb.joom6nj.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("DB CONNECTED!!");
  });

// Models
const User = require("./Models/User");
const Movie = require("./Models/Movie");

// Middleware
app.use(cors());
app.use(express.json());
app.use(
  session({
    secret: "secret_key",
    resave: false,
    saveUninitialized: false,
  })
);

// Routes
const authRoutes = require("./routes/authRoutes");
const movieRoutes = require("./routes/movieRoutes");

app.use("/auth", authRoutes);
app.use("/movies", movieRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
