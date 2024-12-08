// Initialize the map
const map = L.map('map').setView([0, 0], 13);

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

// Add a marker for user interaction
let marker;

// Handle geolocation success
function onLocationFound(e) {
  const { latitude, longitude } = e;

  // Center map and update marker
  map.setView([latitude, longitude], 13);
  if (marker) {
    marker.setLatLng([latitude, longitude]);
  } else {
    marker = L.marker([latitude, longitude]).addTo(map).bindPopup('You are here!').openPopup();
  }

  // Update location details
  document.getElementById('location-name').textContent = `Latitude: ${latitude.toFixed(4)}, Longitude: ${longitude.toFixed(4)}`;
}

// Handle geolocation error
function onLocationError(error) {
  console.error('Geolocation error:', error.message);
  alert('Unable to retrieve your location. Please enable location services.');
}

// Attempt to locate the user
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    (position) => onLocationFound(position.coords),
    onLocationError
  );
} else {
  alert('Geolocation is not supported by your browser.');
}

// Zoom controls
document.getElementById('zoom-in').addEventListener('click', () => map.zoomIn());
document.getElementById('zoom-out').addEventListener('click', () => map.zoomOut());

// Sidebar actions
document.querySelectorAll('.list-group-item').forEach(item => {
  item.addEventListener('click', () => {
    const action = item.getAttribute('data-action');

    switch (action) {
      case 'saved-places':
        alert('Navigating to Saved Places...');
        const savedCoordinates = [37.7749, -122.4194];
        map.setView(savedCoordinates, 14);
        marker.setLatLng(savedCoordinates).bindPopup('Saved Place: San Francisco').openPopup();
        break;

      case 'timeline':
        alert('Opening Your Timeline...');
        break;

      case 'directions':
        alert('Getting Directions...');
        break;

      default:
        console.log('No action defined for this item.');
    }
  });
});

// Add event listener for directions
document.querySelector('[data-action="directions"]').addEventListener('click', () => {
  const directionsModal = new bootstrap.Modal(document.getElementById('directionsModal'));
  directionsModal.show();
});

// Handle directions form submission
document.getElementById('getDirections').addEventListener('click', () => {
  const startLocation = document.getElementById('startLocation').value;
  const endLocation = document.getElementById('endLocation').value;

  if (startLocation && endLocation) {
    alert(`Fetching directions from ${startLocation} to ${endLocation}...`);
    // Placeholder for directions logic
    console.log(`Start: ${startLocation}, End: ${endLocation}`);
  } else {
    alert('Please enter both start and end locations.');
  }
});
