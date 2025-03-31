/**
 * Dedicated file for the floating back button functionality
 * Created to avoid adding to maxed-out files
 */

// When the portfolio view is shown, check if we should show the floating back button
function shouldShowFloatingBackBtn(contentView) {
  if (!contentView) return false;
  
  // Get the current view title
  const viewTitle = contentView.querySelector('.view-header .view-title');
  if (!viewTitle) return true; // Default to showing if no title found
  
  // Don't show back button on main portfolio page, show on all subcards
  return viewTitle.textContent !== 'Portfolio';
}

// Override the portfolio navigation to handle floating back button specifically
document.addEventListener('DOMContentLoaded', function() {
  // Wait a bit for other scripts to initialize
  setTimeout(() => {
    const originalShowPortfolioNative = window.showPortfolioNative;
    
    if (typeof originalShowPortfolioNative === 'function') {
      window.showPortfolioNative = function() {
        // Call original function
        originalShowPortfolioNative();
        
        // Hide floating back button specifically for portfolio main view
        const floatingBackBtn = document.querySelector('.floating-back-btn');
        if (floatingBackBtn) {
          floatingBackBtn.style.display = 'none';
        }
      };
    }
  }, 500);
});