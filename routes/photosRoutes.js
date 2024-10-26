// routes/photoRoutes.js
const url = require('url');
const {
  getPhotosWithAlbums,
  getPhotoById,
  getPhotoByTitle
} = require('../controllers/photoController');

// Route functions
const photoRoutes = async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const { pathname, query } = parsedUrl;

  // Set response headers
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');

  if (pathname === '/api/photos' && req.method === 'GET') {
    // Get query parameters for pagination and sorting
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const sortBy = query.sortBy || 'id';
    const order = query.order || 'asc';

    try {
      const photos = await getPhotosWithAlbums(page, limit, sortBy, order);
      res.statusCode = 200;
      res.end(JSON.stringify(photos));
    } catch (err) {
      res.statusCode = 500;
      res.end(JSON.stringify({ error: err.message }));
    }
  } else if (pathname.startsWith('/api/photos/') && req.method === 'GET') {
    const photoId = parseInt(pathname.split('/').pop());
    try {
      const photo = await getPhotoById(photoId);
      if (!photo) {
        res.statusCode = 404;
        res.end(JSON.stringify({ message: `Photo with ID ${photoId} not found.` }));
      } else {
        res.statusCode = 200;
        res.end(JSON.stringify(photo));
      }
    } catch (err) {
      res.statusCode = 500;
      res.end(JSON.stringify({ error: err.message }));
    }
  } else if (pathname === '/api/photos/title' && req.method === 'GET') {
    const title = query.title;
    try {
      const photo = await getPhotoByTitle(title);
      if (!photo) {
        res.statusCode = 404;
        res.end(JSON.stringify({ message: `Photo with title "${title}" not found.` }));
      } else {
        res.statusCode = 200;
        res.end(JSON.stringify(photo));
      }
    } catch (err) {
      res.statusCode = 500;
      res.end(JSON.stringify({ error: err.message }));
    }
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ message: 'Route not found' }));
  }
};

module.exports = photoRoutes;
