// New file for enhanced information panel functionality
document.addEventListener('DOMContentLoaded', function() {
  initInfoPanel();
});

function initInfoPanel() {
  const infoToggle = document.getElementById('info-toggle');
  const infoPanel = document.getElementById('info-panel');
  const closeInfo = document.getElementById('close-info');
  
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
        showAdvancedSearchModal();
      }
    },
    {
      id: 'device-info-btn',
      icon: 'fas fa-laptop',
      label: 'Device Info',
      color: '#5b8c5a',
      action: function() {
        showDeviceInfo();
      }
    },
    {
      id: 'ip-info-btn',
      icon: 'fas fa-globe',
      label: 'IP Info',
      color: '#a5694a',
      action: function() {
        showIpInfo();
      }
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
  showDeviceInfoIOS();
}

function showIpInfo() {
  showIpInfoIOS();
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