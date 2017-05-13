var express = require('express');
var morgan = require('morgan');
//connects to mongodb
var url =(process.env.MONGODB_URI ||'mongodb://localhost:27017/history')
var mongoose = require('mongoose');
mongoose.connect(url);
var db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error:'));
db.once('open',function(){console.log('Connected correctly to server')});
//connects to server
var app = express();
app.use(morgan('dev'));
var port =(process.env.PORT||3000);
//connects to router
var api = require('./routes/apiRouter');
var searchHistory = require('./routes/searchHistory');
var searchImage = require('./routes/searchImage');

app.use('/',express.static(__dirname+'/public'));

app.use('/api',api);
app.use('/api/latest/imagesearch',searchHistory);
app.use('/api/imagesearch',searchImage);

app.listen(port,function(){
	console.log(`Listening on port ${port}`)
})