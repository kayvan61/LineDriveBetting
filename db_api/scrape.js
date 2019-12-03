const request = require("request");
const Express = require("express");

class StrategyManager {
  constructor() {
    this._strategies = [];
  }
  addStrategy(strategy) {
    this._strategies = [...this._strategies, strategy];
  }
  getStrategy(name) {
    return this._strategies.find(strategy => strategy.name === name);
  }
}

class Strategy {
  constructor(name, handler) {
    this._name = name;
    this._handler = handler;
  }
  doAction() {
    this._handler();
  }
}

const strategyManager = new StrategyManager();
const linesStrategy = new Strategy("linesStrategy", () => lineCallback());
const spreadsStrategy = new Strategy("spreadsStrategy", () =>
  spreadsCallback()
);
const totalsStrategy = new Strategy("totalsStrategy", () => totalsCallback());

strategyManager.addStrategy(linesStrategy);
strategyManager.addStrategy(spreadsStrategy);
strategyManager.addStrategy(totalsStrategy);

var headers = {
  apikey: "e2c319ef4e5d1be84c148a343989b489"
};

var optionsLine = {
  url:
    "https://api.the-odds-api.com/v3/odds/?sport=americanfootball_nfl&region=us&mkt=h2h&apiKey=e2c319ef4e5d1be84c148a343989b489",
  headers: headers
};

var optionsSpreads = {
  url:
    "https://api.the-odds-api.com/v3/odds/?sport=americanfootball_nfl&region=us&mkt=spreads&apiKey=e2c319ef4e5d1be84c148a343989b489",
  headers: headers
};

var optionsTotals = {
  url:
    "https://api.the-odds-api.com/v3/odds/?sport=americanfootball_nfl&region=us&mkt=totals&apiKey=e2c319ef4e5d1be84c148a343989b489",
  headers: headers
};

function lineCallback(error, response, body) {
  if (!error && response.statusCode == 200) {
    processLineJSON(body);
  } else {
    console.log("Error posting scraped moneyline data to DB:");
    console.log(error);
    console.log(response);
  }
}

function processLineJSON(js) {
  var j_data = JSON.parse(js);
  data = j_data["data"];

  for (var game of data) {
    var options = {
      uri: "http://localhost:8080/nflgames",
      method: "POST",
      json: {
        teams: game.teams,
        gameTime: game.commence_time
      }
    };
    request(options, function(error, res, b) {
      if (!error && res.statusCode == 200) {
        console.log("added nfl game element to db successfully");
      }
    });

    for (var site of game["sites"]) {
      var options = {
        uri: "http://localhost:8080/lines",
        method: "POST",
        json: {
          teams: game["teams"],
          site: site["site_nice"],
          odds0: site["odds"]["h2h"][0],
          odds1: site["odds"]["h2h"][1],
          gameTime: game.commence_time
        }
      };
      request(options, function(error, res, b) {
        if (!error && res.statusCode == 200) {
          console.log("added line element to db successfully");
        }
      });
    }
  }
}

function spreadsCallback(error, response, body) {
  if (!error && response.statusCode == 200) {
    processSpreadsJSON(body);
  } else {
    console.log("Error posting scraped spreads data to DB:");
    console.log(error);
    console.log(response);
  }
}

function processSpreadsJSON(js) {
  var j_data = JSON.parse(js);
  data = j_data["data"];

  for (var game of data) {
    for (var site of game["sites"]) {
      var options = {
        uri: "http://localhost:8080/spreads",
        method: "POST",
        json: {
          teams: game.teams,
          site: site.site_nice,
          odds0: site.odds.spreads.odds[0],
          odds1: site.odds.spreads.odds[1],
          points0: site.odds.spreads.points[0],
          points1: site.odds.spreads.points[1],
          gameTime: game.commence_time
        }
      };
      request(options, function(error, res, b) {
        if (!error && res.statusCode == 200) {
          console.log("added spread element to db successfully");
        }
      });
    }
  }
}

function totalsCallback(error, response, body) {
  if (!error && response.statusCode == 200) {
    processTotalsJSON(body);
  } else {
    console.log("Error posting scraped totals data to DB:");
    console.log(error);
    console.log(response);
  }
}

function processTotalsJSON(js) {
  var j_data = JSON.parse(js);
  data = j_data["data"];

  for (var game of data) {
    for (var site of game["sites"]) {
      var options = {
        uri: "http://localhost:8080/totals",
        method: "POST",
        json: {
          teams: game.teams,
          site: site.site_nice,
          oddsOver: site.odds.totals.odds[0],
          oddsUnder: site.odds.totals.odds[1],
          points: site.odds.totals.points[0],
          gameTime: game.commence_time
        }
      };
      request(options, function(error, res, b) {
        if (!error && res.statusCode == 200) {
          console.log("added totals element to db successfully");
        }
      });
    }
  }
}

exports.getFromAPI = function(strat) {
  const strategy = strategyManager.getStrategy(strat);
  request(optionsTotals, strategy.doAction);
};
