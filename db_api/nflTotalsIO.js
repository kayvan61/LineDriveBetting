const Totals = require("./models/totals.model");

/***************************** NFL TOTALS *******************************/

exports.totalsAddEntry = function(request, response) {
var teamsTag = request.body["teams"]
    .sort()
    .join("")
    .toLowerCase();

var newOver = request.body.oddsOver;
var newUnder = request.body.oddsUnder;
var newpt = request.body.points;
Totals.findOneAndUpdate(
    {
    teamsTag: teamsTag,
    site: request.body.site,
    gameTime: request.body.gameTime
    },
    { $push: { oddsOver: newOver, oddsUnder: newUnder, points: newpt } },
    { upsert: true }
)
    .exec()
    .then(() => {
    console.log("Added a totals data point");
    response.status(200).send("your input was added\n");
    })
    .catch(() => {
    console.log("error adding a totals data point");
    response.status(500).send("your input was probably was malformed\n");
    });
};

exports.totalsGetData = function(request, response) {
var querry = {
    teamsTag: {
    $eq: [request.query.teama, request.query.teamb]
        .sort()
        .join("")
        .toLowerCase()
    },
    gameTime: { $eq: request.query.gameTime }
};
Totals.find(querry)
    .exec()
    .then(res => {
    console.log("returned " + res.length + " items");
    response.status(200).json({
        res
    });
    })
    .catch(err => {
    console.log(err);
    response.status(500).send(err);
    });
};

exports.totalsDropData = function(request, response) {
Totals.deleteMany({}).catch(err =>
    response.status(500).json("Error: " + err)
);
};
