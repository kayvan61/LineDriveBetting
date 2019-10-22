
const Express = require("express");
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;

const CONNECTION_URL = "mongodb+srv://atlas-admin:bBcJ97l0uos6tu1Q@linedrivebetting-tfkik.gcp.mongodb.net/test?retryWrites=true&w=majority";
const DATABASE_NAME = "Prod-DB";

var database, collection;


exports.dbInit = function() {
    MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
        if(error) {
            throw error;
        }
        database = client.db(DATABASE_NAME);
        collection = database.collection("BettingLines");
        console.log("Connected to `" + DATABASE_NAME + "`!");
    });
};

exports.dbAddEntry = function(request, response) {
    request.body["time"] = new Date().getTime()
    collection.insertOne(request.body, (error, result) => {
        var isValidPost = checkValidPost(request.body);
        if(error) {
            return response.status(500).send(error);
        }
        if(!isValidPost) {
            return response.status(400).send("malformed payload. format is described in the documentation.\n");
        }
        console.log(request.body);
        response.send(result.result);
    });
};

exports.dbGetData = function(request, response) {
    var querry = {"Teams" : {"$all" : [request.params.teama, request.params.teamb]},
                  "DataType": {"$eq" : request.params.datatype}}
    collection.find(querry).toArray((error, result) => {
        if(error) {
            return response.status(500).send(error);
        }        
        response.send(result);
    });
};

exports.dbGetDataSince = function(request, response) {
    var querry = {"Teams" : {"$all" : [request.params.teama, request.params.teamb]},
                  "DataType": {"$eq" : request.params.datatype},
                  "time" : {"$gte" : request.params.since}}
    collection.find(querry).toArray((error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
};

function checkValidPost(j_obj) {
    var ret = true;
    ret = ret && j_obj.hasOwnProperty('Teams');
    ret = ret && Array.isArray(j_obj['Teams']);
    
    ret = ret && j_obj.hasOwnProperty('DataType');
    ret = ret && (typeof j_obj['DataType'] === 'string');
    
    ret = ret && j_obj.hasOwnProperty('Value');
    
    if(ret) {
        ret = ret && j_obj['Teams'].length === 2;
    }
    return ret;
}
