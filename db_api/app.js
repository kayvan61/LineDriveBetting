const express = require("express");
const DB_IO = require("./db_io");
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

app.post("/Users", DB_IO.userSignup);
app.post("/Comments/add", DB_IO.commentsPut);

app.post("/lines", DB_IO.linesAddEntry);
app.post("/spreads", DB_IO.spreadsAddEntry);
app.post("/totals", DB_IO.totalsAddEntry);
app.post("/nflgames", DB_IO.nflgamesAddEntry);

app.get("/Users/find", DB_IO.getUserNameByToken);
app.get("/Users", DB_IO.userLogin);
app.get("/Comments", DB_IO.commentsGet);

app.get("/lines", DB_IO.linesGetData);
app.get("/spreads", DB_IO.spreadsGetData);
app.get("/totals", DB_IO.totalsGetData);
app.get("/nflgames", DB_IO.nflgamesGetData);

const job = new CronJob("0 0 */8 * * *", function() {
  console.log("ran line data scraper");
  DB_IO.dropNFLGamesData();
  NewScraper.getSpreadsFromAPI();
  NewScraper.getTotalsFromAPI();
  NewScraper.getLineFromAPI();
});
job.start();

exports.app = app;
