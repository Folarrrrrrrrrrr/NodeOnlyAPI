const mongoose = require('mongoose');

// Define the Album schema
const albumSchema = new mongoose.Schema({
  albumId: { type: Number, unique: true, required: true }, // Unique ID for the album
  title: { type: String}, // Title field is optional
  description: { type: String } // desctiption field is optional
});

// Create the Album model
const Album = mongoose.model('Album', albumSchema);

module.exports = Album;