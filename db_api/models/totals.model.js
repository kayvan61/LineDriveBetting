const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const totalsSchema = new Schema(
  {
    teamsTag: { type: String, required: true },
    site: { type: String, required: true },
    oddsOver: { type: [Number], required: true },
    oddsUnder: { type: [Number], required: true },
    points: { type: [Number], required: true },
    gameTime: { type: Number, required: true }
  },
  {
    timestamps: true
  },
  {
    collections: "Totals"
  }
);

const Totals = mongoose.model("Totals", totalsSchema);

module.exports = Totals;
