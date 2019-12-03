process.env.NODE_ENV = 'test';

const assert = require("assert");
const { app } = require("../app");
const chai = require("chai");
const chaiHttp = require("chai-http");

chai.use(chaiHttp);
chai.should();

/*
app.get("/Users/find", DB_IO.getUserNameByToken);
app.get("/Users", DB_IO.userLogin);
app.get("/Comments", DB_IO.commentsGet);

app.get("/lines", DB_IO.linesGetData);
app.get("/spreads", DB_IO.spreadsGetData);
app.get("/totals", DB_IO.totalsGetData);
app.get("/nflgames", DB_IO.nflgamesGetData);
*/

/*
app.post("/Users", DB_IO.userSignup);
app.post("/Comments/add", DB_IO.commentsPut);

app.post("/lines", DB_IO.linesAddEntry);
app.post("/spreads", DB_IO.spreadsAddEntry);
app.post("/totals", DB_IO.totalsAddEntry);
app.post("/nflgames", DB_IO.nflgamesAddEntry);
*/

beforeEach(() => {
  console.log("before");
})

describe("Database POST endpoints with no data", function() {
  describe("POST /", function() {
    it("return 404", function(done) {
      chai
        .request(app)
        .post("/")
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });
  describe("POST /lines", function() {
    it("add the lines for a team matchup", function(done) {
      chai
        .request(app)
        .post("/lines")
        .end((err, res) => {
          res.should.have.status(500);
          done();
        });
    });
  });
    describe("POST /lines", function() {
    it("add the spreads for a team matchup", function(done) {
      chai
        .request(app)
        .post("/spreads")
        .end((err, res) => {
          res.should.have.status(500);
          done();
        });
    });
    });
    describe("POST /totals", function() {
    it("add the totals for a team matchup", function(done) {
      chai
        .request(app)
        .post("/totals")
        .end((err, res) => {
          res.should.have.status(500);
          done();
        });
    });
  });
  describe("POST /nflgames", function() {
    it("add a matchup", function(done) {
      chai
        .request(app)
        .post("/nflgames")
        .end((err, res) => {
          res.should.have.status(500);         
          done();
        });
    });
  });
});

describe("Database POST endpoints with bad data", function() {
  describe("POST /lines with data that is incomplete", function() {
    it("adds a lines team matchup without data", function(done) {
      chai
        .request(app)
        .post("/lines")
        .send({"teams": ["a", "b"]})
        .end((err, res) => {
          res.should.have.status(500);
          done();
        });
    });
    it("adds a lines team matchup where the team names are not a list", function(done) {
      chai
        .request(app)
        .post("/lines")
        .send({"teams": "a"})
        .end((err, res) => {
          res.should.have.status(500);
          done();
        });
    });
    it("adds a lines team matchup without team names", function(done) {
      chai
        .request(app)
        .post("/lines")
        .send({"odds0" : 0, "odds1": 1})
        .end((err, res) => {
          res.should.have.status(500);
          done();
        });
    });
    it("sends an empty body", function(done) {
      chai
        .request(app)
        .post("/lines")
        .send({})
        .end((err, res) => {
          res.should.have.status(500);
          done();
        });
    });
  });
  describe("POST /spreads with data that is incomplete", function() {
    it("adds a spreads team matchup without team names", function(done) {
      chai
        .request(app)
        .post("/spreads")
        .send({"odds0" : 0, "odds1": 1})
        .end((err, res) => {
          res.should.have.status(500);
          done();
        });
    });
    it("sends an empty body", function(done) {
      chai
        .request(app)
        .post("/spreads")
        .send({})
        .end((err, res) => {
          res.should.have.status(500);
          done();
        });
    });
  });
  describe("POST /totals with invalid data", function() {
    it("adds a totals team matchup without data", function(done) {
      chai
        .request(app)
        .post("/totals")
        .send({"teams": ["a", "b"]})
        .end((err, res) => {
          res.should.have.status(500);
          done();
        });
    });
    it("adds a totals team matchup where the team names are not a list", function(done) {
      chai
        .request(app)
        .post("/totals")
        .send({"teams": "a"})
        .end((err, res) => {
          res.should.have.status(500);
          done();
        });
    });
   it("adds a totals team matchup without team names ", function(done) {
      chai
        .request(app)
        .post("/totals")
        .send({"odds0" : 0, "odds1": 1})
        .end((err, res) => {
          res.should.have.status(500);
          done();
        });
    });
    it("sends an empty body", function(done) {
      chai
        .request(app)
        .post("/totals")
        .send({})
        .end((err, res) => {
          res.should.have.status(500);
          done();
        });
    });
  });
  describe("POST /nflgames with invalid data", function() {
    it("adds the game entry for a team matchup without team names", function(done) {
      chai
        .request(app)
        .post("/lines")
        .send({"gameTime": a})
        .end((err, res) => {
          res.should.have.status(500);
          done();
        });
    });

    it("adds the game entry for a team matchup without time data", function(done) {
      chai
        .request(app)
        .post("/nflgames")
        .send({"teams" : ["bleh", "blah"]})
        .end((err, res) => {
          res.should.have.status(500);
          done();
        });
    });
    it("sends an empty body", function(done) {
      chai
        .request(app)
        .post("/nflgames")
        .send({})
        .end((err, res) => {
          res.should.have.status(500);
          done();
        });
    });
  });
});

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
  describe("GET /lines", function() {
    it("return the lines for a team matchup", function(done) {
      chai
        .request(app)
        .get("/lines")
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
    describe("GET /spreads", function() {
    it("return the spreads for a team matchup", function(done) {
      chai
        .request(app)
        .get("/spreads")
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
    });
    describe("GET /totals", function() {
    it("return the totals for a team matchup", function(done) {
      chai
        .request(app)
        .get("/totals")
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
