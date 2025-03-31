// New file for advanced search functionality
function initSearchFeatures() {
  const searchBtn = document.getElementById('search-btn');
  
  // Check if search button exists before adding event listener
  if (searchBtn) {
    searchBtn.addEventListener('click', function() {
      showAdvancedSearchModal();
    });
  }
}

function showAdvancedSearchModal() {
  const searchModal = document.createElement('div');
  searchModal.className = 'search-modal-overlay';
  
  searchModal.innerHTML = `
    <div class="search-modal-container">
      <div class="search-modal-header">
        <h2><i class="fas fa-search"></i> Advanced Search</h2>
        <button class="search-close-btn"><i class="fas fa-times"></i></button>
      </div>
      
      <div class="search-tabs">
        <button class="search-tab-btn active" data-tab="web">Web Search</button>
        <button class="search-tab-btn" data-tab="images">Images</button>
        <button class="search-tab-btn" data-tab="videos">Videos</button>
        <button class="search-tab-btn" data-tab="maps">Maps</button>
        <button class="search-tab-btn" data-tab="news">News</button>
      </div>
      
      <div class="search-content">
        <div class="search-input-group">
          <input type="text" id="search-input" placeholder="Enter your search query">
          <button id="voice-search-btn"><i class="fas fa-microphone"></i></button>
        </div>
        
        <div class="search-engines">
          <div class="search-engine-option">
            <input type="radio" id="google" name="search-engine" value="google" checked>
            <label for="google"><i class="fab fa-google"></i> Google</label>
          </div>
          <div class="search-engine-option">
            <input type="radio" id="bing" name="search-engine" value="bing">
            <label for="bing"><i class="fab fa-microsoft"></i> Bing</label>
          </div>
          <div class="search-engine-option">
            <input type="radio" id="duckduckgo" name="search-engine" value="duckduckgo">
            <label for="duckduckgo"><i class="fas fa-duck"></i> DuckDuckGo</label>
          </div>
          <div class="search-engine-option">
            <input type="radio" id="startpage" name="search-engine" value="startpage">
            <label for="startpage"><i class="fas fa-globe"></i> Startpage</label>
          </div>
          <div class="search-engine-option">
            <input type="radio" id="brave" name="search-engine" value="brave">
            <label for="brave"><i class="fas fa-shield-alt"></i> Brave Search</label>
          </div>
        </div>
        
        <div class="advanced-options">
          <details>
            <summary>Advanced Options</summary>
            <div class="advanced-options-content">
              <div class="advanced-option">
                <label for="time-range">Time Range:</label>
                <select id="time-range">
                  <option value="any">Any time</option>
                  <option value="day">Past 24 hours</option>
                  <option value="week">Past week</option>
                  <option value="month">Past month</option>
                  <option value="year">Past year</option>
                </select>
              </div>
              
              <div class="advanced-option">
                <label for="safe-search">SafeSearch:</label>
                <select id="safe-search">
                  <option value="off">Off</option>
                  <option value="moderate" selected>Moderate</option>
                  <option value="strict">Strict</option>
                </select>
              </div>
              
              <div class="advanced-option">
                <label for="result-count">Results per page:</label>
                <select id="result-count">
                  <option value="10">10</option>
                  <option value="25" selected>25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
              </div>
            </div>
          </details>
        </div>
        
        <div class="recent-searches">
          <h3>Recent Searches</h3>
          <div id="recent-searches-list">
            <div class="empty-state">No recent searches</div>
          </div>
        </div>
      </div>
      
      <div class="search-footer">
        <div class="search-tips">
          <button id="search-tips-btn"><i class="fas fa-lightbulb"></i> Search Tips</button>
          <div id="search-tips-content" class="hidden">
            <ul>
              <li>Use quotes for exact phrases: "search term"</li>
              <li>Exclude words with minus: term -excluded</li>
              <li>Site specific: site:example.com term</li>
              <li>Find file types: filetype:pdf term</li>
            </ul>
          </div>
        </div>
        <button id="perform-search" class="primary-btn">Search</button>
      </div>
    </div>
  `;

  document.body.appendChild(searchModal);
  
  // Animate the modal in
  setTimeout(() => {
    searchModal.classList.add('active');
    document.getElementById('search-input').focus();
  }, 10);
  
  // Setup event listeners
  const closeBtn = searchModal.querySelector('.search-close-btn');
  closeBtn.addEventListener('click', () => {
    searchModal.classList.remove('active');
    setTimeout(() => searchModal.remove(), 300);
  });
  
  const searchTabs = searchModal.querySelectorAll('.search-tab-btn');
  searchTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active class from all tabs
      searchTabs.forEach(t => t.classList.remove('active'));
      // Add active class to clicked tab
      tab.classList.add('active');
      // Update placeholder based on tab
      const searchInput = document.getElementById('search-input');
      switch(tab.dataset.tab) {
        case 'images':
          searchInput.placeholder = 'Search for images...';
          break;
        case 'videos':
          searchInput.placeholder = 'Search for videos...';
          break;
        case 'maps':
          searchInput.placeholder = 'Search for locations...';
          break;
        case 'news':
          searchInput.placeholder = 'Search for news...';
          break;
        default:
          searchInput.placeholder = 'Enter your search query';
      }
    });
  });
  
  // Search tips toggle
  const searchTipsBtn = document.getElementById('search-tips-btn');
  const searchTipsContent = document.getElementById('search-tips-content');
  searchTipsBtn.addEventListener('click', () => {
    searchTipsContent.classList.toggle('hidden');
  });
  
  // Search execution
  const performSearch = document.getElementById('perform-search');
  performSearch.addEventListener('click', () => {
    executeSearch(searchModal);
  });
  
  // Voice search
  const voiceSearchBtn = document.getElementById('voice-search-btn');
  voiceSearchBtn.addEventListener('click', () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';
      
      recognition.onstart = () => {
        voiceSearchBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
      };
      
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        document.getElementById('search-input').value = transcript;
      };
      
      recognition.onerror = () => {
        voiceSearchBtn.innerHTML = '<i class="fas fa-microphone"></i>';
      };
      
      recognition.onend = () => {
        voiceSearchBtn.innerHTML = '<i class="fas fa-microphone"></i>';
      };
      
      recognition.start();
    } else {
      alert('Voice recognition is not supported in your browser.');
    }
  });
  
  // Handle enter key
  const searchInput = document.getElementById('search-input');
  searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
      executeSearch(searchModal);
    }
  });
}

function executeSearch(modalElement) {
  const searchTerm = document.getElementById('search-input').value;
  if (!searchTerm.trim()) return;
  
  // Save to recent searches
  saveRecentSearch(searchTerm);
  
  // Get selected search engine
  const selectedEngineEl = document.querySelector('input[name="search-engine"]:checked');
  const selectedEngine = selectedEngineEl ? selectedEngineEl.value : 'google';
  
  // Get selected tab
  const selectedTab = document.querySelector('.search-tab-btn.active').dataset.tab;
  
  // Get advanced options
  const timeRange = document.getElementById('time-range').value;
  const safeSearch = document.getElementById('safe-search').value;
  
  // Construct search URL based on engine and options
  let searchURL;
  
  switch(selectedEngine) {
    case 'google':
      searchURL = `https://www.google.com/search?q=${encodeURIComponent(searchTerm)}`;
      // Add tab-specific parameters
      if (selectedTab === 'images') searchURL += '&tbm=isch';
      if (selectedTab === 'videos') searchURL += '&tbm=vid';
      if (selectedTab === 'news') searchURL += '&tbm=nws';
      if (selectedTab === 'maps') searchURL = `https://www.google.com/maps/search/${encodeURIComponent(searchTerm)}`;
      // Add time range
      if (timeRange !== 'any') {
        const timeParams = {
          'day': '&tbs=qdr:d',
          'week': '&tbs=qdr:w',
          'month': '&tbs=qdr:m',
          'year': '&tbs=qdr:y'
        };
        searchURL += timeParams[timeRange] || '';
      }
      // Add safe search
      if (safeSearch !== 'off') {
        searchURL += safeSearch === 'strict' ? '&safe=active' : '&safe=images';
      }
      break;
      
    case 'bing':
      searchURL = `https://www.bing.com/search?q=${encodeURIComponent(searchTerm)}`;
      // Add tab-specific parameters
      if (selectedTab === 'images') searchURL = `https://www.bing.com/images/search?q=${encodeURIComponent(searchTerm)}`;
      if (selectedTab === 'videos') searchURL = `https://www.bing.com/videos/search?q=${encodeURIComponent(searchTerm)}`;
      if (selectedTab === 'news') searchURL = `https://www.bing.com/news/search?q=${encodeURIComponent(searchTerm)}`;
      if (selectedTab === 'maps') searchURL = `https://www.bing.com/maps/q=${encodeURIComponent(searchTerm)}`;
      break;
      
    case 'duckduckgo':
      searchURL = `https://duckduckgo.com/?q=${encodeURIComponent(searchTerm)}`;
      // Add tab-specific parameters
      if (selectedTab === 'images') searchURL += '&ia=images&iax=images';
      if (selectedTab === 'videos') searchURL += '&ia=videos&iax=videos';
      if (selectedTab === 'news') searchURL += '&ia=news&iar=news';
      if (selectedTab === 'maps') searchURL += '&ia=maps&iaxm=maps';
      // Add safe search
      if (safeSearch !== 'off') {
        searchURL += safeSearch === 'strict' ? '&kp=1' : '&kp=-1';
      }
      break;
      
    case 'startpage':
      searchURL = `https://www.startpage.com/do/search?q=${encodeURIComponent(searchTerm)}`;
      break;
      
    case 'brave':
      searchURL = `https://search.brave.com/search?q=${encodeURIComponent(searchTerm)}`;
      // Add tab-specific parameters
      if (selectedTab === 'images') searchURL += '&source=images';
      if (selectedTab === 'videos') searchURL += '&source=videos';
      if (selectedTab === 'news') searchURL += '&source=news';
      break;
      
    default:
      searchURL = `https://www.google.com/search?q=${encodeURIComponent(searchTerm)}`;
  }
  
  // Close the modal
  modalElement.classList.remove('active');
  setTimeout(() => modalElement.remove(), 300);
  
  // Open search in new tab
  window.open(searchURL, '_blank');
}

function saveRecentSearch(term) {
  // Get existing searches from localStorage
  let recentSearches = JSON.parse(localStorage.getItem('recentSearches') || '[]');
  
  // Add the new search to the beginning and remove duplicates
  recentSearches = [term, ...recentSearches.filter(s => s !== term)];
  
  // Keep only the 5 most searches
  recentSearches = recentSearches.slice(0, 5);
  
  // Save back to 
  localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
  
  // Update the UI if the recent searches list exists
  updateRecentSearchesUI();
}

function updateRecentSearchesUI() {
  const recentSearchesList = document.getElementById('recent-searches-list');
  if (!recentSearchesList) return;
  
  const recentSearches = JSON.parse(localStorage.getItem('recentSearches') || '[]');
  
  if (recentSearches.length === 0) {
    recentSearchesList.innerHTML = '<div class="empty-state">No recent searches</div>';
    return;
  }
  
  recentSearchesList.innerHTML = recentSearches.map(search => `
    <div class="recent-search-item">
      <span>${search}</span>
      <button class="recent-search-use" data-term="${search}">
        <i class="fas fa-search"></i>
      </button>
    </div>
  `).join('');
  
  // Add click handlers for the recent searches
  const searchButtons = recentSearchesList.querySelectorAll('.recent-search-use');
  searchButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      document.getElementById('search-input').value = btn.dataset.term;
    });
  });
}

// Initialize search features when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initSearchFeatures();
  
  // Create search button if it doesn't exist yet
  if (!document.getElementById('search-btn')) {
    // The button will be created by initInfoPanelButtons in info-panel.js
    console.log("Search button not found, will be created by info panel initialization");
  }
});