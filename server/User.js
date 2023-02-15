const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  candidate_id: Number,
  firstName: String,
  lastName: String,
  Email: String,
  Description: String,
  cvPath: String,
});

module.exports = mongoose.model("candidate", userSchema);
