var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var UpdateIncident = new Schema({
    title: {type: String, default: "list of UpdateIncident"},
    incidents:[{type: ObjectId, ref:'Incident'}]
});

module.exports = mongoose.model('UpdateIncident', UpdateIncident);
