// skills.js

export async function initSkillsView(containerId, portfolioViewId, mainContainerId) {
  const dynamicViewContainer = document.getElementById(containerId);
  const portfolioView = document.getElementById(portfolioViewId);
  const mainContainer = document.getElementById(mainContainerId);

  if (!dynamicViewContainer) {
    console.error('Dynamic view container not found for skills');
    return;
  }

  const skillsListContainer = dynamicViewContainer.querySelector('#skills-list-container');
  if (!skillsListContainer) {
    console.error('Skills list container not found within the loaded HTML for skills view.');
    dynamicViewContainer.innerHTML = '<p style="text-align:center; padding: 20px;">Error: Could not find where to display skills.</p>';
    return;
  }
  skillsListContainer.innerHTML = ''; // Clear previous content

  try {
    const response = await fetch('/json/data.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const skillsData = data.skills;

    if (!skillsData || !Array.isArray(skillsData)) {
        throw new Error('Skills data not found or not in expected format in data.json');
    }

    if (skillsData.length === 0) {
        skillsListContainer.innerHTML = '<p class="no-skills-data">No skills information available.</p>';
    } else {
        skillsData.forEach(skillText => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'skill-item info-item'; 

            const skillValue = document.createElement('span');
            skillValue.className = 'info-value'; 
            skillValue.textContent = skillText;
            
            itemDiv.appendChild(skillValue);
            skillsListContainer.appendChild(itemDiv);
        });
    }

  } catch (error) {
    console.error('Failed to load or process skills data:', error);
    skillsListContainer.innerHTML = `<p style="text-align:center; padding: 20px;">Could not load skills information. ${error.message}</p>`;
    const errorBackButton = dynamicViewContainer.querySelector('#skills-back-btn');
    if (!errorBackButton) { 
        const tempBackButton = document.createElement('button');
        tempBackButton.textContent = 'Go Back to Portfolio';
        tempBackButton.className = 'back-btn';
        tempBackButton.style.display = 'block';
        tempBackButton.style.margin = '20px auto';
        tempBackButton.onclick = () => {
            dynamicViewContainer.style.display = 'none';
            dynamicViewContainer.innerHTML = '';
            if (portfolioView) portfolioView.style.display = 'flex';
        };
        dynamicViewContainer.insertBefore(tempBackButton, dynamicViewContainer.firstChild);
    }
    return;
  }

  const backButton = dynamicViewContainer.querySelector('#skills-back-btn');
  if (backButton) {
    backButton.addEventListener('click', () => {
      dynamicViewContainer.style.display = 'none';
      dynamicViewContainer.innerHTML = ''; 

      if (portfolioView) {
        portfolioView.style.display = 'flex';
      }
      
      if (mainContainer) {
        if (window.innerWidth < 768) { 
            mainContainer.style.display = 'block'; 
        } else {
            mainContainer.style.display = 'grid';
        }
      }
    });
  } else {
      console.warn("Skills back button not found after loading view.");
  }
}