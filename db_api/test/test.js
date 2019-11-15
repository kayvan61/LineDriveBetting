const assert = require("assert");
const { app } = require("../app");
const chai = require("chai");
const chaiHttp = require("chai-http");

chai.use(chaiHttp);
chai.should();

/*
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

*/

describe("Database GET endpoints", function() {
  describe("GET /", function() {
    it("return 404", function(done) {
      chai
        .request(app)
        .get("/")
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });
  describe("GET /Matchup", function() {
    it("return a matchup", function(done) {
      chai
        .request(app)
        .get("/Matchup")
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
  describe("GET /nflgames", function() {
    it("return a matchup", function(done) {
      chai
        .request(app)
        .get("/nflgames")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("Array");
          done();
        });
    });
  });
});
