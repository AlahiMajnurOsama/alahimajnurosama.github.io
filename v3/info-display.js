// Advanced information display functionality
function enhanceInfoDisplay() {
  console.log("Info display functionality moved to info-panel.js");
}

// Functionality moved to info-panel.js
function showLocationMap(lat, lon) {
  if (!lat || !lon) return;
  window.open(`https://www.google.com/maps/search/?api=1&query=${lat},${lon}`, '_blank');
}

// Initialize when document is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialization moved to info-panel.js
});