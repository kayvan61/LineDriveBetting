const express = require("express");
const DB_IO = require("./db_io");
const Scrapper = require("./scrapping");
const CronJob = require("cron").CronJob;
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.listen(8080, DB_IO.dbInit);

app.post("/Matchup", DB_IO.dbAddEntry);
app.post("/Games", DB_IO.gamesAddEntry);

app.get("/Games", DB_IO.gamesGetData);
app.get("/Matchup", DB_IO.dbGetData);
app.get("/Matchup/bySite", DB_IO.dbGetDataSite);
app.get("/Matchup/sinceTime", DB_IO.dbGetDataSince);

const job = new CronJob("0 0 0 0 * *", function() {
  console.log("ran scrapper");
  Scrapper.getFromAPI();
});
job.start();

const job2 = new CronJob("0 0 0 0 * *", function() {
  console.log("ran game scrapper");
  Scrapper.getGameFromAPI();
});
job.start();
