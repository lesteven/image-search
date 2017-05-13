var express = require('express');
var searchImages = express.Router();
//var config = require('../config.js');
var Flickr = require('flickrapi'),
	flickrOptions ={
		api_key:process.env.KEY,
		secret:process.env.SECRET
	};

var mongoose = require('mongoose');
var History = require('../models/history');


searchImages.route('/')

.get(function(req,res,next){
	res.end('Will serach for images!')
});

searchImages.route('/:searchTerm')

.get(function(req,res,next){
	var search = req.params.searchTerm;
	var offset =req._parsedOriginalUrl.search;
	//console.log(search);
	var offsetNum = checkOffset(offset)
	//console.log(offsetNum)
	var searchDoc = {
		'search-term': search,
		'search-time': new Date()
	}
	Flickr.tokenOnly(flickrOptions,function(error,flickr){
		flickr.photos.search({
		  text: search
		}, function(err, result) {
			History.collection.insert(searchDoc,function(err,history){
				if(err) throw err;
				console.log('history created',history);
			})

			var imgArray = createJson(result,offsetNum);

		  	res.json(imgArray)
		})
	})
	
})

function createJson(result,offset){
	var imgArray = [];
	var j = offset;
	for(var i=j; i < j+10; i++){
		var farmNum = result.photos.photo[i].farm;
		var serverId = Number(result.photos.photo[i].server);
		var id = Number(result.photos.photo[i].id);
		var secret = result.photos.photo[i].secret;
		var title = result.photos.photo[i].title;
		var link = `https://farm${farmNum}.staticflickr.com/${serverId}/${id}_${secret}`;
		var owner = result.photos.photo[i].owner;
		var userLink = `https://www.flickr.com/people/${owner}`
		var snippet = result.photos.photo[i].title
		var img = {
		  	'url':link +`.jpg`,
		  	'snippet':snippet,
		  	'thumbnail': link + `_t.jpg`,
		  	'context': userLink
		  }
		imgArray.push(img);	 
	  //console.log(result.photos.photo.length)
	}
	return imgArray;
}

function checkOffset(offset){
	var re = /\?offset=/;
	var checkNum = /\d+/g;
	if(re.test(offset) && checkNum.test(offset)){
		return Number(offset.match(checkNum)[0])
	}
	else{
		return 0;
	}
}

module.exports = searchImages;