// New file for enhanced UI features and animations
document.addEventListener('DOMContentLoaded', function() {
  // Add iOS stylesheet
  addStylesheet('/ios-style.css');
  
  // Apply iOS-style animations to all popups
  enhancePopupAnimations();
});

function addStylesheet(path) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = path;
  document.head.appendChild(link);
}

function enhancePopupAnimations() {
  // Add observer for popup animations
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.addedNodes.length) {
        mutation.addedNodes.forEach(node => {
          // Check if added node is popup overlay
          if (node.classList && 
             (node.classList.contains('info-popup-overlay') || 
              node.classList.contains('search-modal-overlay'))) {
            enhancePopupNode(node);
          }
        });
      }
    });
  });
  
  observer.observe(document.body, { childList: true });
}

function enhancePopupNode(popupNode) {
  // Add spring animation to popup appearance
  setTimeout(() => {
    const popup = popupNode.querySelector('.info-popup, .search-modal-container');
    if (popup) {
      popup.style.transition = 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    }
    
    // Add staggered animation to sections
    const sections = popupNode.querySelectorAll('.info-section');
    sections.forEach((section, index) => {
      section.style.animationDelay = `${0.1 + (index * 0.05)}s`;
    });
  }, 10);
  
  // Add iOS-style close button effect
  const closeButton = popupNode.querySelector('.info-popup-close, .search-close-btn');
  if (closeButton) {
    closeButton.addEventListener('mousedown', function() {
      this.style.transform = 'scale(0.95)';
    });
    
    closeButton.addEventListener('mouseup', function() {
      this.style.transform = 'rotate(90deg)';
    });
  }
}

// Native-like view navigation system
let viewHistory = [];
let currentView = 'main';

function navigateTo(viewId, contentHTML, title = null) {
  // Save current view to history
  viewHistory.push(currentView);
  
  // Hide current content
  document.getElementById('main-content').style.display = 'none';
  
  // Create or update the content view
  const contentView = document.getElementById('content-view');
  
  // Clear previous content and add new header with back button
  contentView.innerHTML = `
    <div class="view-header">
      <button class="back-button" onclick="navigateBack()">
        <i class="fas fa-arrow-left"></i> Back
      </button>
      ${title ? `<h3 class="view-title">${title}</h3>` : ''}
    </div>
    <div class="view-content">${contentHTML}</div>
  `;
  
  // Show content view
  contentView.style.display = 'block';
  
  // Update current view
  currentView = viewId;
  
  // Add animation class
  contentView.classList.add('slide-in');
  setTimeout(() => contentView.classList.remove('slide-in'), 500);
}

function navigateBack() {
  if (viewHistory.length === 0) return;
  
  // Get previous view
  const prevView = viewHistory.pop();
  
  // Add exit animation
  const contentView = document.getElementById('content-view');
  contentView.classList.add('slide-out');
  
  setTimeout(() => {
    contentView.classList.remove('slide-out');
    
    if (prevView === 'main') {
      // Return to main view
      document.getElementById('main-content').style.display = 'block';
      contentView.style.display = 'none';
    } else {
      // Handle sub-view navigation (e.g., back from Education Details to Education)
      // This would need specific handling based on the view hierarchy
      // For now, just go back to main if it's not specifically handled
      document.getElementById('main-content').style.display = 'block';
      contentView.style.display = 'none';
    }
    
    // Update current view
    currentView = prevView;
  }, 300);
}

// Adapt existing showPortfolio function to use native navigation
function showPortfolioNative() {
  const portfolioContent = `
    <div class="portfolio-container">
      <h2>My Skills & Experience</h2>
      <div class="portfolio-grid">
        <div class="portfolio-card" onclick="expandCardNative('education')">
          <div class="card-icon"><i class="fas fa-graduation-cap"></i></div>
          <h3>Education</h3>
          <p>BSc & MSc in Computer Science</p>
        </div>
        <div class="portfolio-card" onclick="expandCardNative('experience')">
          <div class="card-icon"><i class="fas fa-briefcase"></i></div>
          <h3>Experience</h3>
          <p>5+ years Full Stack Development</p>
        </div>
        <div class="portfolio-card" onclick="expandCardNative('tech')">
          <div class="card-icon"><i class="fas fa-laptop-code"></i></div>
          <h3>Tech Skills</h3>
          <p>JS, React, Node.js, Python</p>
        </div>
        
        <a href="https://alahimajnurosama.github.io/blog" target="_blank" style="text-decoration: none; color: inherit;">
          <div class="portfolio-card">
            <div class="card-icon"><i class="fas fa-users"></i></div>
            <h3>Blogs</h3> 
            <p>Daily Life and Blogs</p>
          </div>
        </a>  
        <div class="portfolio-card" onclick="expandCardNative('achievements')">
          <div class="card-icon"><i class="fas fa-trophy"></i></div>
          <h3>Achievements</h3>
          <p>Certificates and Awards</p>
        </div>
      </div>
    </div>
  `;
  
  navigateTo('portfolio', portfolioContent, 'My Portfolio');
}

function expandCardNative(cardType) {
  switch(cardType) {
    case 'education':
      showEducationDetailsNative();
      break;
    case 'experience':
      showExperienceDetailsNative();
      break;
    case 'tech':
      showTechSkillsNative();
      break;
    case 'achievements':
      showAchievementsNative();
      break;
  }
}

function showEducationDetailsNative() {
  const eduContent = `
    <div class="education-container">
      <h2>Education Timeline</h2>
      <div class="education-grid">
        <div class="education-card" onclick="showEduDetailsNative('university')">
          <div class="card-icon"><i class="fas fa-university"></i></div>
          <h3>University</h3>
          <p>BGC Trust University Bangladesh</p>
        </div>
        <div class="education-card" onclick="showEduDetailsNative('hsc')">
          <div class="card-icon"><i class="fas fa-school"></i></div>
          <h3>Higher Secondary</h3>
          <p>Al Haz Mostofa Hakim Degree College</p>
        </div>
        <div class="education-card" onclick="showEduDetailsNative('ssc')">
          <div class="card-icon"><i class="fas fa-graduation-cap"></i></div>
          <h3>Secondary School</h3>
          <p>Safa Motaleb High School</p>
        </div>
        <div class="education-card" onclick="showEduDetailsNative('jsc')">
          <div class="card-icon"><i class="fas fa-book"></i></div>
          <h3>Junior School</h3>
          <p>Govt. Muslim High School</p>
        </div>
        <div class="education-card" onclick="showEduDetailsNative('psc')">
          <div class="card-icon"><i class="fas fa-child"></i></div>
          <h3>Primary School</h3>
          <p>Firingee Bazar Govt. School</p>
        </div>
      </div>
    </div>
  `;
  
  navigateTo('education', eduContent, 'Education');
}

function showEduDetailsNative(eduType) {
  const eduData = {
    university: {
      title: "University Education",
      school: "BGC Trust University Bangladesh",
      period: "2023-Present",
      details: "BSc. in Computer Science and Engineering",
      gpa: "Currently Studying"
    },
    hsc: {
      title: "Higher Secondary Education",
      school: "Uttar Kattali Al Haz Mostofa Hakim Degree College",
      period: "2020-2022",
      details: "Science Group",
      gpa: "GPA 4.25 out of 5.0"
    },
    ssc: {
      title: "Secondary School Certificate",
      school: "Safa Motaleb High School",
      period: "2018-2019",
      details: "Science Group",
      gpa: "GPA 4.50 out of 5.0"
    },
    jsc: {
      title: "Junior School Certificate",
      school: "Govt. Muslim High School",
      period: "2017",
      details: "",
      gpa: "GPA 4.57 out of 5.0"
    },
    psc: {
      title: "Primary School Certificate",
      school: "Firingee Bazar Govt. primary School",
      period: "2014",
      details: "",
      gpa: "GPA 5.0 out of 5.0"
    }
  };

  const data = eduData[eduType];
  const detailsContent = `
    <div class="edu-details">
      <h2>${data.title}</h2>
      <div class="edu-info">
        <h3>${data.school}</h3>
        <p class="period">${data.period}</p>
        <p class="details">${data.details}</p>
        <p class="gpa">${data.gpa}</p>
      </div>
    </div>
  `;
  
  navigateTo(`edu-${eduType}`, detailsContent, data.title);
}

function showExperienceDetailsNative() {
  const experienceContent = `
    <div class="experience-container">
      <h2>Experience Timeline</h2>
      <div class="experience-item">
        <div class="experience-title">
          <i class="fas fa-crown"></i> 
          Founder & Chief Executive Officer
        </div>
        <div class="experience-period">
          <i class="far fa-calendar-alt"></i> 2022-Present
        </div>
        <div class="experience-description">
          Founder & Executive officer in A geek programme called Urbanism and a Cyber Security Team named "Team Urban".
        </div>
      </div>
      <div class="experience-item">
        <div class="experience-title">
          <i class="fas fa-laptop-code"></i> 
          Freelancer
        </div>
        <div class="experience-period">
          <i class="far fa-calendar-alt"></i> 2022-present
        </div>
        <div class="experience-description">
          Starting Carrier as a Digital marketter
        </div>
      </div>
      <div class="experience-item">
        <div class="experience-title">
          <i class="fas fa-code"></i>
          Web Designer and Web Application Tester
        </div>
        <div class="experience-period">
          <i class="far fa-calendar-alt"></i> 2020-2023
        </div>
        <div class="experience-description">
          Starting a career as a freelance web application tester and later as a reverse engineer.
        </div>
      </div>
    </div>
  `;
  
  navigateTo('experience', experienceContent, 'Experience');
}

function showTechSkillsNative() {
  const skillsContent = `
    <div class="skills-container">
      ${Object.values(skillCategories).map(category => `
        <div class="skill-category" onclick="showCategoryDetailsNative('${category.name}')">
          <div class="skill-header">
            <i class="${category.icon}"></i>
            <span>${category.name}</span>
            <span class="percentage">${category.percent}%</span>
          </div>
          <div class="skill-bar">
            <div class="skill-fill" style="width: ${category.percent}%"></div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
  
  navigateTo('skills', skillsContent, 'Technical Skills');
}

function showCategoryDetailsNative(categoryName) {
  const category = Object.values(skillCategories).find(cat => cat.name === categoryName);
  
  let content;
  if (category.name === "Soft Skills & Ethics") {
    content = `
      <div class="soft-skills-grid">
        ${category.skills.map(item => `
          <div class="soft-skill-card">
            <div class="soft-skill-name">${item.skill}</div>
            <div class="soft-skill-bar">
              <div class="soft-skill-fill" style="width: ${item.percent}%"></div>
            </div>
            <div class="soft-skill-percent">${item.percent}%</div>
          </div>
        `).join('')}
      </div>
    `;
  } else {
    content = `
      <div class="category-skills-grid">
        ${category.skills.map(skill => `
          <div class="category-skill-item">
            <div class="skill-name">${skill}</div>
          </div>
        `).join('')}
      </div>
    `;
  }

  const categoryContent = `
    <div class="category-container">
      <div class="category-header">
        <i class="${category.icon}"></i>
        <h2>${category.name}</h2>
        <div class="category-progress">
          <div class="skill-bar">
            <div class="skill-fill" style="width: ${category.percent}%"></div>
          </div>
          <span class="percentage">${category.percent}%</span>
        </div>
      </div>
      ${content}
    </div>
  `;
  
  navigateTo(`skill-${categoryName}`, categoryContent, category.name);
}

function showAchievementsNative() {
  const achievements = [
    {
      title: "Streamlining Visitor Appointments: Automated Scheduling System",
      description: "Successfully Published my First Research paper",
      image: "https://alahimajnurosama.github.io/portfolio/assets/images/blog-1.jpg",
      link: "https://alahimajnurosama.github.io/portfolio/assets/images/blog-1.jpg"
    },
    {
      title: "Proud Recipient Of Academic Excellence.",
      description: "Recognition for collective achievement in research excellence.",
      image: "https://alahimajnurosama.github.io/portfolio/assets/images/blog-2.jpg",
      link: "https://alahimajnurosama.github.io/portfolio/assets/images/blog-2.jpg"
    },
  ];

  const achievementsContent = `
    <div class="achievements-container">
      <h2>Achievements</h2>
      <div class="achievements-grid">
        ${achievements.map((achievement, index) => `
          <div class="achievement-card" style="animation: fadeInUp 1.0s ease forwards ${index * 0.2}s;">
            <img src="${achievement.image}" alt="${achievement.title}" class="achievement-image">
            <div class="achievement-overlay">
              <h3 class="achievement-title">${achievement.title}</h3>
              <p class="achievement-description">${achievement.description}</p>
              <button class="view-certificate-btn" onclick="window.open('${achievement.link}', '_blank')">View Certificate</button>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
  
  navigateTo('achievements', achievementsContent, 'Achievements');
}

// Adapt info panel functionality for native experience
function initNativeInfoPanel() {
  const infoToggle = document.getElementById('info-toggle');
  
  infoToggle.addEventListener('click', function() {
    const infoContent = `
      <div class="info-content-grid">
        ${createInfoButtons()}
      </div>
    `;
    navigateTo('info-panel', infoContent, 'Tools & Information');
  });
}

function createInfoButtons() {
  const buttons = [
    {
      id: 'search-btn',
      icon: 'fas fa-search',
      label: 'Search',
      color: '#4a6fa5',
      action: 'showAdvancedSearchModal()'
    },
    {
      id: 'device-info-btn',
      icon: 'fas fa-laptop',
      label: 'Device Info',
      color: '#5b8c5a',
      action: 'showDeviceInfoIOSNative()'
    },
    {
      id: 'ip-info-btn',
      icon: 'fas fa-globe',
      label: 'IP Info',
      color: '#a5694a',
      action: 'showIpInfoIOSNative()'
    },
    {
      id: 'calculator-btn',
      icon: 'fas fa-calculator',
      label: 'Calculator',
      color: '#7a55c7',
      action: "window.open('https://alahimajnurosama.github.io/Projects/Calculator/', '_blank')"
    },
    {
      id: 'password-gen-btn',
      icon: 'fas fa-key',
      label: 'Password Generator',
      color: '#c7556d',
      action: "window.open('https://alahimajnurosama.github.io/Projects/passgen/', '_blank')"
    },
    {
      id: 'weather-btn',
      icon: 'fas fa-cloud-sun',
      label: 'Weather App',
      color: '#55a7c7',
      action: "window.open('https://alahimajnurosama.github.io/Projects/weather/', '_blank')"
    }
  ];
  
  return buttons.map(btn => `
    <div class="info-panel-button" style="background-color: ${btn.color}" onclick="${btn.action}">
      <div class="info-button-icon">
        <i class="${btn.icon}"></i>
      </div>
      <span class="info-button-label">${btn.label}</span>
    </div>
  `).join('');
}

function showDeviceInfoIOSNative() {
  const browserInfo = detectBrowser();
  const screenInfo = getScreenDetails();
  const systemInfo = getSystemInfo();
  const advancedInfo = getAdvancedSystemInfo();
  
  const deviceInfoContent = `
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
            <div class="ios-value">${advancedInfo.memory}</div>
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
            <div class="ios-value">${advancedInfo.battery}</div>
          </div>
        </div>
      </div>
    </div>
  `;
  
  navigateTo('device-info', deviceInfoContent, 'Device Information');
}

function showIpInfoIOSNative() {
  // First show loading state
  const loadingContent = `
    <div class="ios-section" style="animation-delay: 0.1s">
      <div class="ios-section-header">
        <i class="fas fa-spinner fa-spin"></i> Loading IP Information
      </div>
      <div class="ios-section-content" style="text-align: center; padding: 30px;">
        Fetching your IP information...
      </div>
    </div>
  `;
  
  navigateTo('ip-info', loadingContent, 'IP Information');
  
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
                <div class="ios-value">${data.country_name} (${data.country_code})</div>
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
      `;
      
      // Update the view with the actual data
      const contentView = document.querySelector('.view-content');
      if (contentView) {
        contentView.innerHTML = ipInfoContent;
        
        // Animate new sections
        const sections = contentView.querySelectorAll('.ios-section');
        sections.forEach((section, index) => {
          section.style.animationDelay = `${0.1 + (index * 0.1)}s`;
          section.style.animation = 'ios-section-appear 0.5s forwards';
        });
      }
    })
    .catch(error => {
      const contentView = document.querySelector('.view-content');
      if (contentView) {
        contentView.innerHTML = `
          <div class="ios-section" style="text-align: center; padding: 30px;">
            <i class="fas fa-exclamation-circle" style="font-size: 40px; color: #ff3b30; margin-bottom: 20px;"></i>
            <p>Failed to fetch IP information</p>
            <button class="ios-button" onclick="showIpInfoIOSNative()">Try Again</button>
          </div>
        `;
      }
    });
}

// Initialize everything when document is ready
document.addEventListener('DOMContentLoaded', function() {
  // Initialize native view system
  initNativeInfoPanel();
  
  // Replace existing functions with native versions
  window.showPortfolio = showPortfolioNative;
});