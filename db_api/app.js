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
app.post("/Users", DB_IO.userSignup);
app.post("/Comments/add", DB_IO.commentsPut);

app.get("/Users/find", DB_IO.getUserNameByToken);
app.get("/Users", DB_IO.userLogin);
app.get("/Games", DB_IO.gamesGetData);
app.get("/Matchup", DB_IO.dbGetData);
app.get("/Matchup/bySite", DB_IO.dbGetDataSite);
app.get("/Comments", DB_IO.commentsGet);
app.get("/ForcePoll", Scraper.getFromAPI);

const job = new CronJob("0 0 */12 * * *", function() {
  console.log("ran data scraper");
  Scraper.getFromAPI();
});
job.start();

const job2 = new CronJob("0 0 */12 * * *", function() {
  console.log("ran game scraper");
  DB_IO.dropGamesData();
  DB_IO.getGameFromAPI();
});
job2.start();
