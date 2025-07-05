import * as THREE from 'three'; // Import three from import map
import { initPersonalInfoView } from './personal-info.js';
import { initEducationView } from './education.js'; // Import new module
import { initSkillsView } from './skills.js'; // Import skills module
import { initProjectsView } from './projects.js'; // Import projects module
import { initAchievementsView } from './achievements.js'; // Import achievements module
import { initBlogsView } from './blogs.js'; // Import blogs module
import { initContactView } from './contact.js'; // Import contact module
import { initCreationsView } from './creations.js';
import { initExperienceView } from './experience.js';

async function loadProfileData() {
    try {
        const response = await fetch('/json/data.json'); // Fetching from data.json now for name
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const { personalInfo } = data;

        // Update name
        if (personalInfo && personalInfo.name) {
            document.getElementById('main-name-title').textContent = personalInfo.name;
        }

    } catch (error) {
        console.error("Could not load profile data:", error);
    }
}

const canvas = document.getElementById('auroraCanvas');
const renderer = new THREE.WebGLRenderer({canvas, antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);

const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

const geometry = new THREE.PlaneGeometry(2, 2);
const uniforms = {
  time: { value: 0 },
  resolution: { value: new THREE.Vector2() },
  isNightMode: { value: 0 }
};

const material = new THREE.ShaderMaterial({
  uniforms: uniforms,
  vertexShader: document.getElementById('vertexShader').textContent,
  fragmentShader: document.getElementById('fragmentShader').textContent
});

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

function resizeRendererToDisplaySize(renderer) {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }
  return needResize;
}

let targetNightValue = 0;
let currentNightValue = 0;
const transitionSpeed = 0.05;

function render(time) {
  time *= 0.001;

  // Smooth transition for isNightMode uniform
  currentNightValue += (targetNightValue - currentNightValue) * transitionSpeed;
  uniforms.isNightMode.value = currentNightValue;

  resizeRendererToDisplaySize(renderer);

  const canvas = renderer.domElement;
  uniforms.resolution.value.set(canvas.width, canvas.height);
  uniforms.time.value = time;

  renderer.render(scene, camera);

  requestAnimationFrame(render);
}

requestAnimationFrame(render);

window.addEventListener('resize', function() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  uniforms.resolution.value.set(window.innerWidth, window.innerHeight);
  // Re-evaluate main container display on resize if a sub-view is active
  if (portfolioView.style.display === 'flex' || (dynamicViewContainer && dynamicViewContainer.style.display === 'flex')) {
    if (mainContainer) {
        if (window.innerWidth < 768) {
            mainContainer.style.display = 'block';
        } else {
            mainContainer.style.display = 'grid';
        }
    }
  }
});

const modeToggle = document.getElementById('mode-toggle');
let isNightMode = false;

modeToggle.addEventListener('click', function() {
  isNightMode = !isNightMode;
  targetNightValue = isNightMode ? 1 : 0;
  modeToggle.classList.toggle('night');
  modeToggle.classList.add('switching');
  setTimeout(() => {
    modeToggle.classList.remove('switching');
  }, 500);
  document.body.style.backgroundColor = isNightMode ? '#1a1a2e' : '#f0e6d2';
  document.body.classList.toggle('night-mode', isNightMode);
});

// Initial data load
document.addEventListener('DOMContentLoaded', loadProfileData);

// Portfolio View Logic
const mainContainer = document.getElementById('main-container');
const mainContent = document.getElementById('main-content');
const profileSection = document.querySelector('.profile-section'); 
const viewPortfolioBtn = document.getElementById('viewPortfolioBtn');
const portfolioView = document.getElementById('portfolio-view');
const portfolioBackBtn = document.getElementById('portfolio-back-btn');
const dynamicViewContainer = document.getElementById('dynamic-view-container'); // Updated variable name
const blogBtn = document.getElementById('blogBtn');
const contactMeBtn = document.getElementById('contactMeBtn');
const creationsBtn = document.getElementById('creationsBtn');

viewPortfolioBtn.addEventListener('click', (event) => {
  event.preventDefault();
  if (mainContent) mainContent.style.display = 'none';
  if (profileSection) profileSection.style.display = 'none';
  if (dynamicViewContainer) dynamicViewContainer.style.display = 'none'; // Hide dynamic view if it was open
  
  portfolioView.style.display = 'flex'; 

  if (mainContainer) {
    if (window.innerWidth < 768) {
        mainContainer.style.display = 'block'; 
    } else {
        mainContainer.style.display = 'grid';
    }
  }
});

portfolioBackBtn.addEventListener('click', () => {
  portfolioView.style.display = 'none';
  if (mainContent) mainContent.style.display = ''; 
  if (profileSection) profileSection.style.display = '';
  
  if (mainContainer) {
    if (window.innerWidth < 768) {
        mainContainer.style.display = 'block'; 
    } else {
        mainContainer.style.display = 'grid';
    }
  }
});

contactMeBtn.addEventListener('click', async (event) => {
    event.preventDefault();
    const DYNAMIC_VIEW_ID = 'dynamic-view-container';
    const MAIN_CONTAINER_ID = 'main-container';

    if (mainContent) mainContent.style.display = 'none';
    if (profileSection) profileSection.style.display = 'none';
    if (portfolioView) portfolioView.style.display = 'none';

    try {
        const response = await fetch('contact-view.html');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const htmlContent = await response.text();
        if (dynamicViewContainer) {
            dynamicViewContainer.innerHTML = htmlContent;
            dynamicViewContainer.style.display = 'flex';
            if (mainContainer) {
                if (window.innerWidth < 768) {
                    mainContainer.style.display = 'block';
                } else {
                    mainContainer.style.display = 'grid';
                }
            }
            initContactView(DYNAMIC_VIEW_ID, MAIN_CONTAINER_ID);
        }
    } catch (error) {
        console.error('Error loading contact content:', error);
        if (dynamicViewContainer) {
            dynamicViewContainer.innerHTML = '<p style="text-align:center; padding: 20px;">Sorry, couldn\'t load this section.</p>';
            dynamicViewContainer.style.display = 'flex';
            const errorBackButton = document.createElement('button');
            errorBackButton.textContent = 'Go Back';
            errorBackButton.className = 'back-btn';
            errorBackButton.style.alignSelf = 'center';
            errorBackButton.style.marginTop = '20px';
            errorBackButton.onclick = () => {
                dynamicViewContainer.style.display = 'none';
                dynamicViewContainer.innerHTML = '';
                if (mainContent) mainContent.style.display = '';
                if (profileSection) profileSection.style.display = '';
            };
            dynamicViewContainer.appendChild(errorBackButton);
        }
    }
});

creationsBtn.addEventListener('click', async (event) => {
  event.preventDefault();
  const DYNAMIC_VIEW_ID = 'dynamic-view-container';
  const MAIN_CONTAINER_ID = 'main-container';

  if (mainContent) mainContent.style.display = 'none';
  if (profileSection) profileSection.style.display = 'none';
  if (portfolioView) portfolioView.style.display = 'none';

  try {
    const response = await fetch('creations-view.html');
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    
    const htmlContent = await response.text();
    if (dynamicViewContainer) {
      dynamicViewContainer.innerHTML = htmlContent;
      dynamicViewContainer.style.display = 'flex';

      if (mainContainer) {
        if (window.innerWidth < 768) {
          mainContainer.style.display = 'block';
        } else {
          mainContainer.style.display = 'grid';
        }
      }
      initCreationsView(DYNAMIC_VIEW_ID, MAIN_CONTAINER_ID);
    }
  } catch (error) {
    console.error('Error loading Creations Corner content:', error);
    if (dynamicViewContainer) {
        dynamicViewContainer.innerHTML = '<p style="text-align:center; padding: 20px;">Sorry, couldn\'t load this section. Please try again later.</p>';
        dynamicViewContainer.style.display = 'flex';
        const errorBackButton = document.createElement('button');
        errorBackButton.textContent = 'Go Back';
        errorBackButton.className = 'back-btn';
        errorBackButton.style.alignSelf = 'center';
        errorBackButton.style.marginTop = '20px';
        errorBackButton.onclick = () => {
            dynamicViewContainer.style.display = 'none';
            dynamicViewContainer.innerHTML = '';
            if (mainContent) mainContent.style.display = '';
            if (profileSection) profileSection.style.display = '';
        };
        dynamicViewContainer.appendChild(errorBackButton);
    }
  }
});

blogBtn.addEventListener('click', async (event) => {
  event.preventDefault();
  const DYNAMIC_VIEW_ID = 'dynamic-view-container';
  const MAIN_CONTAINER_ID = 'main-container';

  if (mainContent) mainContent.style.display = 'none';
  if (profileSection) profileSection.style.display = 'none';
  if (portfolioView) portfolioView.style.display = 'none';

  try {
    const response = await fetch('blogs-view.html');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const htmlContent = await response.text();
    if (dynamicViewContainer) {
      dynamicViewContainer.innerHTML = htmlContent;
      dynamicViewContainer.style.display = 'flex';

      if (mainContainer) {
        if (window.innerWidth < 768) {
          mainContainer.style.display = 'block';
        } else {
          mainContainer.style.display = 'grid';
        }
      }
      initBlogsView(DYNAMIC_VIEW_ID, 'portfolio-view', MAIN_CONTAINER_ID);
    }
  } catch (error) {
    console.error('Error loading blogs content:', error);
    if (dynamicViewContainer) {
        dynamicViewContainer.innerHTML = '<p style="text-align:center; padding: 20px;">Sorry, couldn\'t load this section. Please try again later.</p>';
        dynamicViewContainer.style.display = 'flex';
        const errorBackButton = document.createElement('button');
        errorBackButton.textContent = 'Go Back';
        errorBackButton.className = 'back-btn';
        errorBackButton.style.alignSelf = 'center';
        errorBackButton.style.marginTop = '20px';
        errorBackButton.onclick = () => {
            dynamicViewContainer.style.display = 'none';
            dynamicViewContainer.innerHTML = '';
            if (mainContent) mainContent.style.display = '';
            if (profileSection) profileSection.style.display = '';
        };
        dynamicViewContainer.appendChild(errorBackButton);
    }
  }
});

// Handle clicks on portfolio cards
const portfolioCards = document.querySelectorAll('.portfolio-card');
portfolioCards.forEach(card => {
  card.addEventListener('click', async () => {
    const section = card.dataset.section;
    const DYNAMIC_VIEW_ID = 'dynamic-view-container';
    const PORTFOLIO_VIEW_ID = 'portfolio-view';
    const MAIN_CONTAINER_ID = 'main-container';

    if (section === 'personal-info') {
      if (portfolioView) portfolioView.style.display = 'none';
      
      try {
        const response = await fetch('personal-info-view.html');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const htmlContent = await response.text();
        if (dynamicViewContainer) {
          dynamicViewContainer.innerHTML = htmlContent;
          dynamicViewContainer.style.display = 'flex'; 
          
          if (mainContainer) {
             if (window.innerWidth < 768) {
                mainContainer.style.display = 'block'; 
            } else {
                mainContainer.style.display = 'grid';
            }
          }
          // Initialize the dynamic content and event listeners for the personal info view
          initPersonalInfoView(DYNAMIC_VIEW_ID, PORTFOLIO_VIEW_ID, MAIN_CONTAINER_ID);
        }
      } catch (error) {
        console.error('Error loading personal info content:', error);
        if (dynamicViewContainer) {
            dynamicViewContainer.innerHTML = '<p style="text-align:center; padding: 20px;">Sorry, couldn\'t load this section. Please try again later.</p>';
            dynamicViewContainer.style.display = 'flex';
             // Add a simple back button in case of error
            const errorBackButton = document.createElement('button');
            errorBackButton.textContent = 'Go Back';
            errorBackButton.className = 'back-btn'; // Use existing styling
            errorBackButton.style.alignSelf = 'center';
            errorBackButton.style.marginTop = '20px';
            errorBackButton.onclick = () => {
                dynamicViewContainer.style.display = 'none';
                dynamicViewContainer.innerHTML = '';
                if (portfolioView) portfolioView.style.display = 'flex';
            };
            dynamicViewContainer.appendChild(errorBackButton);
        }
      }
    } else if (section === 'education') {
      if (portfolioView) portfolioView.style.display = 'none';

      try {
        const response = await fetch('education-view.html');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const htmlContent = await response.text();
        if (dynamicViewContainer) {
          dynamicViewContainer.innerHTML = htmlContent;
          dynamicViewContainer.style.display = 'flex';

          if (mainContainer) {
            if (window.innerWidth < 768) {
              mainContainer.style.display = 'block';
            } else {
              mainContainer.style.display = 'grid';
            }
          }
          initEducationView(DYNAMIC_VIEW_ID, PORTFOLIO_VIEW_ID, MAIN_CONTAINER_ID);
        }
      } catch (error) {
        console.error('Error loading education content:', error);
         if (dynamicViewContainer) {
            dynamicViewContainer.innerHTML = '<p style="text-align:center; padding: 20px;">Sorry, couldn\'t load this section. Please try again later.</p>';
            dynamicViewContainer.style.display = 'flex';
            const errorBackButton = document.createElement('button');
            errorBackButton.textContent = 'Go Back';
            errorBackButton.className = 'back-btn';
            errorBackButton.style.alignSelf = 'center';
            errorBackButton.style.marginTop = '20px';
            errorBackButton.onclick = () => {
                dynamicViewContainer.style.display = 'none';
                dynamicViewContainer.innerHTML = '';
                if (portfolioView) portfolioView.style.display = 'flex';
            };
            dynamicViewContainer.appendChild(errorBackButton);
        }
      }
    } else if (section === 'skills') { // Added Skills section
      if (portfolioView) portfolioView.style.display = 'none';

      try {
        const response = await fetch('skills-view.html');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const htmlContent = await response.text();
        if (dynamicViewContainer) {
          dynamicViewContainer.innerHTML = htmlContent;
          dynamicViewContainer.style.display = 'flex';

          if (mainContainer) {
            if (window.innerWidth < 768) {
              mainContainer.style.display = 'block';
            } else {
              mainContainer.style.display = 'grid';
            }
          }
          initSkillsView(DYNAMIC_VIEW_ID, PORTFOLIO_VIEW_ID, MAIN_CONTAINER_ID);
        }
      } catch (error) {
        console.error('Error loading skills content:', error);
         if (dynamicViewContainer) {
            dynamicViewContainer.innerHTML = '<p style="text-align:center; padding: 20px;">Sorry, couldn\'t load this section. Please try again later.</p>';
            dynamicViewContainer.style.display = 'flex';
            const errorBackButton = document.createElement('button');
            errorBackButton.textContent = 'Go Back';
            errorBackButton.className = 'back-btn';
            errorBackButton.style.alignSelf = 'center';
            errorBackButton.style.marginTop = '20px';
            errorBackButton.onclick = () => {
                dynamicViewContainer.style.display = 'none';
                dynamicViewContainer.innerHTML = '';
                if (portfolioView) portfolioView.style.display = 'flex';
            };
            dynamicViewContainer.appendChild(errorBackButton);
        }
      }
    } else if (section === 'projects') { // Added Projects section
      if (portfolioView) portfolioView.style.display = 'none';

      try {
        const response = await fetch('projects-view.html');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const htmlContent = await response.text();
        if (dynamicViewContainer) {
          dynamicViewContainer.innerHTML = htmlContent;
          dynamicViewContainer.style.display = 'flex';

          if (mainContainer) {
            if (window.innerWidth < 768) {
              mainContainer.style.display = 'block';
            } else {
              mainContainer.style.display = 'grid';
            }
          }
          initProjectsView(DYNAMIC_VIEW_ID, PORTFOLIO_VIEW_ID, MAIN_CONTAINER_ID);
        }
      } catch (error) {
        console.error('Error loading projects content:', error);
         if (dynamicViewContainer) {
            dynamicViewContainer.innerHTML = '<p style="text-align:center; padding: 20px;">Sorry, couldn\'t load this section. Please try again later.</p>';
            dynamicViewContainer.style.display = 'flex';
            const errorBackButton = document.createElement('button');
            errorBackButton.textContent = 'Go Back';
            errorBackButton.className = 'back-btn';
            errorBackButton.style.alignSelf = 'center';
            errorBackButton.style.marginTop = '20px';
            errorBackButton.onclick = () => {
                dynamicViewContainer.style.display = 'none';
                dynamicViewContainer.innerHTML = '';
                if (portfolioView) portfolioView.style.display = 'flex';
            };
            dynamicViewContainer.appendChild(errorBackButton);
        }
      }
    } else if (section === 'achievements') { // Added Achievements section
      if (portfolioView) portfolioView.style.display = 'none';

      try {
        const response = await fetch('achievements-view.html');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const htmlContent = await response.text();
        if (dynamicViewContainer) {
          dynamicViewContainer.innerHTML = htmlContent;
          dynamicViewContainer.style.display = 'flex';

          if (mainContainer) {
            if (window.innerWidth < 768) {
              mainContainer.style.display = 'block';
            } else {
              mainContainer.style.display = 'grid';
            }
          }
          initAchievementsView(DYNAMIC_VIEW_ID, PORTFOLIO_VIEW_ID, MAIN_CONTAINER_ID);
        }
      } catch (error) {
        console.error('Error loading achievements content:', error);
         if (dynamicViewContainer) {
            dynamicViewContainer.innerHTML = '<p style="text-align:center; padding: 20px;">Sorry, couldn\'t load this section. Please try again later.</p>';
            dynamicViewContainer.style.display = 'flex';
            const errorBackButton = document.createElement('button');
            errorBackButton.textContent = 'Go Back';
            errorBackButton.className = 'back-btn';
            errorBackButton.style.alignSelf = 'center';
            errorBackButton.style.marginTop = '20px';
            errorBackButton.onclick = () => {
                dynamicViewContainer.style.display = 'none';
                dynamicViewContainer.innerHTML = '';
                if (portfolioView) portfolioView.style.display = 'flex';
            };
            dynamicViewContainer.appendChild(errorBackButton);
        }
      }
    } else if (section === 'experience') { // Added Experience section
        if (portfolioView) portfolioView.style.display = 'none';

        try {
            const response = await fetch('experience-view.html');
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            
            const htmlContent = await response.text();
            if (dynamicViewContainer) {
                dynamicViewContainer.innerHTML = htmlContent;
                dynamicViewContainer.style.display = 'flex';
                initExperienceView(DYNAMIC_VIEW_ID, PORTFOLIO_VIEW_ID, MAIN_CONTAINER_ID);
            }
        } catch (error) {
            console.error('Error loading experience content:', error);
            if (dynamicViewContainer) {
                dynamicViewContainer.innerHTML = '<p style="text-align:center; padding: 20px;">Sorry, couldn\'t load this section.</p>';
                dynamicViewContainer.style.display = 'flex';
                const errorBackButton = document.createElement('button');
                errorBackButton.textContent = 'Go Back';
                errorBackButton.className = 'back-btn';
                errorBackButton.style.alignSelf = 'center';
                errorBackButton.style.marginTop = '20px';
                errorBackButton.onclick = () => {
                    dynamicViewContainer.style.display = 'none';
                    dynamicViewContainer.innerHTML = '';
                    if (portfolioView) portfolioView.style.display = 'flex';
                };
                dynamicViewContainer.appendChild(errorBackButton);
            }
        }
    } else {
      // Placeholder for other sections
      const sectionTitle = card.querySelector('h3').textContent;
      alert(`The "${sectionTitle}" section is currently under development. Please check back later!`);
    }
  });
});