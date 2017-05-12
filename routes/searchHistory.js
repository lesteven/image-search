var express = require('express');
var searchHistory = express.Router();

searchHistory.route('/')

.get(function(req,res,next){
	res.end('This is the history!');
})

module.exports = searchHistory;