function initializeMap(hotels) {
    // Initialize map centered on India
    const map = L.map('hotel-map').setView([20.5937, 78.9629], 5);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Add markers for each hotel
    hotels.forEach(hotel => {
        if (hotel.geometry && hotel.geometry.coordinates) {
            const [lng, lat] = hotel.geometry.coordinates;
            
            const marker = L.marker([lat, lng]).addTo(map);
            
            const popupContent = `
                <div>
                    <h6>${hotel.title}</h6>
                    <p><strong>Location:</strong> ${hotel.location}</p>
                    <p><strong>Price:</strong> ₹${hotel.price}</p>
                    <a href="/hotels/${hotel._id}" class="btn btn-sm btn-light">View Details</a>
                </div>
            `;
            
            marker.bindPopup(popupContent);
        }
    });

    // Fit map to show all markers if hotels exist
    if (hotels.length > 0) {
        const group = new L.featureGroup(map._layers);
        if (Object.keys(group._layers).length > 0) {
            map.fitBounds(group.getBounds().pad(0.1));
        }
    }
}