// personal-info.js

// Helper function to format date if needed, e.g., from "YYYY-MM-DD" to "DD Mon YYYY"
function formatDate(dateString) {
  const [year, month, day] = dateString.split('-');
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

function calculateAge(birthDateString) {
  // Assuming birthDateString is "YYYY-MM-DD"
  const birthDate = new Date(birthDateString);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();
  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

function showCopyNotification() {
    const notification = document.getElementById('copy-notification');
    if (notification) {
        notification.style.display = 'block';
        // Ensure it's visible if it was hidden due to another notification still fading out.
        notification.style.opacity = '1'; 
        setTimeout(() => {
            // Fade out effect
            notification.style.opacity = '0';
            setTimeout(() => {
                notification.style.display = 'none';
            }, 300); // Wait for fade out to complete
        }, 1500); // Notification visible for 1.5s
    }
}

export async function initPersonalInfoView(containerId, portfolioViewId, mainContainerId) {
  const dynamicViewContainer = document.getElementById(containerId);
  const portfolioView = document.getElementById(portfolioViewId);
  const mainContainer = document.getElementById(mainContainerId);

  if (!dynamicViewContainer) {
    console.error('Dynamic view container not found for personal info');
    return;
  }

  try {
    const response = await fetch('/json/data.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const personalInfo = data.personalInfo;

    if (!personalInfo) {
        throw new Error('Personal info data not found in data.json');
    }

    // Populate personal information
    const nameEl = dynamicViewContainer.querySelector('#pi-name');
    if (nameEl) nameEl.textContent = personalInfo.name || 'N/A';
    
    const ageEl = dynamicViewContainer.querySelector('#pi-age');
    if (ageEl && personalInfo.dob) {
      ageEl.textContent = calculateAge(personalInfo.dob);
    } else if (ageEl) {
      ageEl.textContent = 'N/A';
    }
    
    const dobEl = dynamicViewContainer.querySelector('#pi-dob');
    if (dobEl && personalInfo.dob) {
      dobEl.textContent = formatDate(personalInfo.dob); // Or format for display
    } else if (dobEl) {
      dobEl.textContent = 'N/A';
    }

    const bloodEl = dynamicViewContainer.querySelector('#pi-blood');
    if (bloodEl) bloodEl.textContent = personalInfo.bloodGroup || 'N/A';

    const nationalityEl = dynamicViewContainer.querySelector('#pi-nationality');
    if (nationalityEl) nationalityEl.textContent = personalInfo.nationality || 'N/A';

    const occupationEl = dynamicViewContainer.querySelector('#pi-occupation');
    if (occupationEl) occupationEl.textContent = personalInfo.occupation || 'N/A';

    const statusEl = dynamicViewContainer.querySelector('#pi-status');
    if (statusEl) statusEl.textContent = personalInfo.status || 'N/A';

    const hobbyEl = dynamicViewContainer.querySelector('#pi-hobby');
    if (hobbyEl) hobbyEl.textContent = personalInfo.hobby || 'N/A';

    const aimEl = dynamicViewContainer.querySelector('#pi-aim');
    if (aimEl) aimEl.textContent = personalInfo.aimInLife || 'N/A';

  } catch (error) {
    console.error('Failed to load or process personal info data:', error);
    dynamicViewContainer.innerHTML = `<div class="personal-info-content"><p style="text-align:center; padding: 20px;">Could not load personal information. ${error.message}</p></div>`;
    const errorBackButton = document.createElement('button');
    errorBackButton.textContent = 'Go Back to Portfolio';
    errorBackButton.className = 'back-btn';
    errorBackButton.style.alignSelf = 'center';
    errorBackButton.style.display = 'block';
    errorBackButton.style.margin = '20px auto';
    errorBackButton.onclick = () => {
        dynamicViewContainer.style.display = 'none';
        dynamicViewContainer.innerHTML = '';
        if (portfolioView) portfolioView.style.display = 'flex';
    };
    dynamicViewContainer.querySelector('.personal-info-content').appendChild(errorBackButton);
    return; 
  }

  // Attach event listeners for copy buttons
  const copyButtons = dynamicViewContainer.querySelectorAll('.copy-btn');
  copyButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent card click if any
      const targetId = button.dataset.target;
      const textElement = dynamicViewContainer.querySelector(`#${targetId}`);
      if (textElement) {
        const textToCopy = textElement.textContent;
        navigator.clipboard.writeText(textToCopy).then(() => {
          showCopyNotification();
        }).catch(err => {
          console.error('Failed to copy text: ', err);
          try {
            const textArea = document.createElement("textarea");
            textArea.value = textToCopy;
            textArea.style.position = "fixed"; // Prevent scrolling to bottom
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            showCopyNotification();
          } catch (execErr) {
            console.error('Fallback copy failed:', execErr);
            alert('Failed to copy text.');
          }
        });
      }
    });
  });

  // Attach event listener for the back button
  const backButton = dynamicViewContainer.querySelector('#personal-info-back-btn');
  if (backButton) {
    backButton.addEventListener('click', () => {
      dynamicViewContainer.style.display = 'none';
      dynamicViewContainer.innerHTML = ''; // Clear content after hiding

      if (portfolioView) {
        portfolioView.style.display = 'flex'; // Show portfolio view again
      }
      
      // Ensure main container maintains correct display style
      if (mainContainer) {
        if (window.innerWidth < 768) {
            mainContainer.style.display = 'block'; 
        } else {
            mainContainer.style.display = 'grid';
        }
      }
    });
  }
}