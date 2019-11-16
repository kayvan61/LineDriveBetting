const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const moneylineSchema = new Schema(
  {
    teamsTag: { type: String, required: true },
    site: { type: String, required: true },
    odds0: { type: [Number], required: true },
    odds1: { type: [Number], required: true },
    gameTime: { type: Number, required: true }
  },
  {
    timestamps: true
  },
  {
    collections: "Lines"
  }
);

const Lines = mongoose.model("Lines", moneylineSchema);

module.exports = Lines;
