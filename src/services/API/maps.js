import express from 'express';
import axios from 'axios';

const app = express();

const GOOGLE_MAPS_API_KEY = 'GOOGLE_MAPS_API_KEY';

app.get('/api/location', async (req, res) => {
    const { address } = req.query;
    
    try {
        const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GOOGLE_MAPS_API_KEY}`);
        
        if (response.data.results.length === 0) {
            return res.status(404).json({ error: 'Address not found' });
        }
        
        const location = response.data.results[0].geometry.location;
        res.json({ longitude: location.lng, latitude: location.lat });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to fetch location data' });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
