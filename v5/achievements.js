// achievements.js

async function fetchAchievements() {
    try {
        const response = await fetch('achievements.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Could not fetch achievements data:", error);
        return [];
    }
}

export async function initAchievementsView(containerId, portfolioViewId, mainContainerId) {
    const dynamicViewContainer = document.getElementById(containerId);
    if (!dynamicViewContainer) return;

    const achievementsListContainer = dynamicViewContainer.querySelector('#achievements-list-container');
    if (!achievementsListContainer) {
        dynamicViewContainer.innerHTML = '<p>Error: Achievements list container not found.</p>';
        return;
    }

    const achievements = await fetchAchievements();
    
    if (achievements.length === 0) {
        achievementsListContainer.innerHTML = '<p class="no-achievements-data">No achievements available at the moment.</p>';
    } else {
        achievementsListContainer.innerHTML = ''; // Clear
        achievements.forEach(achievement => {
            const card = document.createElement('div');
            card.className = 'achievement-card';
            card.dataset.achievementId = achievement.id;

            card.innerHTML = `
                <img src="${achievement.icon_url}" alt="${achievement.title} icon" class="achievement-icon">
                <div class="achievement-card-content">
                    <h3 class="achievement-card-title">${achievement.title}</h3>
                    <p class="achievement-card-description">${achievement.short_description}</p>
                </div>
            `;
            achievementsListContainer.appendChild(card);

            // Click listener to load detail view
            card.addEventListener('click', () => {
                loadAchievementDetailView(achievement.id, containerId, mainContainerId);
            });
        });
    }

    // Back button to portfolio
    const backButton = dynamicViewContainer.querySelector('#achievements-back-btn');
    backButton.addEventListener('click', () => {
        dynamicViewContainer.style.display = 'none';
        dynamicViewContainer.innerHTML = '';
        const portfolioView = document.getElementById(portfolioViewId);
        if (portfolioView) portfolioView.style.display = 'flex';
    });
}

async function loadAchievementDetailView(achievementId, containerId, mainContainerId) {
    const dynamicViewContainer = document.getElementById(containerId);
    try {
        const response = await fetch('achievement-detail-view.html');
        const htmlContent = await response.text();
        dynamicViewContainer.innerHTML = htmlContent;
        await initAchievementDetailView(achievementId, containerId, mainContainerId);
    } catch (error) {
        console.error('Error loading achievement detail view:', error);
        dynamicViewContainer.innerHTML = `<p>Could not load achievement details.</p>`;
    }
}

async function initAchievementDetailView(achievementId, containerId, mainContainerId) {
    const dynamicViewContainer = document.getElementById(containerId);
    const achievements = await fetchAchievements();
    const achievement = achievements.find(a => a.id === achievementId);

    if (!achievement) {
        dynamicViewContainer.innerHTML = '<p>Achievement not found.</p>';
        return;
    }

    // Populate details
    document.getElementById('ad-title').textContent = achievement.title;
    document.getElementById('ad-full-description').textContent = achievement.full_description;
    document.getElementById('ad-how-achieved').textContent = achievement.how_achieved;
    document.getElementById('ad-words-about-it').textContent = achievement.words_about_it;
    
    const certImg = document.getElementById('ad-certificate-image');
    certImg.src = achievement.certificate_image_url;
    certImg.alt = `Certificate for ${achievement.title}`;

    // Back button to achievements list
    const backButton = document.getElementById('achievement-detail-back-btn');
    backButton.addEventListener('click', async () => {
         try {
            const response = await fetch('achievements-view.html');
            const htmlContent = await response.text();
            dynamicViewContainer.innerHTML = htmlContent;
            initAchievementsView(containerId, 'portfolio-view', mainContainerId);
        } catch (error) {
            console.error('Error loading achievements view:', error);
        }
    });
}

