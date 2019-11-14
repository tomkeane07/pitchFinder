const express = require ('express');
const router = express.Router();
const Pitch = require('../models/pitches');

//get list of Ninjas from DB
router.get('/pitches', function(req, res){


	Pitch.aggregate(
		[{ $geoNear: {
		 near: {
		 	type: 'Point', 
		 	coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)]
		 }, 
		 spherical: true, maxDistance: 100000, distanceField: "dist.calculated" 
		}}
	]).then(function(results){ res.send(results); });

});

router.post('/pitches', function(req, res, next){
	/*
	var ninja = new Ninja(req.body);
	ninja.save();*/
	Pitch.create(req.body).then(function(pitch){
		res.send(pitch);

	}).catch(next);
});

router.put('/pitches/:id', function(req, res, next){
	
	Pitch.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
		Pitch.findOne({_id: req.params.id}).then(function(pitch){
			res.send(pitch);
		});
	});

});

router.delete('/pitches/:id', function(req, res, next){
	
	Pitch.findByIdAndRemove({_id: req.params.id});
});



module.exports = router;