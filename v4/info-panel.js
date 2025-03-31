// New file for enhanced information panel functionality
document.addEventListener('DOMContentLoaded', function() {
  initInfoPanel();
});

function initInfoPanel() {
  // Remove any existing info panels to avoid duplicates
  const existingPanels = document.querySelectorAll('.info-panel-clone');
  existingPanels.forEach(panel => panel.remove());
  
  const infoToggle = document.getElementById('info-toggle');
  const infoPanel = document.getElementById('info-panel');
  const closeInfo = document.getElementById('close-info');
  
  if (!infoPanel || !infoToggle || !closeInfo) {
    console.error("Required info panel elements not found");
    return;
  }
  
  infoToggle.addEventListener('click', function() {
    document.body.classList.add('info-panel-active');
    infoPanel.style.display = 'block';
    setTimeout(() => {
      infoPanel.classList.add('active');
    }, 10);
  });

  closeInfo.addEventListener('click', function() {
    closeInfoPanel();
  });

  // Close when clicking outside
  window.addEventListener('click', function(event) {
    if (infoPanel.classList.contains('active') && 
        !infoPanel.contains(event.target) && 
        event.target !== infoToggle) {
      closeInfoPanel();
    }
  });
  
  function closeInfoPanel() {
    infoPanel.classList.remove('active');
    setTimeout(() => {
      infoPanel.style.display = 'none';
      document.body.classList.remove('info-panel-active');
    }, 300);
  }

  // Initialize interactive buttons
  initInfoPanelButtons();
}

function initInfoPanelButtons() {
  const buttons = [
    {
      id: 'search-btn',
      icon: 'fas fa-search',
      label: 'Search',
      color: '#4a6fa5',
      action: function() {
        closeInfoPanel();
        setTimeout(() => showAdvancedSearchModal(), 300);
      }
    },
    {
      id: 'device-info-btn',
      icon: 'fas fa-laptop',
      label: 'Device Info',
      color: '#5b8c5a',
      action: null // Will be handled by info-panel-interaction.js
    },
    {
      id: 'ip-info-btn',
      icon: 'fas fa-globe',
      label: 'IP Info',
      color: '#a5694a',
      action: null // Will be handled by info-panel-interaction.js
    },
    {
      id: 'calculator-btn',
      icon: 'fas fa-calculator',
      label: 'Calculator',
      color: '#7a55c7',
      action: function() {
        window.open('https://alahimajnurosama.github.io/Projects/Calculator/', '_blank');
      }
    },
    {
      id: 'password-gen-btn',
      icon: 'fas fa-key',
      label: 'Password Generator',
      color: '#c7556d',
      action: function() {
        window.open('https://alahimajnurosama.github.io/Projects/passgen/', '_blank');
      }
    },
    {
      id: 'weather-btn',
      icon: 'fas fa-cloud-sun',
      label: 'Weather App',
      color: '#55a7c7',
      action: function() {
        window.open('https://alahimajnurosama.github.io/Projects/weather/', '_blank');
      }
    }
  ];
  
  const infoContent = document.getElementById('info-content');
  infoContent.innerHTML = '';
  
  buttons.forEach(btn => {
    const button = document.createElement('div');
    button.className = 'info-panel-button';
    button.id = btn.id;
    button.style.backgroundColor = btn.color;
    button.innerHTML = `
      <div class="info-button-icon">
        <i class="${btn.icon}"></i>
      </div>
      <span class="info-button-label">${btn.label}</span>
    `;
    
    button.addEventListener('click', btn.action);
    infoContent.appendChild(button);
  });
}

function showDeviceInfo() {
  closeInfoPanel();
  showDeviceInfoNative();
}

function closeInfoPanel() {
  const infoPanel = document.getElementById('info-panel');
  if (infoPanel) {
    infoPanel.classList.remove('active');
    setTimeout(() => {
      infoPanel.style.display = 'none';
    }, 300);
  }
}

function showIpInfo() {
  closeInfoPanel();
  showIpInfoNative();
}

function backToInfoButtons() {
  document.getElementById('info-content').style.display = 'grid';
  document.getElementById('info-display').style.display = 'none';
}

function showDeviceInfoNative() {
  const browserInfo = detectBrowser();
  const screenInfo = getScreenDetails();
  const systemInfo = getSystemInfo();
  const advancedInfo = getAdvancedSystemInfo();
  
  // Create native view for device info
  const contentView = document.getElementById('content-view');
  if (!contentView) return;
  
  // Store current state for back navigation
  contentView.dataset.previousView = 'info';
  
  // Hide main content
  document.getElementById('main-content').style.display = 'none';
  if (document.querySelector('.profile-section')) {
    document.querySelector('.profile-section').style.display = 'none';
  }
  
  // Hide info panel
  const infoPanel = document.getElementById('info-panel');
  if (infoPanel) {
    infoPanel.classList.remove('active');
    setTimeout(() => {
      infoPanel.style.display = 'none';
    }, 300);
  }
  
  // Create device info view
  contentView.innerHTML = `
    <div class="view-header enhanced">
      <button class="back-button enhanced" id="device-info-back">
        <i class="fas fa-arrow-left"></i> <span>Back</span>
      </button>
      <h3 class="view-title">Device Information</h3>
    </div>
    <div class="view-content">
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
              <div class="ios-value battery-info">${advancedInfo.memory}</div>
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
              <div class="ios-value battery-info">${advancedInfo.battery}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="floating-back-btn" onclick="navigateBack()">
      <i class="fas fa-arrow-left"></i>
    </div>
  `;
  
  // Add back button handler
  document.getElementById('device-info-back').addEventListener('click', function() {
    goBackFromNativeView();
  });
  
  // Show content view with animation
  contentView.style.display = 'block';
  contentView.classList.add('slide-in');
  setTimeout(() => contentView.classList.remove('slide-in'), 500);
}

function showIpInfoNative() {
  // Create native view for IP info
  const contentView = document.getElementById('content-view');
  if (!contentView) return;
  
  // Store current state for back navigation
  contentView.dataset.previousView = 'info';
  
  // Hide main content
  document.getElementById('main-content').style.display = 'none';
  if (document.querySelector('.profile-section')) {
    document.querySelector('.profile-section').style.display = 'none';
  }
  
  // Hide info panel
  const infoPanel = document.getElementById('info-panel');
  if (infoPanel) {
    infoPanel.classList.remove('active');
    setTimeout(() => {
      infoPanel.style.display = 'none';
    }, 300);
  }
  
  // First show loading state
  contentView.innerHTML = `
    <div class="view-header enhanced">
      <button class="back-button enhanced" id="ip-info-back">
        <i class="fas fa-arrow-left"></i> <span>Back</span>
      </button>
      <h3 class="view-title">IP Information</h3>
    </div>
    <div class="view-content">
      <div class="ios-section" style="animation-delay: 0.1s">
        <div class="ios-section-header">
          <i class="fas fa-spinner fa-spin"></i> Loading IP Information
        </div>
        <div class="ios-section-content" style="text-align: center; padding: 30px;">
          Fetching your IP information...
        </div>
      </div>
    </div>
    <div class="floating-back-btn" onclick="navigateBack()">
      <i class="fas fa-arrow-left"></i>
    </div>
  `;
  
  // Add back button handler
  document.getElementById('ip-info-back').addEventListener('click', function() {
    goBackFromNativeView();
  });
  
  // Show content view with animation
  contentView.style.display = 'block';
  contentView.classList.add('slide-in');
  setTimeout(() => contentView.classList.remove('slide-in'), 500);
  
  // Then fetch the actual data
  fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(data => {
      const ip = data.ip;
      return fetch(`https://ipapi.co/${ip}/json/`);
    })
    .then(response => response.json())
    .then(data => {
      const ipInfoContent = `
        <div class="view-header enhanced">
          <button class="back-button enhanced" id="ip-info-back">
            <i class="fas fa-arrow-left"></i> <span>Back</span>
          </button>
          <h3 class="view-title">IP Information</h3>
        </div>
        <div class="view-content">
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
                  <div class="ios-value">${data.country_name || 'Unknown'} (${data.country_code || 'Unknown'})</div>
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
        </div>
        <div class="floating-back-btn" onclick="navigateBack()">
          <i class="fas fa-arrow-left"></i>
        </div>
      `;
      
      // Update the view with the actual data
      contentView.innerHTML = ipInfoContent;
      
      // Add back button handler
      document.getElementById('ip-info-back').addEventListener('click', function() {
        goBackFromNativeView();
      });
      
      // Animate new sections
      const sections = contentView.querySelectorAll('.ios-section');
      sections.forEach((section, index) => {
        section.style.animationDelay = `${0.1 + (index * 0.1)}s`;
        section.style.animation = 'ios-section-appear 0.5s forwards';
      });
    })
    .catch(error => {
      contentView.innerHTML = `
        <div class="view-header enhanced">
          <button class="back-button enhanced" id="ip-info-back">
            <i class="fas fa-arrow-left"></i> <span>Back</span>
          </button>
          <h3 class="view-title">IP Information</h3>
        </div>
        <div class="view-content">
          <div class="ios-section" style="text-align: center; padding: 30px;">
            <i class="fas fa-exclamation-circle" style="font-size: 40px; color: #ff3b30; margin-bottom: 20px;"></i>
            <p>Failed to fetch IP information</p>
            <button class="ios-button" onclick="showIpInfoNative()">Try Again</button>
          </div>
        </div>
        <div class="floating-back-btn" onclick="navigateBack()">
          <i class="fas fa-arrow-left"></i>
        </div>
      `;
      
      // Add back button handler
      document.getElementById('ip-info-back').addEventListener('click', function() {
        goBackFromNativeView();
      });
    });
}

function goBackFromNativeView() {
  const contentView = document.getElementById('content-view');
  if (!contentView) return;
  
  // Add exit animation
  contentView.classList.add('slide-out');
  
  // After animation completes, hide content view and show main content
  setTimeout(() => {
    contentView.classList.remove('slide-out');
    contentView.style.display = 'none';
    
    // Restore main content
    document.getElementById('main-content').style.display = 'block';
    if (document.querySelector('.profile-section')) {
      document.querySelector('.profile-section').style.display = 'block';
    }
    
    // Show info panel again
    const infoPanel = document.getElementById('info-panel');
    if (infoPanel) {
      infoPanel.style.display = 'block';
      setTimeout(() => infoPanel.classList.add('active'), 10);
    }
  }, 300);
}

function detectBrowser() {
  const userAgent = navigator.userAgent;
  let browserName = "Unknown";
  let browserVersion = "";
  let browserEngine = "Unknown";
  
  // Detect browser name
  if (userAgent.indexOf("Firefox") > -1) {
    browserName = "Firefox";
    browserEngine = "Gecko";
  } else if (userAgent.indexOf("Opera") > -1 || userAgent.indexOf("OPR") > -1) {
    browserName = "Opera";
    browserEngine = "Blink";
  } else if (userAgent.indexOf("Trident") > -1) {
    browserName = "Internet Explorer";
    browserEngine = "Trident";
  } else if (userAgent.indexOf("Edge") > -1) {
    browserName = "Edge (Legacy)";
    browserEngine = "EdgeHTML";
  } else if (userAgent.indexOf("Edg") > -1) {
    browserName = "Edge (Chromium)";
    browserEngine = "Blink";
  } else if (userAgent.indexOf("Chrome") > -1) {
    browserName = "Chrome";
    browserEngine = "Blink";
  } else if (userAgent.indexOf("Safari") > -1) {
    browserName = "Safari";
    browserEngine = "WebKit";
  }
  
  // Get browser version
  let versionStart = userAgent.indexOf(browserName) + browserName.length + 1;
  let versionEnd = userAgent.indexOf(" ", versionStart);
  if (versionEnd === -1) versionEnd = userAgent.length;
  
  // Extract version number
  if (browserName === "Chrome") {
    const match = userAgent.match(/Chrome\/(\d+\.\d+)/);
    browserVersion = match ? match[1] : "";
  } else if (browserName === "Firefox") {
    const match = userAgent.match(/Firefox\/(\d+\.\d+)/);
    browserVersion = match ? match[1] : "";
  } else if (browserName === "Safari") {
    const match = userAgent.match(/Version\/(\d+\.\d+)/);
    browserVersion = match ? match[1] : "";
  } else {
    browserVersion = userAgent.substring(versionStart, versionEnd);
  }
  
  return { name: browserName, version: browserVersion, engine: browserEngine };
}

function getScreenDetails() {
  return {
    resolution: `${window.screen.width} × ${window.screen.height}`,
    viewport: `${window.innerWidth} × ${window.innerHeight}`,
    colorDepth: window.screen.colorDepth,
    pixelRatio: window.devicePixelRatio.toFixed(2)
  };
}

function getSystemInfo() {
  const userAgent = navigator.userAgent;
  let platform = navigator.platform;
  let deviceType = "Desktop";
  
  // Detect mobile devices
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
    deviceType = "Mobile";
    if (/iPad/i.test(userAgent)) {
      deviceType = "Tablet";
    }
  }
  
  // Detect connection type
  let connection = "Unknown";
  if (navigator.connection) {
    connection = navigator.connection.effectiveType || 
               (navigator.connection.type || "Unknown");
  }
  
  return { platform, deviceType, connection };
}

function getAdvancedSystemInfo() {
  // Memory info
  let memory = 'Not Available';
  if (navigator.deviceMemory) {
    memory = `${navigator.deviceMemory} GB`;
  }
  
  // CPU cores
  let cores = 'Not Available';
  if (navigator.hardwareConcurrency) {
    cores = navigator.hardwareConcurrency;
  }
  
  // Touch support
  let touch = 'Not Supported';
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
    touch = `Supported (${navigator.maxTouchPoints > 0 ? navigator.maxTouchPoints + ' points' : 'Yes'})`;
  }
  
  // Battery info
  let battery = 'Not Available';
  if (navigator.getBattery) {
    navigator.getBattery().then(function(batteryManager) {
      const batteryLevel = Math.floor(batteryManager.level * 100);
      const isCharging = batteryManager.charging;
      battery = `${batteryLevel}% ${isCharging ? '(Charging)' : ''}`;
      
      // Update the battery display if it's already showing
      const batteryDisplays = document.querySelectorAll('.info-item .info-value');
      batteryDisplays.forEach(el => {
        if (el.textContent === 'Not Available') {
          el.textContent = battery;
        }
      });
    });
  }
  
  return { memory, cores, touch, battery };
}

function showLocationMap(lat, lon) {
  if (!lat || !lon) return;
  window.open(`https://www.google.com/maps/search/?api=1&query=${lat},${lon}`, '_blank');
}

function navigateBack() {
  goBackFromNativeView();
}