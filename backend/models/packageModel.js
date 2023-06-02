const { Schema, model } = require("../connection");

const userSchema = new Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  facilities: { type: String },
  duration: { type: Array, default: [] },
  created_at: Date,
  updated_at: Date,
});


module.exports = model("packages", userSchema);
