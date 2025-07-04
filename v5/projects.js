// projects.js

async function fetchProjects() {
    try {
        const response = await fetch('/json/projects.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Could not fetch projects data:", error);
        return [];
    }
}


export async function initProjectsView(containerId, portfolioViewId, mainContainerId) {
    const dynamicViewContainer = document.getElementById(containerId);
    if (!dynamicViewContainer) return;

    const projectsListContainer = dynamicViewContainer.querySelector('#projects-list-container');
    if (!projectsListContainer) {
        dynamicViewContainer.innerHTML = '<p>Error: Project list container not found.</p>';
        return;
    }

    const projects = await fetchProjects();
    
    if (projects.length === 0) {
        projectsListContainer.innerHTML = '<p class="no-projects-data">No projects available at the moment.</p>';
        return;
    }

    projectsListContainer.innerHTML = ''; // Clear
    projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.dataset.projectId = project.id;

        card.innerHTML = `
            <div class="project-media-container">
                <img src="${project.image_url}" alt="${project.title}" class="project-image">
                <video class="project-video" loop muted playsinline>
                    <source src="${project.video_url}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            </div>
            <div class="project-card-content">
                <h3 class="project-card-title">${project.title}</h3>
                <p class="project-card-description">${project.short_description}</p>
            </div>
        `;

        projectsListContainer.appendChild(card);
        
        // Hover listeners for video playback
        const video = card.querySelector('.project-video');
        card.addEventListener('mouseenter', () => {
            video.style.opacity = '1';
            video.play().catch(e => console.error("Video play failed:", e));
        });
        card.addEventListener('mouseleave', () => {
            video.style.opacity = '0';
            video.pause();
            video.currentTime = 0;
        });

        // Click listener to load detail view
        card.addEventListener('click', () => {
            loadProjectDetailView(project.id, containerId, mainContainerId);
        });
    });

    // Back button to portfolio
    const backButton = dynamicViewContainer.querySelector('#projects-back-btn');
    backButton.addEventListener('click', () => {
        dynamicViewContainer.style.display = 'none';
        dynamicViewContainer.innerHTML = '';
        const portfolioView = document.getElementById(portfolioViewId);
        if (portfolioView) portfolioView.style.display = 'flex';
    });
}

async function loadProjectDetailView(projectId, containerId, mainContainerId) {
    const dynamicViewContainer = document.getElementById(containerId);
    try {
        const response = await fetch('project-detail-view.html');
        const htmlContent = await response.text();
        dynamicViewContainer.innerHTML = htmlContent;
        initProjectDetailView(projectId, containerId, mainContainerId);
    } catch (error) {
        console.error('Error loading project detail view:', error);
        dynamicViewContainer.innerHTML = `<p>Could not load project details.</p>`;
    }
}

async function initProjectDetailView(projectId, containerId, mainContainerId) {
    const dynamicViewContainer = document.getElementById(containerId);
    const projects = await fetchProjects();
    const project = projects.find(p => p.id === projectId);

    if (!project) {
        dynamicViewContainer.innerHTML = '<p>Project not found.</p>';
        return;
    }

    // Populate details
    document.getElementById('pd-title').textContent = project.title;
    document.getElementById('pd-full-description').textContent = project.full_description;
    document.getElementById('pd-admin-words').textContent = project.admin_words;
    
    const techContainer = document.getElementById('pd-technologies');
    techContainer.innerHTML = '';
    project.technologies.forEach(tech => {
        const tag = document.createElement('span');
        tag.className = 'tech-tag';
        tag.textContent = tech;
        techContainer.appendChild(tag);
    });

    const sourceLink = document.getElementById('pd-source-link');
    sourceLink.href = project.source_link;
    if (!project.source_link || project.source_link === '#') {
        sourceLink.style.display = 'none';
    }

    const previewLink = document.getElementById('pd-preview-link');
    previewLink.href = project.preview_link;
     if (!project.preview_link || project.preview_link === '#') {
        previewLink.style.display = 'none';
    }

    // Back button to projects list
    const backButton = document.getElementById('project-detail-back-btn');
    backButton.addEventListener('click', async () => {
         try {
            const response = await fetch('projects-view.html');
            const htmlContent = await response.text();
            dynamicViewContainer.innerHTML = htmlContent;
            initProjectsView(containerId, 'portfolio-view', mainContainerId);
        } catch (error) {
            console.error('Error loading projects view:', error);
        }
    });
}

