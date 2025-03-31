/**
 * Enhanced Info Panel Interaction
 * Handles proper hiding/showing of info panel when navigating to subviews
 */

document.addEventListener('DOMContentLoaded', function() {
  enhanceInfoPanelInteractions();
});

function enhanceInfoPanelInteractions() {
  // Patch device info and IP info buttons to properly close info panel
  const deviceInfoBtn = document.getElementById('device-info-btn');
  const ipInfoBtn = document.getElementById('ip-info-btn');
  
  if (deviceInfoBtn) {
    deviceInfoBtn.addEventListener('click', function() {
      closeInfoPanel();
      setTimeout(() => showDeviceInfoNative(), 300);
    });
  }
  
  if (ipInfoBtn) {
    ipInfoBtn.addEventListener('click', function() {
      closeInfoPanel();
      setTimeout(() => showIpInfoNative(), 300);
    });
  }
  
  // Fix back button issues in device and IP info views
  document.addEventListener('click', function(e) {
    if (e.target.closest('#device-info-back') || e.target.closest('#ip-info-back')) {
      e.preventDefault();
      goBackFromNativeView();
    }
  });
  
  // Add the specific CSS file for back button fixes
  const linkEl = document.createElement('link');
  linkEl.rel = 'stylesheet';
  linkEl.href = 'device-info-back-fix.css';
  document.head.appendChild(linkEl);
}

function closeInfoPanel() {
  const infoPanel = document.getElementById('info-panel');
  if (!infoPanel) return;
  
  infoPanel.classList.remove('active');
  setTimeout(() => {
    infoPanel.style.display = 'none';
    document.body.classList.remove('info-panel-active');
  }, 300);
}

// Add function to get back to info panel from device/IP info
function backToInfoPanel() {
  const contentView = document.getElementById('content-view');
  if (!contentView) return;
  
  // Add exit animation
  contentView.classList.add('slide-out');
  
  setTimeout(() => {
    contentView.classList.remove('slide-out');
    contentView.style.display = 'none';
    
    // Show main content
    document.getElementById('main-content').style.display = 'block';
    if (document.querySelector('.profile-section')) {
      document.querySelector('.profile-section').style.display = 'block';
    }
    
    // Show info panel
    const infoPanel = document.getElementById('info-panel');
    if (infoPanel) {
      infoPanel.style.display = 'block';
      setTimeout(() => infoPanel.classList.add('active'), 10);
    }
  }, 300);
}

function goBackFromNativeView() {
  backToInfoPanel();
}