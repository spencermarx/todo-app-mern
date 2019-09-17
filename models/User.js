// ======================================
// Require Packages
// ======================================
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// ======================================
// Define Schema
// ======================================
const UserSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  todos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Todo"
  }],
});

// ======================================
// Export Model
// ======================================
module.exports = User = mongoose.model("User", UserSchema);