const mongoose = require("mongoose");

const cvSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  cvPublicLink: String,
  uploadDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("CV", cvSchema);
