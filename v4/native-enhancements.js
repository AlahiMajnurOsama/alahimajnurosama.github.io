/**
 * Native-like UI enhancements for portfolio and info sections
 * Responsible for handling back button logic and advanced UI transitions
 */

document.addEventListener('DOMContentLoaded', function() {
  initNativeEnhancements();
});

function initNativeEnhancements() {
  // Add global floating back button for portfolio sections
  addFloatingBackButton();
  
  // Enhance the portfolio card interfaces
  enhancePortfolioCards();
  
  // Set up observers for dynamic content
  observeDynamicContent();
}

function addFloatingBackButton() {
  // Only create if it doesn't exist yet
  if (document.querySelector('.floating-back-btn')) return;
  
  const backBtn = document.createElement('div');
  backBtn.className = 'floating-back-btn';
  backBtn.innerHTML = '<i class="fas fa-arrow-left"></i>';
  backBtn.style.display = 'none';
  
  backBtn.addEventListener('click', function() {
    navigateBack();
  });
  
  document.body.appendChild(backBtn);
  
  // Set up a MutationObserver to detect when we're in a portfolio view
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
        const contentView = document.getElementById('content-view');
        const mainContent = document.getElementById('main-content');
        
        if (contentView && mainContent) {
          // Only show floating back button for subviews, not the main portfolio view
          if (contentView.style.display === 'block' && mainContent.style.display === 'none') {
            // Don't show in main portfolio view, only in subcards
            if (contentView.querySelector('.view-header .view-title') && 
                contentView.querySelector('.view-header .view-title').textContent !== 'Portfolio') {
              backBtn.style.display = 'flex';
            } else {
              backBtn.style.display = 'none';
            }
          } else {
            backBtn.style.display = 'none';
          }
        }
      }
    });
  });
  
  // Observe content view
  const contentView = document.getElementById('content-view');
  const mainContent = document.getElementById('main-content');
  
  if (contentView) {
    observer.observe(contentView, { attributes: true });
  }
  
  if (mainContent) {
    observer.observe(mainContent, { attributes: true });
  }
}

function enhancePortfolioCards() {
  // Apply enhanced glass effect to portfolio cards
  const style = document.createElement('style');
  style.textContent = `
    .portfolio-card {
      background: rgba(255, 255, 255, 0.15) !important;
      backdrop-filter: blur(15px) !important;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15) !important;
      border: 1px solid rgba(255, 255, 255, 0.25) !important;
      transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
    }
    
    .portfolio-card:hover {
      transform: translateY(-8px) scale(1.03) !important;
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2) !important;
      border-color: rgba(255, 255, 255, 0.35) !important;
    }
    
    .education-card, .category-skill-item, .soft-skill-card {
      background: rgba(255, 255, 255, 0.15) !important;
      backdrop-filter: blur(15px) !important;
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12) !important;
      border: 1px solid rgba(255, 255, 255, 0.25) !important;
    }
    
    .education-grid, .soft-skills-grid, .category-skills-grid {
      max-height: 60vh !important;
      padding-right: 10px !important;
      overflow-y: auto !important;
      scrollbar-width: thin !important;
    }
    
    body.night-mode .portfolio-card,
    body.night-mode .education-card,
    body.night-mode .category-skill-item,
    body.night-mode .soft-skill-card {
      background: rgba(60, 70, 90, 0.3) !important;
      border-color: rgba(255, 255, 255, 0.1) !important;
    }
    
    body.night-mode .portfolio-card:hover {
      border-color: rgba(255, 255, 255, 0.2) !important;
    }
    
    .view-header {
      position: sticky !important;
      top: 0 !important;
      z-index: 100 !important;
      backdrop-filter: blur(15px) !important;
    }
    
    .view-title {
      white-space: nowrap !important;
      overflow: hidden !important;
      text-overflow: ellipsis !important;
      max-width: 70% !important;
    }
  `;
  
  document.head.appendChild(style);
}

function observeDynamicContent() {
  // Observer for portfolio view changes
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.type === 'childList') {
        // If portfolio view opened
        const portfolioContainer = document.querySelector('.portfolio-grid');
        if (portfolioContainer) {
          enhanceScrollContainers();
        }
        
        // Check for any scrollable containers
        const scrollContainers = document.querySelectorAll('.education-grid, .soft-skills-grid, .category-skills-grid');
        scrollContainers.forEach(container => {
          if (container && !container.getAttribute('data-enhanced')) {
            container.setAttribute('data-enhanced', 'true');
            enhanceScrollContainer(container);
          }
        });
      }
    });
  });
  
  // Observe entire document for changes
  observer.observe(document.body, { childList: true, subtree: true });
}

function enhanceScrollContainers() {
  const scrollContainers = document.querySelectorAll('.education-grid, .soft-skills-grid, .category-skills-grid');
  scrollContainers.forEach(container => {
    if (container && !container.getAttribute('data-enhanced')) {
      container.setAttribute('data-enhanced', 'true');
      enhanceScrollContainer(container);
    }
  });
}

function enhanceScrollContainer(container) {
  // Add iOS-like scroll shadows
  const topShadow = document.createElement('div');
  topShadow.className = 'scroll-shadow-top';
  topShadow.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 20px;
    background: linear-gradient(to bottom, rgba(0,0,0,0.1), transparent);
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 10;
  `;
  
  const bottomShadow = document.createElement('div');
  bottomShadow.className = 'scroll-shadow-bottom';
  bottomShadow.style.cssText = `
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 20px;
    background: linear-gradient(to top, rgba(0,0,0,0.1), transparent);
    pointer-events: none;
    opacity: 1;
    transition: opacity 0.3s ease;
    z-index: 10;
  `;
  
  // Make container position relative if static
  if (getComputedStyle(container).position === 'static') {
    container.style.position = 'relative';
  }
  
  container.appendChild(topShadow);
  container.appendChild(bottomShadow);
  
  // Scroll event listener
  container.addEventListener('scroll', function() {
    const scrollTop = container.scrollTop;
    const scrollHeight = container.scrollHeight;
    const clientHeight = container.clientHeight;
    
    // Show top shadow when scrolled down
    if (scrollTop > 10) {
      topShadow.style.opacity = '1';
    } else {
      topShadow.style.opacity = '0';
    }
    
    // Show bottom shadow when not at the bottom
    if (scrollTop + clientHeight < scrollHeight - 10) {
      bottomShadow.style.opacity = '1';
    } else {
      bottomShadow.style.opacity = '0';
    }
  });
}

function navigateBack() {
  const contentView = document.getElementById('content-view');
  if (!contentView) return;
  
  // Get previous view from dataset attribute
  const previousView = contentView.dataset.previousView || '';
  
  // Add exit animation
  contentView.classList.add('slide-out');
  
  setTimeout(() => {
    contentView.classList.remove('slide-out');
    
    // Clear any class names to prevent issues on next view
    contentView.className = 'view-container';
    
    // Navigate based on previous view
    if (previousView === 'education') {
      showEducationNative();
    } else if (previousView === 'skills') {
      showSkillsNative();
    } else if (previousView === 'info') {
      goBackFromNativeView();
    } else {
      // If no specific previous view, go back to portfolio main
      showPortfolioNative();
    }
  }, 300);
}
