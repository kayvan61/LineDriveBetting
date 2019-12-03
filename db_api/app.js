const express = require("express");
const DB_IO = require("./db_io");
const lines = require("./nflLineIO");
const totals = require("./nflTotalsIO");
const spreads = require("./nflSpreadsIO");
const games = require("./nflGamesIO");
const users = require("./usersIO");
const comments = require("./commentsIO");
const NewScraper = require("./scrape");
const CronJob = require("cron").CronJob;
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

console.log(app.settings.env);

if(app.settings.env === "test"){
  console.log("testing");
}

DB_IO.dbInit(app.settings.env === "test");

const port = process.env.PORT || 8080;
app.listen(port);

app.post("/Users", users.userSignup);
app.post("/Comments/add", comments.commentsPut);

app.post("/lines", lines.linesAddEntry);
app.post("/spreads", spreads.spreadsAddEntry);
app.post("/totals", totals.totalsAddEntry);
app.post("/nflgames", games.nflgamesAddEntry);

app.get("/Users/find", users.getUserNameByToken);
app.get("/Users", users.userLogin);
app.get("/Comments", comments.commentsGet);

app.get("/lines", lines.linesGetData);
app.get("/spreads", spreads.spreadsGetData);
app.get("/totals", totals.totalsGetData);
app.get("/nflgames", games.nflgamesGetData);

const job = new CronJob("0 0 */8 * * *", function() {
  console.log("ran line data scraper");
  games.dropNFLGamesData();
  NewScraper.getSpreadsFromAPI();
  NewScraper.getTotalsFromAPI();
  NewScraper.getLineFromAPI();
});
job.start();

exports.app = app;
