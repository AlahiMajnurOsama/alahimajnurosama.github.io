// New file for enhanced UI features and animations
document.addEventListener('DOMContentLoaded', function() {
  // Add iOS stylesheet
  addStylesheet('/ios-style.css');
  
  // Apply iOS-style animations to all popups
  enhancePopupAnimations();
});

function addStylesheet(path) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = path;
  document.head.appendChild(link);
}

function enhancePopupAnimations() {
  // Add observer for popup animations
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.addedNodes.length) {
        mutation.addedNodes.forEach(node => {
          // Check if added node is popup overlay
          if (node.classList && 
             (node.classList.contains('info-popup-overlay') || 
              node.classList.contains('search-modal-overlay'))) {
            enhancePopupNode(node);
          }
        });
      }
    });
  });
  
  observer.observe(document.body, { childList: true });
}

function enhancePopupNode(popupNode) {
  // Add spring animation to popup appearance
  setTimeout(() => {
    const popup = popupNode.querySelector('.info-popup, .search-modal-container');
    if (popup) {
      popup.style.transition = 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    }
    
    // Add staggered animation to sections
    const sections = popupNode.querySelectorAll('.info-section');
    sections.forEach((section, index) => {
      section.style.animationDelay = `${0.1 + (index * 0.05)}s`;
    });
  }, 10);
  
  // Add iOS-style close button effect
  const closeButton = popupNode.querySelector('.info-popup-close, .search-close-btn');
  if (closeButton) {
    closeButton.addEventListener('mousedown', function() {
      this.style.transform = 'scale(0.95)';
    });
    
    closeButton.addEventListener('mouseup', function() {
      this.style.transform = 'rotate(90deg)';
    });
  }
}

// Device info with iOS style
function showDeviceInfoIOS() {
  const browserInfo = detectBrowser();
  const screenInfo = getScreenDetails();
  const systemInfo = getSystemInfo();
  const advancedInfo = getAdvancedSystemInfo();
  
  createIOSPopup('Device Information', `
    <div class="ios-section" style="animation-delay: 0.1s">
      <div class="ios-section-header">
        <i class="fas fa-laptop"></i> Browser Details
      </div>
      <div class="ios-section-content">
        <div class="ios-grid">
          <div class="ios-item">
            <div class="ios-label">Browser</div>
            <div class="ios-value">${browserInfo.name} ${browserInfo.version}</div>
          </div>
          <div class="ios-item">
            <div class="ios-label">Engine</div>
            <div class="ios-value">${browserInfo.engine}</div>
          </div>
          <div class="ios-item">
            <div class="ios-label">Language</div>
            <div class="ios-value">${navigator.language}</div>
          </div>
          <div class="ios-item">
            <div class="ios-label">Cookies</div>
            <div class="ios-value">${navigator.cookieEnabled ? 'Enabled' : 'Disabled'}</div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="ios-section" style="animation-delay: 0.2s">
      <div class="ios-section-header">
        <i class="fas fa-desktop"></i> Display Details
      </div>
      <div class="ios-section-content">
        <div class="ios-grid">
          <div class="ios-item">
            <div class="ios-label">Resolution</div>
            <div class="ios-value">${screenInfo.resolution}</div>
          </div>
          <div class="ios-item">
            <div class="ios-label">Viewport</div>
            <div class="ios-value">${screenInfo.viewport}</div>
          </div>
          <div class="ios-item">
            <div class="ios-label">Color Depth</div>
            <div class="ios-value">${screenInfo.colorDepth}-bit</div>
          </div>
          <div class="ios-item">
            <div class="ios-label">Pixel Ratio</div>
            <div class="ios-value">${screenInfo.pixelRatio}x</div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="ios-section" style="animation-delay: 0.3s">
      <div class="ios-section-header">
        <i class="fas fa-microchip"></i> System Details
      </div>
      <div class="ios-section-content">
        <div class="ios-grid">
          <div class="ios-item">
            <div class="ios-label">Platform</div>
            <div class="ios-value">${systemInfo.platform}</div>
          </div>
          <div class="ios-item">
            <div class="ios-label">Device Type</div>
            <div class="ios-value">${systemInfo.deviceType}</div>
          </div>
          <div class="ios-item">
            <div class="ios-label">Connection</div>
            <div class="ios-value">${systemInfo.connection}</div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="ios-section" style="animation-delay: 0.4s">
      <div class="ios-section-header">
        <i class="fas fa-cogs"></i> Advanced Details
      </div>
      <div class="ios-section-content">
        <div class="ios-grid">
          <div class="ios-item">
            <div class="ios-label">Memory</div>
            <div class="ios-value">${advancedInfo.memory}</div>
          </div>
          <div class="ios-item">
            <div class="ios-label">Cores</div>
            <div class="ios-value">${advancedInfo.cores}</div>
          </div>
          <div class="ios-item">
            <div class="ios-label">Touch</div>
            <div class="ios-value">${advancedInfo.touch}</div>
          </div>
          <div class="ios-item">
            <div class="ios-label">Battery</div>
            <div class="ios-value">${advancedInfo.battery}</div>
          </div>
        </div>
      </div>
    </div>
  `);
}

// IP info with iOS style
function showIpInfoIOS() {
  const infoPopup = createIOSPopup('IP Information', `
    <div class="ios-section" style="animation-delay: 0.1s">
      <div class="ios-section-header">
        <i class="fas fa-spinner fa-spin"></i> Loading IP Information
      </div>
      <div class="ios-section-content" style="text-align: center; padding: 30px;">
        Fetching your IP information...
      </div>
    </div>
  `);
  
  fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(data => {
      const ip = data.ip;
      return fetch(`https://ipapi.co/${ip}/json/`);
    })
    .then(response => response.json())
    .then(data => {
      const contentDiv = infoPopup.querySelector('.ios-content');
      contentDiv.innerHTML = `
        <div class="ios-section" style="animation-delay: 0.1s">
          <div class="ios-section-header">
            <i class="fas fa-network-wired"></i> IP Information
          </div>
          <div class="ios-section-content">
            <div class="ios-grid">
              <div class="ios-item highlight">
                <div class="ios-label">IP Address</div>
                <div class="ios-value">${data.ip}</div>
              </div>
              <div class="ios-item">
                <div class="ios-label">Type</div>
                <div class="ios-value">${data.version === 'IPv4' ? 'IPv4' : 'IPv6'}</div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="ios-section" style="animation-delay: 0.2s">
          <div class="ios-section-header">
            <i class="fas fa-map-marker-alt"></i> Location Details
          </div>
          <div class="ios-section-content">
            <div class="ios-grid">
              <div class="ios-item">
                <div class="ios-label">Country</div>
                <div class="ios-value">${data.country_name} (${data.country_code})</div>
              </div>
              <div class="ios-item">
                <div class="ios-label">Region</div>
                <div class="ios-value">${data.region || 'Unknown'}</div>
              </div>
              <div class="ios-item">
                <div class="ios-label">City</div>
                <div class="ios-value">${data.city || 'Unknown'}</div>
              </div>
              <div class="ios-item">
                <div class="ios-label">Postal</div>
                <div class="ios-value">${data.postal || 'Unknown'}</div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="ios-section" style="animation-delay: 0.3s">
          <div class="ios-section-header">
            <i class="fas fa-building"></i> Network Details
          </div>
          <div class="ios-section-content">
            <div class="ios-grid">
              <div class="ios-item">
                <div class="ios-label">ISP</div>
                <div class="ios-value">${data.org || 'Unknown'}</div>
              </div>
              <div class="ios-item">
                <div class="ios-label">ASN</div>
                <div class="ios-value">${data.asn || 'Unknown'}</div>
              </div>
              <div class="ios-item">
                <div class="ios-label">ASN Name</div>
                <div class="ios-value">${data.asn_org || 'Unknown'}</div>
              </div>
            </div>
          </div>
        </div>
        
        <button class="ios-button" onclick="showLocationMap(${data.latitude}, ${data.longitude})">
          <i class="fas fa-map"></i> View on Map
        </button>
      `;
      
      // Animate new sections
      const sections = contentDiv.querySelectorAll('.ios-section');
      sections.forEach((section, index) => {
        section.style.animationDelay = `${0.1 + (index * 0.1)}s`;
        section.style.animation = 'ios-section-appear 0.5s forwards';
      });
    })
    .catch(error => {
      const contentDiv = infoPopup.querySelector('.ios-content');
      contentDiv.innerHTML = `
        <div class="ios-section" style="text-align: center; padding: 30px;">
          <i class="fas fa-exclamation-circle" style="font-size: 40px; color: #ff3b30; margin-bottom: 20px;"></i>
          <p>Failed to fetch IP information</p>
          <button class="ios-button" onclick="showIpInfoIOS()">Try Again</button>
        </div>
      `;
    });
  
  return infoPopup;
}

function createIOSPopup(title, content) {
  // Close any existing popup
  const existingPopup = document.querySelector('.info-popup-overlay');
  if (existingPopup) existingPopup.remove();
  
  const popupOverlay = document.createElement('div');
  popupOverlay.className = 'info-popup-overlay';
  
  popupOverlay.innerHTML = `
    <div class="ios-container info-popup" style="max-width: 700px; width: 90%; max-height: 85vh;">
      <div class="ios-header info-popup-header">
        <h3 class="info-popup-title">${title}</h3>
        <button class="info-popup-close"><i class="fas fa-times"></i></button>
      </div>
      <div class="ios-content">
        ${content}
      </div>
    </div>
  `;
  
  document.body.appendChild(popupOverlay);
  
  // Animation timing
  setTimeout(() => {
    popupOverlay.classList.add('active');
  }, 10);
  
  // Setup close button
  const closeBtn = popupOverlay.querySelector('.info-popup-close');
  closeBtn.addEventListener('click', () => {
    popupOverlay.classList.remove('active');
    setTimeout(() => {
      popupOverlay.remove();
    }, 300);
  });
  
  // Close on outside click
  popupOverlay.addEventListener('click', (e) => {
    if (e.target === popupOverlay) {
      popupOverlay.classList.remove('active');
      setTimeout(() => {
        popupOverlay.remove();
      }, 300);
    }
  });
  
  return popupOverlay;
}