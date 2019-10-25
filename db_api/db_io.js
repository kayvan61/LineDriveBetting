const express = require("express");
const BodyParser = require("body-parser");
const Mongoose = require("mongoose");
const Games = require("./models/games.model");
const User = require("./models/user.model");
const Comments = require("./models/comments.model").Comments;
const BDPointSchema = require("./models/bettingDataPoint.model").dbDataPoint;
const crypto = require("crypto");

const DATABASE_NAME = "Prod-DB";

const CONNECTION_URL =
  "mongodb+srv://atlas-admin:bBcJ97l0uos6tu1Q@linedrivebetting-tfkik.gcp.mongodb.net/" +
  DATABASE_NAME +
  "?retryWrites=true&w=majority";

var database, collection;

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

exports.dbClose = function() {
  console.log(typeof database);
  database.close();
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
      response.status(500).send("your input was probably was malformed\n");
    });
};

exports.gamesGetData = function(request, response) {
  Games.find({})
    .then(games => response.json(games))
    .catch(err => response.status(500).json("Error: " + err));
};

exports.dropGamesData = function(request, response) {
  Games.deleteMany({}).catch(err => response.status(500).json("Error: " + err));
};

exports.userSignup = function(request, response) {
  console.log("useradding");
  new User({
    userName: request.query.userName,
    saltedPass: request.query.saltedPass,
    salt: request.query.salt
  })
    .save()
    .then(() => {
      console.log("Added a user");
      response.status(200).send("your input was added\n");
    })
    .catch(err => {
      console.log("error adding a user");
      console.log(err);
      response.status(500).send("username was taken.\n");
    });
};

exports.userLogin = function(request, response) {
  User.find({
    userName: { $eq: request.query.userName }
  })
    .then(res => {
      if (res.length === 0) {
        console.log("no user found");
        response.status(204).send("Username not found.");
      } else {
        var token = res[0]["_id"];
        var salt = res[0]["salt"];
        var pw = request.query.password;
        var hashedpw = crypto
          .createHash("md5")
          .update(pw + salt)
          .digest("hex");

        if (hashedpw === res[0]["saltedPass"]) {
          console.log("found user properly");
          response.status(200).json({ token: token });
        } else {
          console.log("found user with incorrect password");
          response.status(204).send("incorrect password.");
        }
      }
    })
    .catch(err => {
      console.log("error finding a user");
      console.log(err);
      response.status(500).json(err);
    });
};

exports.commentsPut = function(request, response) {
  console.log(request.body);
  var teamsTag = request.body["Teams"]
    .sort()
    .join("")
    .toLowerCase();

  var querry = {
    Teams: { $eq: teamsTag }
  };

  var update = {
    $push: {}
  };

  update["$push"]["Comments"] = {
    $each: [request.body["Comment"]]
  };

  Comments.findOneAndUpdate(querry, update, { upsert: true })
    .exec()
    .then(res => {
      console.log("updated a comment");
      response.status(200).send("your comment was added\n");
    })
    .catch(err => {
      console.log("error updating a comment");
      console.log(request.body);
      console.log(err);
      response.status(500).send("your input was probably was malformed\n");
    });
};

exports.commentsGet = function(request, response) {
  var querry = {
    Teams: {
      $eq: [request.query.teama, request.query.teamb]
        .sort()
        .join("")
        .toLowerCase()
    }
  };
  Comments.find(querry)
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
        .status(500)
        .send(err)
        .end();
    });
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
      response.status(500).send("your input was probably was malformed\n");
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
      response.status(200).json({
        res
      });
    })
    .catch(err => {
      console.log(err);
      response.status(500).send(err);
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
