// import { Photo } from "../models/photo";
const {Photo} = require ('../models/photo')
// Helper function for pagination and sorting
const getPhotosWithAlbums = async (page = 1, limit = 10, sortBy = 'id', order = 'asc') => {
  try {
    // Set the sort order: 1 for ascending, -1 for descending
    const sortOrder = order === 'desc' ? -1 : 1;
    
    // Fetch the photos with pagination, sorting, and album details
    const photos = await Photo.find()
      .populate('albumId', 'title description')
      .sort({ [sortBy]: sortOrder })
      .skip((page - 1) * limit)
      .limit(limit);

    console.log(`Fetched ${photos.length} photos.`);
    return photos;
  } catch (err) {
    console.error('Error fetching photos with albums:', err);
    throw new err; // Re-throw the error to be handled by the calling function
  }
};

// Fetch a single photo by its unique ID
const getPhotoById = async (photoId) => {
  try {
    const photo = await Photo.findOne({ id: photoId }).populate('albumId', 'title description');
    
    if (!photo) {
      console.log(`Photo with ID ${photoId} not found.`);
      return null;
    }
    
    console.log(`Photo found:`, photo);
    return photo;
  } catch (err) {
    console.error('Error fetching photo by ID:', err);
    throw new err;
  }
};

// Fetch a single photo by title
const getPhotoByTitle = async (photoTitle) => {
  try {
    const photo = await Photo.findOne({ title: photoTitle }).populate('albumId', 'title description');
    
    if (!photo) {
      console.log(`Photo with title "${photoTitle}" not found.`);
      return new null;
    }
    
    console.log(`Photo found:`, photo);
    return photo;
  } catch (err) {
    console.error('Error fetching photo by title:', err);
    throw new err;
  }
};

module.exports = {
  getPhotosWithAlbums,
  getPhotoById,
  getPhotoByTitle,
};
