const Express = require("express");
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const DB_IO = require('./db_io');
const Scraper = require('./scraping');
const CronJob = require('cron').CronJob;

var app = Express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

app.listen(8080, DB_IO.dbInit);

app.post("/Matchup", DB_IO.dbAddEntry);

app.get("/Matchup", DB_IO.dbGetData);
app.get("/Matchup/bySite", DB_IO.dbGetDataSite);

app.get("/ForcePoll", Scraper.getFromAPI);

const job = new CronJob('0 0 0/12 * * *', function() {
    console.log("ran scraper");
    Scraper.getFromAPI();
});
job.start();
