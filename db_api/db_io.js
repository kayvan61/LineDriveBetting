const express = require("express");
const BodyParser = require("body-parser");
const Mongoose = require("mongoose");

const DATABASE_NAME = "Prod-DB";

const CONNECTION_URL =
  "mongodb+srv://atlas-admin:bBcJ97l0uos6tu1Q@linedrivebetting-tfkik.gcp.mongodb.net/" +
  DATABASE_NAME +
  "?retryWrites=true&w=majority";
const TESTINGCONNECTION_URL =
  "mongodb+srv://atlas-admin:bBcJ97l0uos6tu1Q@linedrivebetting-tfkik.gcp.mongodb.net/" +
  "Testing" +
  "?retryWrites=true&w=majority";
var database, collection;

/********************* INITIALIZATION/MISC ***************************/

exports.dbInit = function(isTesting = false) {
  Mongoose.connect(isTesting ? TESTINGCONNECTION_URL : CONNECTION_URL, {
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
  database.close();
};

