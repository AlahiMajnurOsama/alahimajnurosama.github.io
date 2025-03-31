/**
 * Native Panel Enhancement
 * Makes info panels more compact and fixes back button issues
 */

document.addEventListener('DOMContentLoaded', function() {
  enhanceInfoPanels();
});

function enhanceInfoPanels() {
  // Add compact styles
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'info-panel-compact.css';
  document.head.appendChild(link);
  
  // Observer for when device/IP info views are added
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.type === 'childList') {
        // Find and fix back buttons in info views
        const deviceInfoBack = document.getElementById('device-info-back');
        const ipInfoBack = document.getElementById('ip-info-back');
        
        if (deviceInfoBack) {
          deviceInfoBack.style.display = 'none';
        }
        
        if (ipInfoBack) {
          ipInfoBack.style.display = 'none';
        }
        
        // Ensure floating back buttons are visible and working
        const floatingBackBtns = document.querySelectorAll('.floating-back-btn');
        floatingBackBtns.forEach(btn => {
          if (document.getElementById('device-info-back') || 
              document.getElementById('ip-info-back')) {
            btn.style.display = 'flex';
          }
        });
      }
    });
  });
  
  observer.observe(document.body, { childList: true, subtree: true });
}

// Helper function to handle back navigation from info panels
function handleInfoPanelBack() {
  const contentView = document.getElementById('content-view');
  if (!contentView) return;
  
  // If this is a device or IP info view, go back to info panel
  if (contentView.dataset.previousView === 'info') {
    goBackFromNativeView();
  } else {
    // Otherwise use regular navigation
    navigateBack();
  }
}