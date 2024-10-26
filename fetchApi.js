const mongoose = require('mongoose');
const axios = require('axios');

// Function to fetch data from the API and store it in MongoDB
const invokedFecth =()=>{
const fetchData = async () => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/photos');
    const photos = response.data;

    // Loop through fetched photos and store in MongoDB if not already present
    for (const photo of photos) {
      try {
        // Using upsert to prevent duplicates by 'id'
        await Photo.findOneAndUpdate(
          { id: photo.id },  // Find by unique identifier (id)
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
}

module.exports = invokedFecth;