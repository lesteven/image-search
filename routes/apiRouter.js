var express = require('express');
var api = express.Router();
var mongoose = require('mongoose');

api.route('/')

.get(function(req,res,next){
	res.end('hello world!')
})

module.exports = api;