// New file for enhanced portfolio components
document.addEventListener('DOMContentLoaded', function() {
  applyPortfolioEnhancements();
});

function applyPortfolioEnhancements() {
  // Apply enhanced styles to all sub-views
  const contentView = document.getElementById('content-view');
  if (!contentView) return;
  
  // Observe contentView for changes
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.type === 'childList') {
        // Check if any nodes were added
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === 1) { // Element node
            enhanceViewHeaders(node);
            enhanceBackButtons(node);
            enhancePortfolioGrids(node);
            enhanceScrollContainers(node);
          }
        });
      }
    });
  });
  
  observer.observe(contentView, { childList: true, subtree: true });
}

function enhanceViewHeaders(element) {
  const headers = element.querySelectorAll('.view-header:not(.enhanced)');
  headers.forEach(header => {
    header.classList.add('enhanced');
  });
}

function enhanceBackButtons(element) {
  const buttons = element.querySelectorAll('.back-button:not(.enhanced)');
  buttons.forEach(button => {
    button.classList.add('enhanced');
    
    // Skip buttons in skills section headers
    if (button.closest('.view-header.skills-view') || 
        button.closest('.skill-category-view') ||
        button.id === 'device-info-back' ||
        button.id === 'ip-info-back') {
      button.style.display = 'none';
      return;
    }
    
    // Make sure the text is wrapped in a span for animations
    const text = button.textContent.trim();
    if (!button.querySelector('span')) {
      button.innerHTML = `<i class="fas fa-arrow-left"></i> <span>${text}</span>`;
    }
    
    // Replace default click handler with enhanced one
    const originalHandler = button.getAttribute('onclick');
    if (originalHandler) {
      button.removeAttribute('onclick');
      button.addEventListener('click', function() {
        // Add click animation
        button.classList.add('clicked');
        setTimeout(() => {
          button.classList.remove('clicked');
          // Execute original handler
          eval(originalHandler);
        }, 200);
      });
    }
  });
}

function enhancePortfolioGrids(element) {
  const grids = element.querySelectorAll('.portfolio-grid:not(.compact)');
  grids.forEach(grid => {
    grid.classList.add('compact');
    
    // Add staggered animation to cards
    const cards = grid.querySelectorAll('.portfolio-card');
    cards.forEach((card, index) => {
      card.style.animationDelay = `${0.05 * index}s`;
      card.style.animation = 'fadeInUp 0.5s ease forwards';
    });
  });
}

function enhanceScrollContainers(element) {
  const scrollContainers = element.querySelectorAll('.native-scroll');
  scrollContainers.forEach(container => {
    // Check if already enhanced
    if (container.dataset.enhanced) return;
    
    container.dataset.enhanced = 'true';
    
    // Check if scrollable
    if (container.scrollHeight > container.clientHeight) {
      container.classList.add('scrollable');
    }
    
    // Add scroll event listener
    container.addEventListener('scroll', function() {
      // Add subtle inertia effect
      container.style.scrollBehavior = 'smooth';
      
      // Show/hide scroll indicator based on position
      const isAtBottom = container.scrollHeight - container.scrollTop <= container.clientHeight + 5;
      
      if (isAtBottom) {
        container.classList.remove('scrollable');
      } else {
        container.classList.add('scrollable');
      }
    });
    
    // Add iOS-like overscroll effect
    container.addEventListener('touchstart', function() {
      container.style.transition = 'transform 0.1s ease';
    });
    
    container.addEventListener('touchmove', function(e) {
      const isAtTop = container.scrollTop <= 0;
      const isAtBottom = container.scrollHeight - container.scrollTop <= container.clientHeight;
      
      if ((isAtTop && e.touches[0].clientY > e.touches[0].clientY) || 
          (isAtBottom && e.touches[0].clientY < e.touches[0].clientY)) {
        container.style.transform = 'scale(0.98)';
      }
    });
    
    container.addEventListener('touchend', function() {
      container.style.transform = 'scale(1)';
    });
  });
}

// Add this to the native-portfolio.js functions to enhance education, experience, etc. views
function enhanceSubView(viewName, contentHTML) {
  return `
    <div class="view-header enhanced">
      <button class="back-button enhanced">
        <i class="fas fa-arrow-left"></i> <span>Back</span>
      </button>
      <h3 class="view-title">${viewName}</h3>
    </div>
    <div class="view-content">
      ${contentHTML}
    </div>
  `;
}