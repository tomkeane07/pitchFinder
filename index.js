const express = require('express');
const bP = require('body-parser');
const mongoose = require('mongoose');

//set app
const app = express();

//connect to momngoDB
mongoose.connect('mongodb://localhost/pitchFinder',{
	 useNewUrlParser: true, useFindAndModify: false 
});

mongoose.Promise = global.Promise;

app.use(express.static('public'));

app.use(bP.json());

//initialize routes
app.use('/api', require('./routes/api') );

//error handling middleware
app.use(function(err, req, res, next){
	res.status(422).send({error: err.message} );
})


//listen for requests
app.listen(process.env.port || 3000, function(){
	console.log('Connected to port 3000');
})