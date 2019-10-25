const request = require("request");
const Express = require("express");

var headers = {
	'apikey': 'ccdd7160-f5df-11e9-9e1c-499eb4566c8b'
};

var options = {
	url: 'https://app.oddsapi.io/api/v1/odds?sport=american-football&country=usa&league=american-football-usa-nfl&apikey=ccdd7160-f5df-11e9-9e1c-499eb4566c8b',
	headers: headers
};

function callback(error, response, body) {
	if (!error && response.statusCode == 200) {
	    processJSON(body);
	} else {
	    console.log("Error posting scrapped data to DB:");
	    console.log(error);
	    console.log(response);
	}
}

function processJSON(js) {
    //console.log('received data: ' + data);
    var j_data = JSON.parse(js);
    for(var item of j_data) {
	var home = item['event']['home'].split(" ").slice(-1)[0];
	var away = item['event']['away'].split(" ").slice(-1)[0];
	for(var betType in item['sites']) {
	    for(var site in item['sites'][betType]) {
		var oneSite = item['sites'][betType][site];
		if(typeof oneSite =='object'){
		    var options = {
			uri    : 'http://localhost:8080/Matchup',
			method : 'POST',
			json   : {
			    'Teams'         : [home, away],
			    'DataType'      : betType,
			    'Site'          : site,
			    'Value'         : oneSite['odds'],
			    'EventStartTime': item['event']['start_time']
			}
		    };
		    request(options, function(error, res, b) {
			if(!error && res.statusCode == 200) {
			    console.log("added element to db successfully");
			}
		    })
		}
	    }
	}
    }

}

exports.getFromAPI = function(){
    request(options, callback);
}
