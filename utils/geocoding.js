const axios = require('axios');

const geocodeLocation = async (location) => {
    try {
        const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
            params: {
                q: location,
                format: 'json',
                limit: 1
            }
        });
        
        if (response.data && response.data.length > 0) {
            const { lat, lon } = response.data[0];
            return {
                type: 'Point',
                coordinates: [parseFloat(lon), parseFloat(lat)]
            };
        }
        
        // Default coordinates for India if geocoding fails
        return {
            type: 'Point',
            coordinates: [77.2090, 28.6139] // New Delhi
        };
    } catch (error) {
        console.error('Geocoding error:', error);
        return {
            type: 'Point',
            coordinates: [77.2090, 28.6139] // New Delhi
        };
    }
};

module.exports = { geocodeLocation };