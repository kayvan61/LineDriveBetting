const Mongoose = require("mongoose");
const Schema   = Mongoose.Schema;
const ObjID    = Schema.Types.ObjectId;
const Array    = Schema.Types.Array;
const String   = Schema.Types.String;

const usrSchema = new Schema({
  userName   : {type: String, required: true, unique: true},
  saltedPass : {type: String, required: true},
  salt       : {type: String, required: true}
},
{
  collection: "Users"
})

const User = Mongoose.model("User", usrSchema);

module.exports = User;
