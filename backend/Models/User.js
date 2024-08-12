const mongoose = require("mongoose");
const { Schema } = mongoose;

const user = Schema({
  username: { type: String },
  password: { type: String },
});

module.exports = mongoose.model("CRUD", user);
