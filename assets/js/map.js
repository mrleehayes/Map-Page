// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize the map and set the default view
    const map = L.map('map').setView([37.7749, -122.4194], 13); // Coordinates for San Francisco
  
    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
  
    // Add a marker to the center of the map
    const marker = L.marker([37.7749, -122.4194]).addTo(map)
      .bindPopup('This is San Francisco!')
      .openPopup();
  
    // Function to update location details
    const updateLocationDetails = (lat, lng) => {
      const locationDetails = document.getElementById('location-name');
      locationDetails.textContent = `Lat: ${lat}, Lng: ${lng}`;
    };
  
    // Add a click event to update marker and location details
    map.on('click', (e) => {
      const lat = e.latlng.lat.toFixed(4);
      const lng = e.latlng.lng.toFixed(4);
  
      // Move the marker to the clicked location
      marker.setLatLng([lat, lng]);
  
      // Update the location details
      updateLocationDetails(lat, lng);
    });
  
    // Zoom control buttons
    const zoomInButton = document.getElementById('zoom-in');
    const zoomOutButton = document.getElementById('zoom-out');
  
    // Zoom in functionality
    zoomInButton.addEventListener('click', () => {
      map.zoomIn();
    });
  
    // Zoom out functionality
    zoomOutButton.addEventListener('click', () => {
      map.zoomOut();
    });
  });
  