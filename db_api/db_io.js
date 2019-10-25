const Express = require("express");
const BodyParser = require("body-parser");
const Mongoose = require("mongoose");

const DATABASE_NAME = "Prod-DB";
const BDPointSchema = require("./bettingDataPoint").dbDataPoint;
const Games = require("./models/games.model");

const CONNECTION_URL =
  "mongodb+srv://atlas-admin:bBcJ97l0uos6tu1Q@linedrivebetting-tfkik.gcp.mongodb.net/" +
  DATABASE_NAME +
  "?retryWrites=true&w=majority";

var database, collection;

exports.dbClose = function() {
  console.log(typeof database);
  database.close();
};

exports.dbInit = function(collectionName) {
  Mongoose.connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });
  database = Mongoose.connection;
  database.once("open", () => {
    console.log("Database is connected");
  });
  database.on("error", () => {
    console.log("Error connecting to Database");
  });
};

exports.gamesAddEntry = function(request, response) {
  new Games({
    Teams: request.body["Teams"],
    EventStartTime: request.body["EventStartTime"]
  })
    .save()
    .then(() => {
      console.log("Added a data point");
      response.status(200).send("your input was added\n");
    })
    .catch(() => {
      console.log("error adding a data point");
      response.status(400).send("your input was probably was malformed\n");
    });
};

exports.gamesGetData = function(request, response) {
  Games.find()
    .then(games => response.json(games))
    .catch(err => response.status(400).json("Error: " + err));
};

exports.dbAddEntry = function(request, response) {
  var teamsTag = request.body["Teams"]
    .sort()
    .join("")
    .toLowerCase();

  var querry = {
    Teams: { $eq: teamsTag },
    EventStartTime: { $eq: request.body["EventStartTime"] },
    BettingFormat: { $eq: request.body["DataType"] }
  };

  var exists = true;
  var update = {
    $push: {}
  };

  update["$push"]["Value." + request.body["Site"]] = {
    $each: [request.body["Value"]]
  };

  BDPointSchema.findOneAndUpdate(querry, update, { upsert: true })
    .exec()
    .then(res => {
      console.log("updated a datapoint");
      response.status(200).send("your input was added\n");
    })
    .catch(err => {
      console.log("error updating a data point");
      console.log(request.body);
      console.log(err);
      response.status(400).send("your input was probably was malformed\n");
    });
};

exports.dbGetData = function(request, response) {
  var querry = {
    Teams: {
      $eq: [request.query.teama, request.query.teamb]
        .sort()
        .join("")
        .toLowerCase()
    },
    BettingFormat: { $eq: request.query.datatype }
  };
  BDPointSchema.find(querry)
    .exec()
    .then(res => {
      console.log("returned " + res.length + " items");
      response
        .status(200)
        .json({
          res
        })
        .end();
    })
    .catch(err => {
      console.log(err);
      response
        .status(400)
        .send(err)
        .end();
    });
};

exports.dbGetDataSite = function(request, response) {
  var querry = {
    Teams: {
      $all: [request.query.teama, request.query.teamb]
        .sort()
        .join("")
        .toLowerCase()
    },
    BettingFormat: { $eq: request.query.datatype }
  };
  BDPointSchema.find(querry)
    .exec()
    .then(res => {
      console.log("returned " + res.length + " items");
      response.status(200).json({
        res
      });
    })
    .catch(err => {
      console.log(err);
      response.status(400).send(err);
    });
};
