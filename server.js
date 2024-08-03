require('dotenv').config();
const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

const uri = process.env.MONGODB_URI;

app.use(cors());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Function to get the current date in the format YYYYMMDD
function getCurrentDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
}

// Endpoint to fetch ayah data
app.get('/ayah', async (req, res) => {
    console.log('Received request for /ayah');
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log('Connected to MongoDB');
        const database = client.db('parsa');
        console.log('Database:', database.databaseName);
        const collection = database.collection('ayah');
        const dateKey = getCurrentDate();
        console.log('Generated Date Key:', dateKey);
        const query = { [dateKey]: { $exists: true } };
        console.log('Query:', query);
        const document = await collection.findOne(query);

        if (document && document[dateKey]) {
            console.log('Found document for date:', dateKey);
            res.json(document[dateKey]);
        } else {
            console.log('No document found for date:', dateKey);
            res.status(404).json({ error: 'No ayah found for the current date' });
        }
    } catch (error) {
        console.error('Error fetching ayah:', error);
        res.status(500).json({ error: 'Error fetching ayah' });
    } finally {
        await client.close();
        console.log('Closed MongoDB connection');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
