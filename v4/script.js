// Portfolio Modal Functions
function showPortfolio() {
  const overlay = document.createElement('div');
  overlay.className = 'portfolio-overlay';
  
  overlay.innerHTML = `
    <div class="portfolio-container">
      <button class="back-button">
        <i class="fas fa-arrow-left"></i> Back
      </button>
      <h2>My Skills & Experience</h2>
      <div class="portfolio-grid">
        <div class="portfolio-card" onclick="expandCard(this);">
          <div class="card-icon"><i class="fas fa-graduation-cap"></i></div>
          <h3>Education</h3>
          <p>BSc & MSc in Computer Science</p>
        </div>
        <div class="portfolio-card" onclick="expandCard(this);">
          <div class="card-icon"><i class="fas fa-briefcase"></i></div>
          <h3>Experience</h3>
          <p>5+ years Full Stack Development</p>
        </div>
        <div class="portfolio-card">
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
      <p>  
        <div class="portfolio-card" onclick="expandCard(this);">
          <div class="card-icon"><i class="fas fa-trophy"></i></div>
          <h3>Achievements</h3>
          <p>Certificates and Awards</p>
        </div> 
      <p>
        
      </div>
    </div>
  `;
  
  document.body.appendChild(overlay);
  requestAnimationFrame(() => overlay.classList.add('active'));

  const backBtn = overlay.querySelector('.back-button');
  backBtn.onclick = () => {
    overlay.classList.remove('active');
    setTimeout(() => overlay.remove(), 300);
  };
  
  const cards = overlay.querySelectorAll('.portfolio-card');
  cards.forEach(card => {
    card.onclick = () => expandCard(card);
  });
}

function expandCard(card) {
  const title = card.querySelector('h3').textContent;
  if (title === 'Education') {
    showEducationDetails();
  } else if (title === 'Experience') {
    showExperienceDetails();
  } else if (title === 'Tech Skills') {
    showTechSkills();
  } else if (title === 'Achievements') {
    showAchievements();
  }
}

function showExperienceDetails() {
  const detailsOverlay = document.createElement('div');
  detailsOverlay.className = 'portfolio-overlay details-overlay';
  
  detailsOverlay.innerHTML = `
    <div class="portfolio-container">
      <button class="back-button">
        <i class="fas fa-arrow-left"></i> Back
      </button>
      <h2>Experience Timeline</h2>
      <div class="experience-container">
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

  document.body.appendChild(detailsOverlay);
  requestAnimationFrame(() => detailsOverlay.classList.add('active'));

  const backBtn = detailsOverlay.querySelector('.back-button');
  backBtn.onclick = () => {
    detailsOverlay.classList.remove('active');
    setTimeout(() => detailsOverlay.remove(), 300);
  };
}

function showEducationDetails() {
  const eduOverlay = document.createElement('div');
  eduOverlay.className = 'portfolio-overlay education-overlay';
  
  eduOverlay.innerHTML = `
    <div class="portfolio-container education-container">
      <button class="back-button">
        <i class="fas fa-arrow-left"></i> Back
      </button>
      <h2>Education Timeline</h2>
      <div class="education-grid">
        <div class="education-card" data-edu="university">
          <div class="card-icon"><i class="fas fa-university"></i></div>
          <h3>University</h3>
          <p>BGC Trust University Bangladesh</p>
        </div>
        <div class="education-card" data-edu="hsc">
          <div class="card-icon"><i class="fas fa-school"></i></div>
          <h3>Higher Secondary</h3>
          <p>Al Haz Mostofa Hakim Degree College</p>
        </div>
        <div class="education-card" data-edu="ssc">
          <div class="card-icon"><i class="fas fa-graduation-cap"></i></div>
          <h3>Secondary School</h3>
          <p>Safa Motaleb High School</p>
        </div>
        <div class="education-card" data-edu="jsc">
          <div class="card-icon"><i class="fas fa-book"></i></div>
          <h3>Junior School</h3>
          <p>Govt. Muslim High School</p>
        </div>
        <div class="education-card" data-edu="psc">
          <div class="card-icon"><i class="fas fa-child"></i></div>
          <h3>Primary School</h3>
          <p>Firingee Bazar Govt. School</p>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(eduOverlay);
  requestAnimationFrame(() => eduOverlay.classList.add('active'));

  const backBtn = eduOverlay.querySelector('.back-button');
  backBtn.onclick = () => {
    eduOverlay.classList.remove('active');
    setTimeout(() => eduOverlay.remove(), 300);
  };

  const eduCards = eduOverlay.querySelectorAll('.education-card');
  eduCards.forEach(card => {
    card.onclick = () => showEduDetails(card.dataset.edu);
  });
}

function showEduDetails(eduType) {
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
  const detailsOverlay = document.createElement('div');
  detailsOverlay.className = 'portfolio-overlay details-overlay';
  
  detailsOverlay.innerHTML = `
    <div class="portfolio-container details-container">
      <button class="back-button">
        <i class="fas fa-arrow-left"></i> Back
      </button>
      <div class="edu-details">
        <h2>${data.title}</h2>
        <div class="edu-info">
          <h3>${data.school}</h3>
          <p class="period">${data.period}</p>
          <p class="details">${data.details}</p>
          <p class="gpa">${data.gpa}</p>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(detailsOverlay);
  requestAnimationFrame(() => detailsOverlay.classList.add('active'));

  const backBtn = detailsOverlay.querySelector('.back-button');
  backBtn.onclick = () => {
    detailsOverlay.classList.remove('active');
    setTimeout(() => detailsOverlay.remove(), 300);
  };
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

  currentNightValue += (targetNightValue - currentNightValue) * transitionSpeed;
  uniforms.isNightMode.value = currentNightValue;

  resizeRendererToDisplaySize(renderer);

  const canvas = renderer.domElement;
  uniforms.resolution.value.set(canvas.width, canvas.height);
  uniforms.time.value = time;

  renderer.render(scene, camera);

  requestAnimationFrame(render);
}

const skillCategories = {
  development: {
    name: "Development",
    icon: "fas fa-code",
    percent: 80,
    skills: ["HTML", "CSS", "JavaScript", "Python", "C++", "GitHub", "Responsive Design"]
  },
  softSkills: {
    name: "Soft Skills & Ethics",
    icon: "fas fa-handshake",
    percent: 85,
    skills: [
      {skill: "Creativity", percent: 93},
      {skill: "Communication", percent: 82},
      {skill: "Team Management", percent: 80},
      {skill: "Time Management", percent: 85},
      {skill: "Problem Solving", percent: 80},
      {skill: "Leadership", percent: 88},
      {skill: "Team Work", percent: 81},
      {skill: "Quick Learner", percent: 78}
    ]
  },
  cybersecurity: {
    name: "Cyber Security",
    icon: "fas fa-shield-alt", 
    percent: 80,
    skills: ["Penetration Testing", "Network Security", "Cryptography", "Wireshark", "Metasploit", "Nmap", "Threat Analysis", "OSINT", "Ethical Hacking", "Vulnerability Scanning", "Malware Analysis"]
  },
  systemAdmin: {
    name: "System Administration",
    icon: "fas fa-server",
    percent: 70,
    skills: ["Linux", "Virtualization", "Containerization", "Docker", "PowerShell", "Bash", "SSH"]
  },
  cloudComputing: {
    name: "Cloud & DevOps",
    icon: "fas fa-cloud",
    percent: 75,
    skills: ["AWS", "Azure Security", "Cloud Security", "Netlify", "Vercel"]
  },
  design: {
    name: "Design & Branding",
    icon: "fas fa-paint-brush",
    percent: 90,
    skills: ["UI Design", "UX Design", "WordPress", "Branding"]
  },
  aiAndResearch: {
    name: "AI & Research",
    icon: "fas fa-brain",
    percent: 75,
    skills: ["AI in Security", "Machine Learning", "Research Writing", "Security Tool Development"]
  },
  networkSecurity: {
    name: "Network & Infrastructure",
    icon: "fas fa-network-wired",
    percent: 85,
    skills: ["Advanced Networking", "Firewalls", "VPNs", "SSL/TLS", "Security Awareness"]
  }
};

function showTechSkills() {
  const detailsOverlay = document.createElement('div');
  detailsOverlay.className = 'portfolio-overlay details-overlay';
  
  detailsOverlay.innerHTML = `
    <div class="portfolio-container">
      <button class="back-button">
        <i class="fas fa-arrow-left"></i> Back
      </button>
      <h2>Technical Proficiency</h2>
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

  document.body.appendChild(detailsOverlay);
  requestAnimationFrame(() => detailsOverlay.classList.add('active'));

  const backBtn = detailsOverlay.querySelector('.back-button');
  backBtn.onclick = () => {
    detailsOverlay.classList.remove('active');
    setTimeout(() => detailsOverlay.remove(), 300);
  };
}

function showCategoryDetails(categoryName) {
  const category = Object.values(skillCategories).find(cat => cat.name === categoryName);
  
  const detailsOverlay = document.createElement('div');
  detailsOverlay.className = 'portfolio-overlay category-details-overlay';
  
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

  detailsOverlay.innerHTML = `
    <div class="portfolio-container">
      <button class="back-button">
        <i class="fas fa-arrow-left"></i> Back
      </button>
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

  document.body.appendChild(detailsOverlay);
  requestAnimationFrame(() => detailsOverlay.classList.add('active'));

  const backBtn = detailsOverlay.querySelector('.back-button');
  backBtn.onclick = () => {
    detailsOverlay.classList.remove('active');
    setTimeout(() => detailsOverlay.remove(), 300);
  };
}

function showAchievements() {
  const achievementsOverlay = document.createElement('div');
  achievementsOverlay.className = 'portfolio-overlay achievements-overlay';
  
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

  achievementsOverlay.innerHTML = `
    <div class="portfolio-container">
      <button class="back-button">
        <i class="fas fa-arrow-left"></i> Back
      </button>
      <h2>Achievements</h2>
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

  document.body.appendChild(achievementsOverlay);
  requestAnimationFrame(() => achievementsOverlay.classList.add('active'));

  const backBtn = achievementsOverlay.querySelector('.back-button');
  backBtn.onclick = () => {
    achievementsOverlay.classList.remove('active');
    setTimeout(() => achievementsOverlay.remove(), 300);
  };
}

document.addEventListener('DOMContentLoaded', function() {
  const infoToggle = document.getElementById('info-toggle');
  const infoPanel = document.getElementById('info-panel');
  const closeInfo = document.getElementById('close-info');
  
  infoToggle.addEventListener('click', function() {
    infoPanel.style.display = 'block';
  });

  closeInfo.addEventListener('click', function() {
    infoPanel.style.display = 'none';
  });

  window.addEventListener('click', function(event) {
    if (!infoPanel.contains(event.target) && event.target !== infoToggle) {
      infoPanel.style.display = 'none';
    }
  });
});

class Typewriter {
  constructor(el, texts, delay = 80, pauseDuration = 1000) {
    this.el = el;
    this.texts = texts;
    this.currentText = '';
    this.textIndex = 0;
    this.charIndex = 0;
    this.delay = delay;
    this.pauseDuration = pauseDuration;
    this.typing();
  }

  typing() {
    if (this.charIndex < this.texts[this.textIndex].length) {
      this.currentText += this.texts[this.textIndex].charAt(this.charIndex);
      this.el.innerHTML = this.currentText;
      this.charIndex++;
      setTimeout(() => this.typing(), this.delay);
    } else {
      setTimeout(() => this.erasing(), this.pauseDuration);
    }
  }

  erasing() {
    if (this.charIndex > 0) {
      this.currentText = this.currentText.slice(0, -1);
      this.el.innerHTML = this.currentText;
      this.charIndex--;
      setTimeout(() => this.erasing(), this.delay);
    } else {
      this.textIndex = (this.textIndex + 1) % this.texts.length; 
      setTimeout(() => this.typing(), this.pauseDuration);
    }
  }
}

const texts = [
  'Assalamualaikum, I\'m Alahi Majnur Osama.',
  'Currently Studying BSC in CSE....',
  'A Cyber Security Researcher......', 
  'A Student & A Explorer......'
];

const el = document.querySelector('.animated-text');
new Typewriter(el, texts);

requestAnimationFrame(render);

window.addEventListener('resize', function() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  uniforms.resolution.value.set(window.innerWidth, window.innerHeight);
});

const modeToggle = document.getElementById('mode-toggle');
const modeLabel = document.getElementById('mode-label');
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