document.addEventListener('DOMContentLoaded', function() {
  setupPortfolioNavigation();
});

function setupPortfolioNavigation() {
  // Get the portfolio button and add event listener
  const portfolioButton = document.querySelector('.glass-button');
  if (portfolioButton) {
    portfolioButton.addEventListener('click', function(e) {
      e.preventDefault();
      showPortfolioNative();
    });
  }
}

// Main portfolio view
function showPortfolioNative() {
  // Get the main content elements
  const mainContent = document.getElementById('main-content');
  const contentView = document.getElementById('content-view');
  const profileSection = document.querySelector('.profile-section');
  
  if (!mainContent || !contentView) return;
  
  // Hide main content and profile section
  mainContent.style.display = 'none';
  if (profileSection) profileSection.style.display = 'none';
  
  // Setup portfolio content
  contentView.innerHTML = `
    <div class="view-header enhanced">
      <button class="back-button enhanced">
        <i class="fas fa-arrow-left"></i> <span>Back</span>
      </button>
      <h3 class="view-title">Portfolio</h3>
    </div>
    <div class="view-content">
      <div class="portfolio-grid compact">
        <div class="portfolio-card" onclick="showEducationNative()">
          <div class="card-icon"><i class="fas fa-graduation-cap"></i></div>
          <h3>Education</h3>
          <p>BSc & MSc in Computer Science</p>
        </div>
        <div class="portfolio-card" onclick="showExperienceNative()">
          <div class="card-icon"><i class="fas fa-briefcase"></i></div>
          <h3>Experience</h3>
          <p>5+ years Full Stack Development</p>
        </div>
        <div class="portfolio-card" onclick="showSkillsNative()">
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
        <div class="portfolio-card" onclick="showAchievementsNative()">
          <div class="card-icon"><i class="fas fa-trophy"></i></div>
          <h3>Achievements</h3>
          <p>Certificates and Awards</p>
        </div>
      </div>
    </div>
  `;
  
  // Add event listener for back button
  const backButton = contentView.querySelector('.back-button');
  if (backButton) {
    backButton.addEventListener('click', closePortfolio);
  }
  
  // Show content view with animation
  contentView.style.display = 'block';
  contentView.classList.add('slide-in');
  setTimeout(() => contentView.classList.remove('slide-in'), 500);
}

function closePortfolio() {
  // Get the main content elements
  const mainContent = document.getElementById('main-content');
  const contentView = document.getElementById('content-view');
  const profileSection = document.querySelector('.profile-section');
  
  if (!mainContent || !contentView) return;
  
  // Add exit animation
  contentView.classList.add('slide-out');
  
  // After animation completes, hide content view and show main content
  setTimeout(() => {
    contentView.classList.remove('slide-out');
    contentView.style.display = 'none';
    mainContent.style.display = 'block';
    if (profileSection) profileSection.style.display = 'block';
  }, 300);
}

// Education section
function showEducationNative() {
  const contentView = document.getElementById('content-view');
  
  // Store current view for back navigation
  contentView.dataset.previousView = 'portfolio';
  
  // Add exit animation
  contentView.classList.add('slide-out');
  
  setTimeout(() => {
    contentView.classList.remove('slide-out');
    
    // Create education view
    contentView.innerHTML = `
      <div class="view-header">
        <button class="back-button" onclick="navigateBack()">
          <i class="fas fa-arrow-left"></i> Back
        </button>
        <h3 class="view-title">Education</h3>
      </div>
      <div class="view-content">
        <div class="education-grid native-scroll">
          <div class="education-card" onclick="showEduDetails('university')">
            <div class="card-icon"><i class="fas fa-university"></i></div>
            <h3>University</h3>
            <p>BGC Trust University Bangladesh</p>
          </div>
          <div class="education-card" onclick="showEduDetails('hsc')">
            <div class="card-icon"><i class="fas fa-school"></i></div>
            <h3>Higher Secondary</h3>
            <p>Al Haz Mostofa Hakim Degree College</p>
          </div>
          <div class="education-card" onclick="showEduDetails('ssc')">
            <div class="card-icon"><i class="fas fa-graduation-cap"></i></div>
            <h3>Secondary School</h3>
            <p>Safa Motaleb High School</p>
          </div>
          <div class="education-card" onclick="showEduDetails('jsc')">
            <div class="card-icon"><i class="fas fa-book"></i></div>
            <h3>Junior School</h3>
            <p>Govt. Muslim High School</p>
          </div>
          <div class="education-card" onclick="showEduDetails('psc')">
            <div class="card-icon"><i class="fas fa-child"></i></div>
            <h3>Primary School</h3>
            <p>Firingee Bazar Govt. School</p>
          </div>
        </div>
      </div>
    `;
    
    // Add entrance animation
    contentView.classList.add('slide-in');
    setTimeout(() => contentView.classList.remove('slide-in'), 500);
    
    // Check if scrollable to add shadow indicator
    const scrollContainer = contentView.querySelector('.native-scroll');
    checkScrollability(scrollContainer);
  }, 300);
}

function showEduDetails(eduType) {
  const contentView = document.getElementById('content-view');
  
  // Store current view for back navigation
  contentView.dataset.previousView = 'education';
  
  // Education data
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
  
  // Add exit animation
  contentView.classList.add('slide-out');
  
  setTimeout(() => {
    contentView.classList.remove('slide-out');
    
    // Create education details view
    contentView.innerHTML = `
      <div class="view-header edu-detail-view">
        <h3 class="view-title">${data.title}</h3>
      </div>
      <div class="view-content">
        <div class="edu-details-native">
          <h3>${data.school}</h3>
          <p class="period">${data.period}</p>
          <p class="details">${data.details}</p>
          <p class="gpa">${data.gpa}</p>
        </div>
      </div>
      <div class="floating-back-btn" onclick="navigateBack()">
        <i class="fas fa-arrow-left"></i>
      </div>
    `;
    
    // Add edu-detail-view class to contentView for CSS targeting
    contentView.classList.add('edu-detail-view');
    
    // Add entrance animation
    contentView.classList.add('slide-in');
    setTimeout(() => contentView.classList.remove('slide-in'), 500);
  }, 300);
}

// Experience section
function showExperienceNative() {
  const contentView = document.getElementById('content-view');
  
  // Store current view for back navigation
  contentView.dataset.previousView = 'portfolio';
  
  // Add exit animation
  contentView.classList.add('slide-out');
  
  setTimeout(() => {
    contentView.classList.remove('slide-out');
    
    // Create experience view
    contentView.innerHTML = `
      <div class="view-header">
        <button class="back-button" onclick="navigateBack()">
          <i class="fas fa-arrow-left"></i> Back
        </button>
        <h3 class="view-title">Experience</h3>
      </div>
      <div class="view-content">
        <div class="experience-container native-scroll">
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
      </div>
    `;
    
    // Add entrance animation
    contentView.classList.add('slide-in');
    setTimeout(() => contentView.classList.remove('slide-in'), 500);
    
    // Check if scrollable to add shadow indicator
    const scrollContainer = contentView.querySelector('.native-scroll');
    checkScrollability(scrollContainer);
  }, 300);
}

// Skills section
function showSkillsNative() {
  const contentView = document.getElementById('content-view');
  
  // Store current view for back navigation
  contentView.dataset.previousView = 'portfolio';
  
  // Add exit animation
  contentView.classList.add('slide-out');
  
  setTimeout(() => {
    contentView.classList.remove('slide-out');
    
    // Create skills view
    contentView.innerHTML = `
      <div class="view-header">
        <button class="back-button" onclick="navigateBack()">
          <i class="fas fa-arrow-left"></i> Back
        </button>
        <h3 class="view-title">Technical Skills</h3>
      </div>
      <div class="view-content">
        <div class="skills-container">
          ${Object.values(skillCategories).map(category => `
            <div class="skill-category" onclick="showCategoryDetails('${category.name}')">
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
      </div>
    `;
    
    // Add entrance animation
    contentView.classList.add('slide-in');
    setTimeout(() => contentView.classList.remove('slide-in'), 500);
  }, 300);
}

function showCategoryDetails(categoryName) {
  const contentView = document.getElementById('content-view');
  
  // Store current view for back navigation
  contentView.dataset.previousView = 'skills';
  
  // Get category data
  const category = Object.values(skillCategories).find(cat => cat.name === categoryName);
  
  if (!category) return;
  
  // Determine content based on category type
  let content;
  if (category.name === "Soft Skills & Ethics") {
    content = `
      <div class="soft-skills-grid native-scroll">
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
      <div class="category-skills-grid native-scroll">
        ${category.skills.map(skill => `
          <div class="category-skill-item">
            <div class="skill-name">${skill}</div>
          </div>
        `).join('')}
      </div>
    `;
  }
  
  // Add exit animation
  contentView.classList.add('slide-out');
  
  setTimeout(() => {
    contentView.classList.remove('slide-out');
    
    // Create category details view
    contentView.innerHTML = `
      <div class="view-header">
        <button class="back-button" onclick="navigateBack()">
          <i class="fas fa-arrow-left"></i> Back
        </button>
        <h3 class="view-title">${category.name}</h3>
      </div>
      <div class="view-content">
        <div class="category-header">
          <i class="${category.icon}"></i>
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
    
    // Add entrance animation
    contentView.classList.add('slide-in');
    setTimeout(() => contentView.classList.remove('slide-in'), 500);
    
    // Check if scrollable to add shadow indicator
    const scrollContainer = contentView.querySelector('.native-scroll');
    checkScrollability(scrollContainer);
  }, 300);
}

// Achievements section
function showAchievementsNative() {
  const contentView = document.getElementById('content-view');
  
  // Store current view for back navigation
  contentView.dataset.previousView = 'portfolio';
  
  // Achievements data
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
    }
  ];
  
  // Add exit animation
  contentView.classList.add('slide-out');
  
  setTimeout(() => {
    contentView.classList.remove('slide-out');
    
    // Create achievements view
    contentView.innerHTML = `
      <div class="view-header">
        <button class="back-button" onclick="navigateBack()">
          <i class="fas fa-arrow-left"></i> Back
        </button>
        <h3 class="view-title">Achievements</h3>
      </div>
      <div class="view-content">
        <div class="achievements-container">
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
      </div>
    `;
    
    // Add entrance animation
    contentView.classList.add('slide-in');
    setTimeout(() => contentView.classList.remove('slide-in'), 500);
  }, 300);
}

// Navigation back function
function navigateBack() {
  const contentView = document.getElementById('content-view');
  
  if (!contentView) return;
  
  const previousView = contentView.dataset.previousView || 'portfolio';
  
  // Add exit animation
  contentView.classList.add('slide-out-back');
  
  setTimeout(() => {
    contentView.classList.remove('slide-out-back');
    
    // Navigate to previous view based on stored value
    switch(previousView) {
      case 'portfolio':
        showPortfolioNative();
        break;
      case 'education':
        showEducationNative();
        break;
      case 'skills':
        showSkillsNative();
        break;
      default:
        showPortfolioNative();
    }
  }, 300);
}

// Helper function to check if container is scrollable
function checkScrollability(container) {
  if (!container) return;
  
  // Initial check
  if (container.scrollHeight > container.clientHeight) {
    container.classList.add('scrollable');
  }
  
  // Add scroll event listener
  container.addEventListener('scroll', function() {
    // Check if user has scrolled to the bottom
    const isAtBottom = container.scrollHeight - container.scrollTop === container.clientHeight;
    
    if (isAtBottom) {
      container.classList.remove('scrollable');
    } else {
      container.classList.add('scrollable');
    }
  });
}