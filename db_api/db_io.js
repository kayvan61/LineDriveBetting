const Express = require("express");
const BodyParser = require("body-parser");
const Mongoose = require('mongoose');

const DATABASE_NAME = "Prod-DB";
const CONNECTION_URL = "mongodb+srv://atlas-admin:bBcJ97l0uos6tu1Q@linedrivebetting-tfkik.gcp.mongodb.net/"+ DATABASE_NAME +"?retryWrites=true&w=majority";

const BDPointSchema = require('./bettingDataPoint').dbDataPoint;

var database, collection;

exports.dbClose = function() {
    console.log(typeof database);
    database.close();
}

exports.dbInit = function(collectionName) {
    Mongoose.connect(CONNECTION_URL,{
	useNewUrlParser: true,
	useUnifiedTopology: true
    });
    database = Mongoose.connection;
    database.once('open', () => {
	console.log('Database is connected');
    })
    database.on('error', () => {
	console.log('Error connecting to Database');
    })
    console.log(BDPointSchema.obj);

};

exports.dbAddEntry = function(request, response) {

    new BDPointSchema({
	_id            : Mongoose.Types.ObjectId(),
	Teams          : request.body["Teams"],
	EventStartTime : request.body["EventStartTime"],
	Value          : request.body["Value"],
	Site           : request.body["Site"],
	DataType       : request.body["DataType"],
	createdAt      : 0
    }).save()
	.then(() => {
	    console.log("Added a data point");
	    response.status(200).send("your input was added\n");
	})
	.catch(() => {
	    console.log("error adding a data point");
	    response.status(400).send("your input was probably was malformed\n");
	});

};

exports.dbGetData = function(request, response) {
    var querry = {"Teams" : {"$all" : [request.query.teama, request.query.teamb]},
                  "DataType": {"$eq" : request.query.datatype}};
    BDPointSchema.find(querry)
	.exec()
	.then((res) => {
	    console.log("returned " + res.length + " items");
	    response.status(200).json({
		res
	    }).end();	    
	})
	.catch((err) => {
	    console.log(err);
	    response.status(400).send(err).end();
	});
};

exports.dbGetDataSite = function(request, response) {
    var querry = {"Teams" : {"$all" : [request.query.teama, request.query.teamb]},
                  "DataType": {"$eq" : request.query.datatype},
		  "BettingSite" : {"$eq" : request.query.bettingsite}};
    BDPointSchema.find(querry)
	.exec()
	.then((res) => {
	    console.log("returned " + res.length + " items");
	    response.status(200).json({
		res
	    });	    
	})
	.catch((err) => {
	    console.log(err);
	    response.status(400).send(err);
	});

};


exports.dbGetDataSince = function(request, response) {
    var querry = {"Teams" : {"$all" : [request.query.teama, request.query.teamb]},
                  "DataType": {"$eq" : request.query.datatype},
                  "time" : {"$gte" : request.query.since}};
    BDPointSchema.find(querry)
	.exec()
	.then((res) => {
	    console.log("returned " + res.length + " items");
	    response.status(200).json({
		res
	    });	    
	})
	.catch((err) => {
	    console.log(err);
	    response.status(400).send(err);
	});
};
