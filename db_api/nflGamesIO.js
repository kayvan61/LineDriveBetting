const nflGames = require("./models/nflgames.model");

/***************************** NFL GAMES *******************************/

exports.nflgamesAddEntry = function(request, response) {
new nflGames({
    teams: request.body.teams,
    gameTime: request.body.gameTime
})
    .save()
    .then(() => {
    console.log("Added a nfl game data point");
    response.status(200).send("your input was added\n");
    })
    .catch(() => {
    console.log("error adding a nfl game data point");
    response.status(500).send("your input was probably was malformed\n");
    });
};

exports.nflgamesGetData = function(request, response) {
nflGames
    .find({})
    .then(games => response.json(games))
    .catch(err => response.status(500).json("Error: " + err));
};

exports.dropNFLGamesData = function(request, response) {
nflGames
    .deleteMany({})
    .then(() => console.log("deleting nfl games"))
    .catch(err => response.status(500).json("Error: " + err));
};