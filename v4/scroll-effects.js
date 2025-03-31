// New file for scroll-related effects to avoid adding to script.js and ui-enhancements.js
document.addEventListener('DOMContentLoaded', function() {
  initScrollEffects();
});

function initScrollEffects() {
  // Add global scroll behaviors
  document.documentElement.style.scrollBehavior = 'smooth';
  
  // Apply scroll effects to initial elements
  enhanceGlobalScrollContainers();
  
  // Observe DOM changes to apply effects to new elements
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.type === 'childList') {
        enhanceGlobalScrollContainers();
      }
    });
  });
  
  observer.observe(document.body, { 
    childList: true,
    subtree: true
  });
}

function enhanceGlobalScrollContainers() {
  // Find all scrollable containers with specific classes
  const scrollContainers = document.querySelectorAll(
    '.education-grid, .experience-container, .soft-skills-grid, .category-skills-grid, .native-scroll, .view-content'
  );
  
  scrollContainers.forEach(container => {
    // Skip already enhanced containers
    if (container.dataset.scrollEnhanced === 'true') return;
    container.dataset.scrollEnhanced = 'true';
    
    // Add iOS-style physics-based scrolling
    enableSmoothScrolling(container);
    
    // Add scroll indicator shadows
    addScrollIndicators(container);
    
    // Mark as scrollable if needed
    checkScrollability(container);
  });
}

function enableSmoothScrolling(element) {
  // Add smooth scrolling behavior
  element.style.scrollBehavior = 'smooth';
  element.classList.add('native-scroll');
  
  // Add passive scroll listeners for better performance
  element.addEventListener('scroll', handleScroll, { passive: true });
  
  // Touch event listeners for momentum scrolling feel
  element.addEventListener('touchstart', function() {
    element.style.scrollSnapType = 'none';
  }, { passive: true });
  
  element.addEventListener('touchend', function() {
    // Re-enable smooth behavior after touch
    setTimeout(() => {
      element.style.scrollBehavior = 'smooth';
    }, 50);
  }, { passive: true });
}

function handleScroll(event) {
  const container = event.currentTarget;
  
  // Calculate scroll position
  const scrollPercentage = container.scrollTop / (container.scrollHeight - container.clientHeight) * 100;
  
  // Update scroll indicators
  updateScrollIndicators(container, scrollPercentage);
  
  // Check if reached bottom to hide bottom indicator
  if (scrollPercentage > 95) {
    container.classList.add('at-bottom');
  } else {
    container.classList.remove('at-bottom');
  }
  
  // Check if at top to hide top indicator
  if (scrollPercentage < 5) {
    container.classList.add('at-top');
  } else {
    container.classList.remove('at-top');
  }
}

function addScrollIndicators(container) {
  // Only add indicators if they don't exist
  if (container.querySelector('.scroll-indicator-top') || 
      container.querySelector('.scroll-indicator-bottom')) {
    return;
  }
  
  // Position container if not already positioned
  if (getComputedStyle(container).position === 'static') {
    container.style.position = 'relative';
  }
  
  // Check if container is actually scrollable
  if (container.scrollHeight <= container.clientHeight) {
    return;
  }
  
  // Create top indicator
  const topIndicator = document.createElement('div');
  topIndicator.className = 'scroll-indicator-top';
  topIndicator.style.cssText = `
    position: absolute; 
    top: 0; 
    left: 0; 
    right: 0; 
    height: 15px; 
    background: linear-gradient(to bottom, rgba(0,0,0,0.1), transparent);
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 1;
  `;
  
  // Create bottom indicator
  const bottomIndicator = document.createElement('div');
  bottomIndicator.className = 'scroll-indicator-bottom';
  bottomIndicator.style.cssText = `
    position: absolute; 
    bottom: 0; 
    left: 0; 
    right: 0; 
    height: 15px; 
    background: linear-gradient(to top, rgba(0,0,0,0.1), transparent);
    pointer-events: none;
    opacity: 1;
    transition: opacity 0.3s ease;
    z-index: 1;
  `;
  
  // Adjust for dark mode
  if (document.body.classList.contains('night-mode')) {
    topIndicator.style.background = 'linear-gradient(to bottom, rgba(255,255,255,0.1), transparent)';
    bottomIndicator.style.background = 'linear-gradient(to top, rgba(255,255,255,0.1), transparent)';
  }
  
  // Add indicators to container
  container.appendChild(topIndicator);
  container.appendChild(bottomIndicator);
  
  // Initial state
  updateScrollIndicators(container, 0);
}

function updateScrollIndicators(container, scrollPercentage) {
  const topIndicator = container.querySelector('.scroll-indicator-top');
  const bottomIndicator = container.querySelector('.scroll-indicator-bottom');
  
  if (!topIndicator || !bottomIndicator) return;
  
  if (scrollPercentage > 5) {
    topIndicator.style.opacity = '1';
  } else {
    topIndicator.style.opacity = '0';
  }
  
  if (scrollPercentage < 95) {
    bottomIndicator.style.opacity = '1';
  } else {
    bottomIndicator.style.opacity = '0';
  }
}

function checkScrollability(container) {
  // Check if container is scrollable
  if (container.scrollHeight > container.clientHeight) {
    container.classList.add('scrollable');
    
    // Show bottom indicator initially
    const bottomIndicator = container.querySelector('.scroll-indicator-bottom');
    if (bottomIndicator) {
      bottomIndicator.style.opacity = '1';
    }
  }
}

// Used by other components to check/update scroll indicators
window.updateScrollEffects = function(container) {
  if (!container) return;
  
  checkScrollability(container);
  
  // Update indicators based on current scroll position
  const scrollPercentage = container.scrollTop / (container.scrollHeight - container.clientHeight) * 100;
  updateScrollIndicators(container, scrollPercentage);
};

// Add global function to be called from other files
window.initializeScrollableContainer = function(container) {
  if (!container) return;
  
  enhanceGlobalScrollContainers();
  
  // Focus specific container
  enableSmoothScrolling(container);
  addScrollIndicators(container);
  checkScrollability(container);
};