// education.js

export async function initEducationView(containerId, portfolioViewId, mainContainerId) {
  const dynamicViewContainer = document.getElementById(containerId);
  const portfolioView = document.getElementById(portfolioViewId);
  const mainContainer = document.getElementById(mainContainerId);

  if (!dynamicViewContainer) {
    console.error('Dynamic view container not found for education');
    return;
  }

  const educationListContainer = dynamicViewContainer.querySelector('#education-list-container');
  if (!educationListContainer) {
    console.error('Education list container not found within the loaded HTML for education view.');
    // Add a fallback or error message directly to dynamicViewContainer if needed
    dynamicViewContainer.innerHTML = '<p style="text-align:center; padding: 20px;">Error: Could not find where to display education items.</p>';
    return;
  }
  educationListContainer.innerHTML = ''; // Clear previous content

  try {
    const response = await fetch('https://raw.githubusercontent.com/AlahiMajnurOsama/portfolio/refs/heads/main/json/data.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const educationData = data.education;

    if (!educationData || !Array.isArray(educationData)) {
        throw new Error('Education data not found or not in expected format in data.json');
    }

    if (educationData.length === 0) {
        educationListContainer.innerHTML = '<p class="no-education-data">No education information available.</p>';
    } else {
        educationData.forEach(edu => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'education-item info-item'; // Reuse info-item style

            const institutionLabel = document.createElement('span');
            institutionLabel.className = 'info-label';
            institutionLabel.textContent = 'Institution:';
            
            const institutionValue = document.createElement('span');
            institutionValue.className = 'info-value';
            institutionValue.textContent = edu.institution || 'N/A';

            const sessionLabel = document.createElement('span');
            sessionLabel.className = 'info-label';
            sessionLabel.textContent = 'Session:';

            const sessionValue = document.createElement('span');
            sessionValue.className = 'info-value';
            sessionValue.textContent = edu.session || 'N/A';
            
            const detailsLabel = document.createElement('span');
            detailsLabel.className = 'info-label';
            detailsLabel.textContent = 'Details:';

            const detailsValue = document.createElement('span');
            detailsValue.className = 'info-value';
            detailsValue.textContent = edu.details || 'N/A';

            // For larger screens, labels and values are typically in a row.
            // For smaller screens, they are stacked. The CSS for .info-item handles this.
            // We'll create a structure that adapts.
            
            // Desktop structure: Label Value
            // Mobile structure: Label \n Value (achieved by flex-direction column)

            // Grouping for Institution
            const institutionGroup = document.createElement('div');
            institutionGroup.className = 'education-field-group'; // For potential specific styling
            institutionGroup.appendChild(institutionLabel);
            institutionGroup.appendChild(institutionValue);
            itemDiv.appendChild(institutionGroup);
            
            // Grouping for Session
            const sessionGroup = document.createElement('div');
            sessionGroup.className = 'education-field-group';
            sessionGroup.appendChild(sessionLabel);
            sessionGroup.appendChild(sessionValue);
            itemDiv.appendChild(sessionGroup);

            // Grouping for Details
            const detailsGroup = document.createElement('div');
            detailsGroup.className = 'education-field-group';
            detailsGroup.appendChild(detailsLabel);
            detailsGroup.appendChild(detailsValue);
            itemDiv.appendChild(detailsGroup);
            
            educationListContainer.appendChild(itemDiv);
        });
    }

  } catch (error) {
    console.error('Failed to load or process education data:', error);
    educationListContainer.innerHTML = `<p style="text-align:center; padding: 20px;">Could not load education information. ${error.message}</p>`;
    // Error handling for the whole view could be more robust if the back button itself fails to load
    const errorBackButton = dynamicViewContainer.querySelector('#education-back-btn');
    if (!errorBackButton) { // If the main content load failed, the button might not be there
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
        // Prepend to make sure it's visible
        dynamicViewContainer.insertBefore(tempBackButton, dynamicViewContainer.firstChild);
    }
    return;
  }

  const backButton = dynamicViewContainer.querySelector('#education-back-btn');
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
      console.warn("Education back button not found after loading view.");
  }
}