// creations.js

// --- DATA FETCHING ---
async function getCreationsData() {
    try {
        const response = await fetch('/json/creations.json');
        if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error("Failed to fetch creations data:", error);
        return null;
    }
}


// --- VIEW RENDERING ---

// Main Hub View
export function initCreationsView(containerId, mainContainerId) {
    const dynamicViewContainer = document.getElementById(containerId);
    
    // Back to main menu
    const backButton = dynamicViewContainer.querySelector('#creations-back-btn');
    backButton.addEventListener('click', () => {
        dynamicViewContainer.style.display = 'none';
        dynamicViewContainer.innerHTML = '';
        document.getElementById('main-content').style.display = '';
        document.querySelector('.profile-section').style.display = '';
    });

    // Event listeners for the three creation type cards
    const creationCards = dynamicViewContainer.querySelectorAll('.creation-card');
    creationCards.forEach(card => {
        card.addEventListener('click', () => {
            const type = card.dataset.creationType;
            renderListView(type, containerId, mainContainerId);
        });
    });
}

// Generic List View
async function renderListView(type, containerId, mainContainerId) {
    const data = await getCreationsData();
    if (!data) return;

    const items = data[type];
    const typeTitles = {
        'poems': { en: 'My Poems', bn: 'আমার লেখা কবিতা' },
        'my_songs': { en: 'My Original Songs', bn: 'আমার লেখা গান' },
        'covered_songs': { en: 'Cover Songs', bn: 'আমার কভার করা গান' }
    };
    const titleEn = typeTitles[type]?.en || 'Creations';
    const titleBn = typeTitles[type]?.bn || '';

    let listHtml = items.map(item => `
        <div class="list-item-card" data-id="${item.id}" data-type="${type}">
            <h4>${item.title}</h4>
            <p>${item.short_description || `Category: ${item.category}`}</p>
        </div>
    `).join('');

    const viewHtml = `
        <div class="creation-list-wrapper">
            <button id="list-back-btn" class="back-btn"><i class="fas fa-arrow-left"></i> Back to Corner</button>
            <div class="creation-list-header">
              <h2 class="creation-list-title">${titleEn}</h2>
              <p class="creation-list-subtitle">${titleBn}</p>
            </div>
            <div class="creation-list">${listHtml}</div>
        </div>
    `;

    const dynamicViewContainer = document.getElementById(containerId);
    dynamicViewContainer.innerHTML = viewHtml;

    // Add event listeners for list items
    dynamicViewContainer.querySelectorAll('.list-item-card').forEach(card => {
        card.addEventListener('click', () => {
            renderDetailView(card.dataset.type, card.dataset.id, containerId, mainContainerId);
        });
    });

    // Back to hub view
    dynamicViewContainer.querySelector('#list-back-btn').addEventListener('click', async () => {
        const response = await fetch('creations-view.html');
        dynamicViewContainer.innerHTML = await response.text();
        initCreationsView(containerId, mainContainerId);
    });
}

// Generic Detail View
async function renderDetailView(type, id, containerId, mainContainerId) {
    const data = await getCreationsData();
    if (!data) return;

    const item = data[type]?.find(i => i.id === id);
    if (!item) {
        document.getElementById(containerId).innerHTML = `<p>Item not found.</p>`;
        return;
    }

    let detailContentHtml = '';

    if (type === 'poems') {
        detailContentHtml = `
            <div class="creation-detail-section">
                <h3><i class="fas fa-pen-nib"></i> The Poem</h3>
                <pre class="poem-content">${item.content}</pre>
            </div>
            <div class="creation-detail-section">
                <h3><i class="fas fa-comment-dots"></i> Writer's Feelings</h3>
                <p class="writer-feelings">${item.writer_feelings}</p>
            </div>
        `;
    } else { // For my_songs and covered_songs
        detailContentHtml = `
            <div class="creation-detail-section">
                <h3><i class="fas fa-headphones-alt"></i> Listen</h3>
                <audio controls class="audio-player" src="${item.audio_url}">Your browser does not support the audio element.</audio>
            </div>
            <div class="creation-detail-section">
                <h3><i class="fas fa-file-audio"></i> Lyrics</h3>
                <pre class="lyrics-content">${item.lyrics}</pre>
            </div>
            ${item.meaning ? `
            <div class="creation-detail-section">
                <h3><i class="fas fa-lightbulb"></i> Meaning</h3>
                <p>${item.meaning}</p>
            </div>` : ''}
            <div class="creation-detail-section">
                <h3><i class="fas fa-user-edit"></i> Admin's Words</h3>
                <p class="writer-feelings">${item.admin_words}</p>
            </div>
        `;
    }

    const metaLine = type === 'poems' 
        ? `Category: ${item.category}` 
        : `Category: ${item.category}${item.original_artist ? ` | Original Artist: ${item.original_artist}` : ''}`;

    const viewHtml = `
        <div class="creation-detail-wrapper">
            <button id="detail-back-btn" class="back-btn"><i class="fas fa-arrow-left"></i> Back to List</button>
            <h2 class="creation-detail-title">${item.title}</h2>
            <p class="creation-detail-meta">${metaLine}</p>
            ${detailContentHtml}
        </div>
    `;

    const dynamicViewContainer = document.getElementById(containerId);
    dynamicViewContainer.innerHTML = viewHtml;

    // Back to list view
    dynamicViewContainer.querySelector('#detail-back-btn').addEventListener('click', () => {
        renderListView(type, containerId, mainContainerId);
    });
}