/**
 * Enhanced Native Portfolio Navigation
 * Improves the navigation in portfolio subcards with floating back buttons
 */

document.addEventListener('DOMContentLoaded', function() {
  enhancePortfolioNavigation();
});

function enhancePortfolioNavigation() {
  // Override the original navigation functions with enhanced versions
  window.showEducationNative = function() {
    const contentView = document.getElementById('content-view');
    
    // Store current view for back navigation
    contentView.dataset.previousView = 'portfolio';
    
    // Add exit animation
    contentView.classList.add('slide-out');
    
    setTimeout(() => {
      contentView.classList.remove('slide-out');
      
      // Create education view
      contentView.innerHTML = `
        <div class="view-header education-view">
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
        <div class="floating-back-btn" onclick="navigateBack()">
          <i class="fas fa-arrow-left"></i>
        </div>
      `;
      
      // Add education view class to contentView
      contentView.classList.add('education-view');
      
      // Add entrance animation
      contentView.classList.add('slide-in');
      setTimeout(() => contentView.classList.remove('slide-in'), 500);
      
      // Check if scrollable to add shadow indicator
      const scrollContainer = contentView.querySelector('.native-scroll');
      if (typeof checkScrollability === 'function') {
        checkScrollability(scrollContainer);
      }
    }, 300);
  };
  
  window.showExperienceNative = function() {
    const contentView = document.getElementById('content-view');
    
    // Store current view for back navigation
    contentView.dataset.previousView = 'portfolio';
    
    // Add exit animation
    contentView.classList.add('slide-out');
    
    setTimeout(() => {
      contentView.classList.remove('slide-out');
      
      // Create experience view
      contentView.innerHTML = `
        <div class="view-header experience-view">
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
        <div class="floating-back-btn" onclick="navigateBack()">
          <i class="fas fa-arrow-left"></i>
        </div>
      `;
      
      // Add experience view class to contentView
      contentView.classList.add('experience-view');
      
      // Add entrance animation
      contentView.classList.add('slide-in');
      setTimeout(() => contentView.classList.remove('slide-in'), 500);
      
      // Check if scrollable to add shadow indicator
      const scrollContainer = contentView.querySelector('.native-scroll');
      if (typeof checkScrollability === 'function') {
        checkScrollability(scrollContainer);
      }
    }, 300);
  };
  
  window.showSkillsNative = function() {
    const contentView = document.getElementById('content-view');
    
    // Store current view for back navigation
    contentView.dataset.previousView = 'portfolio';
    
    // Add exit animation
    contentView.classList.add('slide-out');
    
    setTimeout(() => {
      contentView.classList.remove('slide-out');
      
      // Create skills view
      contentView.innerHTML = `
        <div class="view-header skills-view">
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
        <div class="floating-back-btn" onclick="navigateBack()">
          <i class="fas fa-arrow-left"></i>
        </div>
      `;
      
      // Add skills view class to contentView
      contentView.classList.add('skills-view');
      
      // Add entrance animation
      contentView.classList.add('slide-in');
      setTimeout(() => contentView.classList.remove('slide-in'), 500);
    }, 300);
  };
  
  window.showAchievementsNative = function() {
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
        <div class="view-header achievements-view">
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
        <div class="floating-back-btn" onclick="navigateBack()">
          <i class="fas fa-arrow-left"></i>
        </div>
      `;
      
      // Add achievements view class to contentView
      contentView.classList.add('achievements-view');
      
      // Add entrance animation
      contentView.classList.add('slide-in');
      setTimeout(() => contentView.classList.remove('slide-in'), 500);
    }, 300);
  };

  function showEduDetails(eduType) {
    const contentView = document.getElementById('content-view');
    
    // Store current view for back navigation
    contentView.dataset.previousView = 'education';
    
    // Education data
    const eduData = {
      university: {
        title: "University",
        school: "BGC Trust University Bangladesh",
        period: "2020-2023",
        details: "Bachelor of Science in Computer Science and Engineering",
        gpa: "3.5/4.0"
      },
      hsc: {
        title: "Higher Secondary",
        school: "Al Haz Mostofa Hakim Degree College",
        period: "2018-2020",
        details: "Higher Secondary Certificate in Science",
        gpa: "5.0/5.0"
      },
      ssc: {
        title: "Secondary School",
        school: "Safa Motaleb High School",
        period: "2015-2018",
        details: "Secondary School Certificate in Science",
        gpa: "5.0/5.0"
      },
      jsc: {
        title: "Junior School",
        school: "Govt. Muslim High School",
        period: "2012-2015",
        details: "Junior School Certificate in Science",
        gpa: "5.0/5.0"
      },
      psc: {
        title: "Primary School",
        school: "Firingee Bazar Govt. School",
        period: "2008-2012",
        details: "Primary School Certificate",
        gpa: "5.0/5.0"
      }
    };
    
    const data = eduData[eduType];
    
    // Add exit animation
    contentView.classList.add('slide-out');
    
    setTimeout(() => {
      contentView.classList.remove('slide-out');
      
      // Create education details view with no back button in the header
      contentView.innerHTML = `
        <div class="view-header">
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
      
      // Add entrance animation
      contentView.classList.add('slide-in');
      setTimeout(() => contentView.classList.remove('slide-in'), 500);
    }, 300);
  }

  window.showCategoryDetails = function(categoryName) {
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
        <div class="view-header skill-category-view">
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
        <div class="floating-back-btn" onclick="navigateBack()">
          <i class="fas fa-arrow-left"></i>
        </div>
      `;
      
      // Add skill category view class to contentView
      contentView.classList.add('skill-category-view');
      
      // Add entrance animation
      contentView.classList.add('slide-in');
      setTimeout(() => contentView.classList.remove('slide-in'), 500);
      
      // Check if scrollable to add shadow indicator
      const scrollContainer = contentView.querySelector('.native-scroll');
      if (typeof checkScrollability === 'function') {
        checkScrollability(scrollContainer);
      }
    }, 300);
  };

  // Modify back navigation to clear class names
  const originalNavigateBack = window.navigateBack;
  window.navigateBack = function() {
    const contentView = document.getElementById('content-view');
    
    // Remove specific view classes
    contentView.classList.remove('education-view', 'experience-view', 'skills-view', 'achievements-view', 'skill-category-view');
    
    // Call original navigate back
    if (typeof originalNavigateBack === 'function') {
      originalNavigateBack();
    } else {
      // Fallback navigation if original function isn't available
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
  };
}