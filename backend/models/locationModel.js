const { Schema, model } = require("../connection");

const userSchema = new Schema({
  title: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  images: { type: Array, default: [] },
  created_at: Date,
  updated_at: Date,
});


module.exports = model("location", userSchema);
