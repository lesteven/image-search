var express = require('express');
var searchHistory = express.Router();

var mongoose = require('mongoose');
var History = require('../models/history')

searchHistory.route('/')

.get(function(req,res,next){
	History.find({}).
	limit(10).
	sort('-search-time')
	.exec(function(err,docs)
	{
		if(err) throw err;
		console.log(docs)
		res.json(docs);
	});
	
})

module.exports = searchHistory;