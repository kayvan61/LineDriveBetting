const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;
const String = Schema.Types.String;

const commentsSchema = new Schema(
  {
    Teams: { type: String, required: true },
    Comments: [{ type: String }],
    gameTime: { type: Number, required: true }
  },
  {
    collection: "Comments"
  }
);

var Comments = Mongoose.model("Comments", commentsSchema);

exports.Comments = Comments;
