/**
 * Native-like interactions and behaviors
 * Handles more complex interactions for native app-like experience
 */

document.addEventListener('DOMContentLoaded', function() {
  enhanceNativeInteractions();
});

function enhanceNativeInteractions() {
  // Apply native-like transitions and animations
  applyNativeTransitions();
  
  // Enhance back button behavior
  enhanceBackButtonBehavior();
  
  // Add floating back buttons where needed
  addFloatingBackButtons();
  
  // Set up observers for future content
  observeForDynamicContent();
}

function applyNativeTransitions() {
  // Add smooth transitions between views
  const style = document.createElement('style');
  style.textContent = `
    .view-content {
      transition: opacity 0.3s ease;
    }
    
    .view-header {
      position: sticky;
      top: 0;
      z-index: 100;
      backdrop-filter: blur(15px);
      transition: all 0.3s ease;
    }
    
    .floating-back-btn {
      transform: scale(0);
      transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275),
                  opacity 0.3s ease,
                  background-color 0.3s ease;
      animation: floatingButtonAppear 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.2s forwards;
    }
    
    @keyframes floatingButtonAppear {
      from { transform: scale(0); opacity: 0; }
      to { transform: scale(1); opacity: 0.9; }
    }
    
    .floating-back-btn:active {
      transform: scale(0.9);
    }
  `;
  document.head.appendChild(style);
}

function enhanceBackButtonBehavior() {
  // Patch navigateBack function to handle skill category views
  const originalNavigateBack = window.navigateBack;
  if (originalNavigateBack) {
    window.navigateBack = function() {
      const contentView = document.getElementById('content-view');
      
      if (!contentView) return;
      
      // Remove specific view classes
      contentView.classList.remove(
        'education-view', 
        'experience-view', 
        'skills-view', 
        'achievements-view',
        'skill-category-view'
      );
      
      // Call original navigate back
      originalNavigateBack();
    };
  }
}

function addFloatingBackButtons() {
  // Add observer to detect when views are displayed
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
        const contentView = document.getElementById('content-view');
        if (!contentView) return;
        
        // Check if we need to add a floating back button
        if (contentView.classList.contains('skill-category-view') && 
            !contentView.querySelector('.floating-back-btn')) {
          
          const floatingBtn = document.createElement('div');
          floatingBtn.className = 'floating-back-btn';
          floatingBtn.innerHTML = '<i class="fas fa-arrow-left"></i>';
          floatingBtn.onclick = function() {
            navigateBack();
          };
          
          contentView.appendChild(floatingBtn);
        }
      }
    });
  });
  
  const contentView = document.getElementById('content-view');
  if (contentView) {
    observer.observe(contentView, { attributes: true });
  }
}

function observeForDynamicContent() {
  // Watch for dynamically added content
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.type === 'childList') {
        // Hide back buttons in skill category views
        const skillHeaders = document.querySelectorAll('.view-header.skill-category-view');
        skillHeaders.forEach(header => {
          const backBtn = header.querySelector('.back-button');
          if (backBtn) {
            backBtn.style.display = 'none';
          }
        });
        
        // Ensure floating back buttons are present
        const skillViews = document.querySelectorAll('#content-view.skill-category-view');
        skillViews.forEach(view => {
          if (!view.querySelector('.floating-back-btn')) {
            const floatingBtn = document.createElement('div');
            floatingBtn.className = 'floating-back-btn';
            floatingBtn.innerHTML = '<i class="fas fa-arrow-left"></i>';
            floatingBtn.onclick = function() {
              navigateBack();
            };
            
            view.appendChild(floatingBtn);
          }
        });
      }
    });
  });
  
  observer.observe(document.body, { childList: true, subtree: true });
}