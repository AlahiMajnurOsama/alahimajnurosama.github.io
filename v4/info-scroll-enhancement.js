/**
 * Enhanced scrolling for info panel content
 * This handles device info and IP info scrolling
 */

document.addEventListener('DOMContentLoaded', function() {
  initInfoScrollEnhancements();
});

function initInfoScrollEnhancements() {
  // Apply scrolling enhancements to all info panels
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.type === 'childList') {
        enhanceInfoContentScrolling();
      }
    });
  });
  
  observer.observe(document.body, { 
    childList: true,
    subtree: true
  });
}

function enhanceInfoContentScrolling() {
  // Apply scrolling to device info and IP info views
  const contentViews = document.querySelectorAll('.view-content');
  contentViews.forEach(view => {
    // Skip already enhanced views
    if (view.dataset.scrollEnhanced === 'true') return;
    
    // Find iOS sections within views
    const sections = view.querySelectorAll('.ios-section');
    if (sections.length > 0) {
      view.dataset.scrollEnhanced = 'true';
      
      // Make the view scrollable
      view.style.overflow = 'auto';
      view.style.maxHeight = '70vh';
      view.classList.add('info-scrollable');
      
      // Add floating back button instead of header button
      const header = view.parentNode.querySelector('.view-header');
      if (header && header.querySelector('.back-button')) {
        addFloatingBackForInfo(view.parentNode);
      }
    }
  });
}

function addFloatingBackForInfo(container) {
  // Check if floating button already exists
  if (container.querySelector('.floating-back-btn')) return;
  
  // Create floating back button
  const floatingBack = document.createElement('div');
  floatingBack.className = 'floating-back-btn';
  floatingBack.innerHTML = '<i class="fas fa-arrow-left"></i>';
  
  floatingBack.addEventListener('click', function() {
    // Handle specific info panel cases
    closeCurrentInfoView();
  });
  
  container.appendChild(floatingBack);
}

function closeCurrentInfoView() {
  const contentView = document.getElementById('content-view');
  if (!contentView) return;
  
  // Add exit animation
  contentView.classList.add('slide-out');
  
  setTimeout(() => {
    contentView.classList.remove('slide-out');
    contentView.style.display = 'none';
    
    // Restore main content
    document.getElementById('main-content').style.display = 'block';
    if (document.querySelector('.profile-section')) {
      document.querySelector('.profile-section').style.display = 'block';
    }
    
    // Check if we need to show the info panel
    const infoPanel = document.getElementById('info-panel');
    if (infoPanel && contentView.dataset.previousView === 'info') {
      infoPanel.style.display = 'block';
      setTimeout(() => infoPanel.classList.add('active'), 10);
    }
  }, 300);
}