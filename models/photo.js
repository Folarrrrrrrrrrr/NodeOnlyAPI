const mongoose = require('mongoose');

// defining the photo table with the relevant relationship with the album table 
const photoSchema = new mongoose.Schema({
  // albumId: { 
  //   type: mongoose.Schema.Types.ObjectId, 
  //   ref: 'Album', 
  //   required: true 
  // },
  id: { type: Number, unique: true, required: true }, // Unique ID for the photo
  title: String,
  url: String,
  thumbnailUrl: String
});

// Create the Photo model
const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo