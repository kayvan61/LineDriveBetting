const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const spreadsSchema = new Schema(
  {
    teamsTag: { type: String, required: true },
    site: { type: String, required: true },
    odds0: { type: [Number], required: true },
    odds1: { type: [Number], required: true },
    points0: { type: [String], required: true },
    points1: { type: [String], required: true },
    gameTime: { type: Number, required: true }
  },
  {
    timestamps: true
  },
  {
    collections: "Spreads"
  }
);

const Spreads = mongoose.model("Spreads", spreadsSchema);

module.exports = Spreads;
