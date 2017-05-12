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
			var imgArray = [];
			
			for(var i in result.photos.photo){
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

			
		  res.json(imgArray)
		})
	})
	
})

module.exports = searchImages;