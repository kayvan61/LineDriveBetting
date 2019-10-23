const Express = require("express");
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const DB_IO = require('./db_io');

var app = Express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

app.listen(8080, DB_IO.dbInit);

app.post("/Matchup", DB_IO.dbAddEntry);

app.get("/Matchup/:datatype/:teama/:teamb", DB_IO.dbGetData);
app.get("/Matchup/:datatype/:bettingsite/:teama/:teamb", DB_IO.dbGetDataSite);
app.get("/Matchup/:datatype/:teama/:teamb/:since", DB_IO.dbGetDataSince);
