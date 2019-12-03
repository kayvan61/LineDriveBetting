const Comments = require("./models/comments.model").Comments;

/********************* COMMENTS ***************************/

exports.commentsPut = function(request, response) {
console.log(request.body);
var teamsTag = request.body["Teams"]
    .sort()
    .join("")
    .toLowerCase();

Comments.findOneAndUpdate(
    { Teams: teamsTag, gameTime: request.body.gameTime },
    { $push: { Comments: request.body.Comment } },
    { upsert: true }
)
    .exec()
    .then(res => {
    console.log("updated a comment");
    response.status(200).send("your comment was added\n");
    })
    .catch(err => {
    console.log("error updating a comment");
    console.log(request.body);
    console.log(err);
    response.status(500).send("your input was probably was malformed\n");
    });
};

exports.commentsGet = function(request, response) {
var querry = {
    Teams: {
    $eq: [request.query.teama, request.query.teamb]
        .sort()
        .join("")
        .toLowerCase()
    },
    gameTime: { $eq: request.query.gameTime }
};

Comments.find(querry)
    .exec()
    .then(res => {
    console.log("returned " + res.length + " items");
    response
        .status(200)
        .json({
        res
        })
        .end();
    })
    .catch(err => {
    console.log(err);
    response
        .status(500)
        .send(err)
        .end();
    });
};
