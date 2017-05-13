var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var historySchema = new Schema({
	'search-term':{type:String,required:true},
	'search-time':{type:Date,required:true}
},{
	timestamps:true
})

var History = mongoose.model('history',historySchema);

module.exports = History;