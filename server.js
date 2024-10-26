const http = require('http');
const hostname = '127.0.0.1';
const photoRoutes = require('./routes/photosRoutes.js')
const db = require('./config/dbCongfig.js')
const {invokedFecth} = require('./fetchApi.js')
const cron = require('node-cron');
const axios = require ('axios')
const Photo = require('./models/photo.js')

db() //invoke mongoseDb Atlas

const fetchData = async () => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/photos');
    const photos = response.data;

    // Loop through fetched photos and store in MongoDB if not already present
    for (const photo of photos) {
      try {
        // Using upsert to prevent duplicates by 'id'
        await Photo.findOneAndUpdate(
          { id: Photo.id },  // Find by unique identifier (id)
          { $set: photo },  // Set the new values if found
          { upsert: true }   // Create a new document if not found
        );
      } catch (err) {
        console.error(`Error updating/inserting photo with ID ${photo.id}:`, err.message);
      }
    }
    console.log('Data fetched and stored in MongoDB Atlas.');
  } catch (error) {
    console.error('Error fetching data from API:', error);
  }
};

// Schedule fetchData to run every 1 minute using node-cron
cron.schedule('* * * * *', fetchData);

// Optionally, run fetchData immediately when the script starts
fetchData();
const server = http.createServer(async (req, res) => {
  // Delegate all incoming requests to the photoRoutes function
  await photoRoutes(req, res);
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});