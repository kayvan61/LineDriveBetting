const Spreads = require("./models/spreads.model");

/***************************** NFL SPREADS *******************************/

exports.spreadsAddEntry = function(request, response) {
var teamsTag = request.body["teams"]
    .sort()
    .join("")
    .toLowerCase();

var new0 = request.body.odds0;
var new1 = request.body.odds1;
var newpt0 = request.body.points0;
var newpt1 = request.body.points1;
Spreads.findOneAndUpdate(
    {
    teamsTag: teamsTag,
    site: request.body.site,
    gameTime: request.body.gameTime
    },
    { $push: { odds0: new0, odds1: new1, points0: newpt0, points1: newpt1 } },
    { upsert: true }
)
    .exec()
    .then(() => {
    console.log("Added a spreads data point");
    response.status(200).send("your input was added\n");
    })
    .catch(() => {
    console.log("error adding a spreads data point");
    response.status(500).send("your input was probably was malformed\n");
    });
};

exports.spreadsGetData = function(request, response) {
var querry = {
    teamsTag: {
    $eq: [request.query.teama, request.query.teamb]
        .sort()
        .join("")
        .toLowerCase()
    },
    gameTime: { $eq: request.query.gameTime }
};
Spreads.find(querry)
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

exports.spreadsDropData = function(request, response) {
Spreads.deleteMany({}).catch(err =>
    response.status(500).json("Error: " + err)
);
};
