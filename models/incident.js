var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var Schema = mongoose.Schema;

var incident = new Schema({
  title:{
     type: String,

   },
  start_date: {type: Date, default: Date.now, index:true},
  status: {
    type: String
  },
  affected: [],



});

module.exports = mongoose.model('Incident', incident);
