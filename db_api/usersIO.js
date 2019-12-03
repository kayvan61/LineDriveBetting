const User = require("./models/user.model");
const crypto = require("crypto");

  
/***************************** USERS *******************************/

exports.userSignup = function(request, response) {
console.log("useradding");
new User({
    userName: request.query.userName,
    saltedPass: request.query.saltedPass,
    salt: request.query.salt
})
    .save()
    .then(() => {
    console.log("Added a user");
    response.status(200).send("your input was added\n");
    })
    .catch(err => {
    console.log("error adding a user");
    console.log(err);
    response.status(500).send("username was taken.\n");
    });
};

exports.userLogin = function(request, response) {
User.find({
    userName: { $eq: request.query.userName }
})
    .then(res => {
    if (res.length === 0) {
        console.log("no user found");
        response.status(204).send("Username not found.");
    } else {
        var token = res[0]["_id"];
        var salt = res[0]["salt"];
        var pw = request.query.password;
        var hashedpw = crypto
        .createHash("md5")
        .update(pw + salt)
        .digest("hex");

        if (hashedpw === res[0]["saltedPass"]) {
        console.log("found user properly");
        response.status(200).json({ token: token });
        } else {
        console.log("found user with incorrect password");
        response.status(204).send("incorrect password.");
        }
    }
    })
    .catch(err => {
    console.log("error finding a user");
    console.log(err);
    response.status(500).json(err);
    });
};

exports.getUserNameByToken = function(request, response) {
User.find({
    _id: { $eq: request.query.token }
})
    .then(res => {
    if (res.length === 0) {
        console.log("no user found");
        response.status(204).send("invalid token");
    } else {
        var ur = res[0]["userName"];
        response.status(200).json({ userName: ur });
    }
    })
    .catch(err => {
    console.log("error getting a user by token");
    console.log(err);
    response.status(500).json(err);
    });
};
