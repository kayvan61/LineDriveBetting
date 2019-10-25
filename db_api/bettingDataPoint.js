const Mongoose = require('mongoose');
const Schema   = Mongoose.Schema;
const ObjID    = Schema.Types.ObjectId;
const Array    = Schema.Types.Array;
const String   = Schema.Types.String;

const BettingDataPoint = new Schema({    
    Teams          : {type: String,             required: true},
    EventStartTime : {type: String,             required: true},
    BettingFormat  : {type: String,             required: true},
    Value          : {type: Schema.Types.Mixed, required: true}
},{
    collection : 'BettingLines'
});

BettingDataPoint.methods.addTeam = (team) => {
    if(this.Teams.length === 2) {
	returnthis.Teams ;
    }
    this.Teams = this.Teams.push(team);
    return this.Teams;
};

BettingDataPoint.pre('save', function(next) {
    next();
})

var dbDataPoint = Mongoose.model('dbDataPoint', BettingDataPoint);

exports.dbDataPoint = dbDataPoint;
