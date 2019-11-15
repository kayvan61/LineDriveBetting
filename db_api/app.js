const express = require("express");
const DB_IO = require("./db_io");
const Scraper = require("./scraping");
const NewScraper = require("./scrape");
const CronJob = require("cron").CronJob;
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 8080;
app.listen(port, DB_IO.dbInit);

app.post("/Matchup", DB_IO.dbAddEntry);
app.post("/Games", DB_IO.gamesAddEntry);
app.post("/Users", DB_IO.userSignup);
app.post("/Comments/add", DB_IO.commentsPut);

app.post("/lines", DB_IO.linesAddEntry);
app.post("/spreads", DB_IO.spreadsAddEntry);
app.post("/totals", DB_IO.totalsAddEntry);
app.post("/nflgames", DB_IO.nflgamesAddEntry);

app.get("/Users/find", DB_IO.getUserNameByToken);
app.get("/Users", DB_IO.userLogin);
app.get("/Games", DB_IO.gamesGetData);
app.get("/Matchup", DB_IO.dbGetData);
app.get("/Matchup/bySite", DB_IO.dbGetDataSite);
app.get("/Comments", DB_IO.commentsGet);
app.get("/ForcePoll", Scraper.getFromAPI);

app.get("/lines", DB_IO.linesGetData);
app.get("/spreads", DB_IO.spreadsGetData);
app.get("/totals", DB_IO.totalsGetData);
app.get("/nflgames", DB_IO.nflgamesGetData);

// const job = new CronJob("0 0 */6 * * *", function() {
//   console.log("ran data scraper");
//   Scraper.getFromAPI();
// });
// job.start();

// const job2 = new CronJob("0 0 */6 * * *", function() {
//   console.log("ran game scraper");
//   DB_IO.dropGamesData();
//   Scraper.getGameFromAPI();
// });
// job2.start();

const job = new CronJob("0 0 */8 * * *", function() {
  console.log("ran line data scraper");
  DB_IO.dropNFLGamesData();
  NewScraper.getLineFromAPI();
  NewScraper.getSpreadsFromAPI();
  NewScraper.getTotalsFromAPI();
});
job.start();

exports.app = app;
