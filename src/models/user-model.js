const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  picture: { type: String },
});
const User = mongoose.model("user", userSchema);

module.exports = User;
