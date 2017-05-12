var express = require('express');
var searchImages = express.Router();
var config = require('../config.js')
var Flickr = require('flickrapi'),
	flickrOptions ={
		api_key:config.apiKey,
		secret:config.secret
	}
searchImages.route('/')

.get(function(req,res,next){
	res.end('Will serach for images!')
});

searchImages.route('/:searchTerm')

.get(function(req,res,next){
	var search = req.params.searchTerm
	console.log(search)

	Flickr.tokenOnly(flickrOptions,function(error,flickr){
		flickr.photos.search({
		  text: search
		}, function(err, result) {
				var farmNum = result.photos.photo[0].farm;
				var serverId = Number(result.photos.photo[0].server);
				var id = Number(result.photos.photo[0].id);
				var secret = result.photos.photo[0].secret;
				var title = result.photos.photo[0].title;
				var link = `https://farm${farmNum}.staticflickr.com/${serverId}/${id}_${secret}`;
				var owner = result.photos.photo[0].owner;
				var userLink = `https://www.flickr.com/people/${owner}`
		  console.log(result.photos.photo.length)
		  res.json({
		  	'url':link +`.jpg`,
		  	'snippet':result.photos.photo[0].title,
		  	'thumbnail': link + `_t.jpg`,
		  	'context': userLink
		  })
		})
	})
	
})

module.exports = searchImages;