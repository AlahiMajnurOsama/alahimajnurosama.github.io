// experience.js

async function fetchExperience() {
    try {
        const response = await fetch('/json/experience.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Could not fetch experience data:", error);
        return [];
    }
}

export async function initExperienceView(containerId, portfolioViewId, mainContainerId) {
    const dynamicViewContainer = document.getElementById(containerId);
    if (!dynamicViewContainer) return;

    const experienceListContainer = dynamicViewContainer.querySelector('#experience-list-container');
    if (!experienceListContainer) {
        dynamicViewContainer.innerHTML = '<p>Error: Experience list container not found.</p>';
        return;
    }

    const experienceData = await fetchExperience();

    if (experienceData.length === 0) {
        experienceListContainer.innerHTML = '<p class="no-experience-data">No experience information available at the moment.</p>';
    } else {
        experienceListContainer.innerHTML = ''; // Clear
        experienceData.forEach(exp => {
            const item = document.createElement('div');
            item.className = 'experience-item';
            item.dataset.experienceId = exp.id;

            const detailsList = exp.details.map(detail => `<li>${detail}</li>`).join('');

            item.innerHTML = `
                <div class="experience-header">
                    <div class="experience-info">
                        <h3 class="experience-role">${exp.role}</h3>
                        <p class="experience-company">${exp.company} &bull; ${exp.location}</p>
                        <p class="experience-duration">${exp.duration}</p>
                    </div>
                    <i class="fas fa-chevron-down expand-icon"></i>
                </div>
                <div class="experience-details">
                    <ul>
                        ${detailsList}
                    </ul>
                </div>
            `;
            experienceListContainer.appendChild(item);

            const header = item.querySelector('.experience-header');
            header.addEventListener('click', () => {
                item.classList.toggle('expanded');
                const details = item.querySelector('.experience-details');
                if (item.classList.contains('expanded')) {
                    details.style.maxHeight = details.scrollHeight + "px";
                } else {
                    details.style.maxHeight = null;
                }
            });
        });
    }

    // Back button to portfolio
    const backButton = dynamicViewContainer.querySelector('#experience-back-btn');
    backButton.addEventListener('click', () => {
        dynamicViewContainer.style.display = 'none';
        dynamicViewContainer.innerHTML = '';
        const portfolioView = document.getElementById(portfolioViewId);
        if (portfolioView) portfolioView.style.display = 'flex';
    });
}

