const Mongoose = require("mongoose");

class DatabaseHandle {
  DATABASE_NAME = "Prod-DB";
  CONNECTION_URL =  "mongodb+srv://atlas-admin:bBcJ97l0uos6tu1Q@linedrivebetting-tfkik.gcp.mongodb.net/" +
                      this.DATABASE_NAME +
                      "?retryWrites=true&w=majority";
  TESTINGCONNECTION_URL = "mongodb+srv://atlas-admin:bBcJ97l0uos6tu1Q@linedrivebetting-tfkik.gcp.mongodb.net/" +
                          "Testing" +
                          "?retryWrites=true&w=majority";
  _database;
  _isTesting = false;

  set isTesting(t){
    this._isTesting = t;
  }

  get database(){
    if(!this._database){
      Mongoose.connect(this.isTesting ? this.TESTINGCONNECTION_URL : this.CONNECTION_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
      });
      this._database = Mongoose.connection;
      this._database.once("open", () => {
        console.log("Database is connected");
      });
      this._database.on("error", () => {
        console.log("Error connecting to Database");
      });
      console.log("make")
    }

    return this._database;
  }

  dbClose() {
    database.close();
  };
}

exports.dbHandle = new DatabaseHandle();
