const mongoose = require('mongoose');
const Schema = mongoose.Schema;


  //create GeoLocation Schema
  const GeoSchema = new Schema({
  	type: {
  		type: String,
  		default:"Point"
  	},
  	coordinates:{
  		type: [Number],
  		index: "2dsphere"
  	}
  })

//create ninnja Schema
const PitchSchema = new Schema({
	name:{

		type: String,
		required: [true, 'name is required']
	},
	geometry: GeoSchema,

	phone: String

});


const Pitch = mongoose.model('pitch', PitchSchema);

module.exports = Pitch;