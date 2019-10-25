const express = require("express");
const DB_IO = require("./db_io");
const Scraper = require("./scraping");
const CronJob = require("cron").CronJob;
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.listen(8080, DB_IO.dbInit);

app.post("/Matchup", DB_IO.dbAddEntry);
app.post("/Games", DB_IO.gamesAddEntry);

app.get("/Users/Register", DB_IO.userSignup);
app.get("/Games", DB_IO.gamesGetData);
app.get("/Matchup", DB_IO.dbGetData);
app.get("/Matchup/bySite", DB_IO.dbGetDataSite);
app.get("/ForcePoll", Scraper.getFromAPI);

const job = new CronJob("0 0 0/12 * * *", function() {
  console.log("ran scraper");
  Scraper.getFromAPI();
});
job.start();

const job2 = new CronJob("0 0 0 0 * *", function() {
  console.log("ran game scraper");
  Scraper.getGameFromAPI();
});
job2.start();
