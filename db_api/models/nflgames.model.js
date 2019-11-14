const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const nflgamesSchema = new Schema(
  {
    teams: { type: [String], required: true },
    gameTime: { type: Number, required: true }
  },
  {
    collection: "nflGames"
  }
);

const nflGames = mongoose.model("nflGames", nflgamesSchema);

module.exports = nflGames;
