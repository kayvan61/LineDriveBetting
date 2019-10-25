const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const gamesSchema = new Schema(
  {
    Teams: { type: [String], required: true },
    EventStartTime: { type: String, required: true }
  },
  {
    collection: "Games"
  }
);

const Games = mongoose.model("Games", gamesSchema);

module.exports = Games;
