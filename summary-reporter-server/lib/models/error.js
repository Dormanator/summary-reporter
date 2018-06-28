const mongoose = require("mongoose");

const errorSchema = new mongoose.Schema(
  {
    error: {
      type: String,
      required: true
    },
    info: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Error", errorSchema);
