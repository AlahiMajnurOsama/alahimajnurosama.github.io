// blogs.js

async function fetchBlogs() {
    try {
        const response = await fetch('blogs.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Could not fetch blogs data:", error);
        return [];
    }
}

export async function initBlogsView(containerId, portfolioViewId, mainContainerId) {
    const dynamicViewContainer = document.getElementById(containerId);
    if (!dynamicViewContainer) return;

    const blogsListContainer = dynamicViewContainer.querySelector('#blogs-list-container');
    if (!blogsListContainer) {
        dynamicViewContainer.innerHTML = '<p>Error: Blogs list container not found.</p>';
        return;
    }

    const blogs = await fetchBlogs();
    
    if (blogs.length === 0) {
        blogsListContainer.innerHTML = '<p class="no-blogs-data">No blog posts available at the moment.</p>';
    } else {
        blogsListContainer.innerHTML = ''; // Clear
        blogs.forEach(blog => {
            const card = document.createElement('div');
            card.className = 'blog-card';
            card.dataset.blogId = blog.id;

            card.innerHTML = `
                <img src="${blog.cover_image}" alt="${blog.title}" class="blog-card-image">
                <div class="blog-card-content">
                    <h3 class="blog-card-title">${blog.title}</h3>
                    <p class="blog-card-description">${blog.short_description}</p>
                    <div class="blog-card-meta">
                        <span>${blog.author} - ${blog.date}</span>
                    </div>
                </div>
            `;
            blogsListContainer.appendChild(card);

            card.addEventListener('click', () => {
                loadBlogDetailView(blog.id, containerId, mainContainerId);
            });
        });
    }

    // Back button to main
    const backButton = dynamicViewContainer.querySelector('#blogs-back-btn');
    backButton.addEventListener('click', () => {
        dynamicViewContainer.style.display = 'none';
        dynamicViewContainer.innerHTML = '';
        const mainContent = document.getElementById('main-content');
        const profileSection = document.querySelector('.profile-section');
        if (mainContent) mainContent.style.display = '';
        if (profileSection) profileSection.style.display = '';
    });
}

async function loadBlogDetailView(blogId, containerId, mainContainerId) {
    const dynamicViewContainer = document.getElementById(containerId);
    try {
        const response = await fetch('blog-detail-view.html');
        const htmlContent = await response.text();
        dynamicViewContainer.innerHTML = htmlContent;
        await initBlogDetailView(blogId, containerId, mainContainerId);
    } catch (error) {
        console.error('Error loading blog detail view:', error);
        dynamicViewContainer.innerHTML = `<p>Could not load blog post.</p>`;
    }
}

function renderContent(contentArray, container) {
    container.innerHTML = '';
    contentArray.forEach(item => {
        let element;
        switch(item.type) {
            case 'paragraph':
                element = document.createElement('p');
                element.innerHTML = item.text; 
                break;
            case 'heading':
                element = document.createElement(`h${item.level || 2}`);
                element.textContent = item.text;
                break;
            case 'image':
                const imgContainer = document.createElement('div');
                imgContainer.className = 'image-container';
                element = document.createElement('img');
                element.src = item.src;
                element.alt = item.caption || 'Blog image';
                imgContainer.appendChild(element);
                if (item.caption) {
                    const caption = document.createElement('span');
                    caption.className = 'image-caption';
                    caption.textContent = item.caption;
                    imgContainer.appendChild(caption);
                }
                element = imgContainer;
                break;
            case 'button':
                element = document.createElement('a');
                element.href = item.url;
                element.textContent = item.text;
                element.className = 'btn';
                element.target = '_blank';
                break;
            case 'list':
                element = document.createElement('ul');
                item.items.forEach(liText => {
                    const li = document.createElement('li');
                    li.innerHTML = liText;
                    element.appendChild(li);
                });
                break;
            case 'attachment':
                 element = document.createElement('a');
                 element.href = item.url;
                 element.className = 'attachment-link';
                 element.textContent = item.text;
                 if(item.url === '#') element.style.pointerEvents = 'none';
                 else element.setAttribute('download', '');
                 break;

        }
        if (element) {
            container.appendChild(element);
        }
    });
}

async function initBlogDetailView(blogId, containerId, mainContainerId) {
    const blogs = await fetchBlogs();
    const blog = blogs.find(b => b.id === blogId);

    if (!blog) {
        document.getElementById(containerId).innerHTML = '<p>Blog post not found.</p>';
        return;
    }

    document.getElementById('blog-title').textContent = blog.title;
    document.getElementById('blog-author').textContent = `By ${blog.author}`;
    document.getElementById('blog-date').textContent = new Date(blog.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    
    const contentContainer = document.getElementById('blog-content-container');
    renderContent(blog.content, contentContainer);

    const backButton = document.getElementById('blog-detail-back-btn');
    backButton.addEventListener('click', async () => {
         try {
            const response = await fetch('blogs-view.html');
            const htmlContent = await response.text();
            document.getElementById(containerId).innerHTML = htmlContent;
            initBlogsView(containerId, 'portfolio-view', mainContainerId);
        } catch (error) {
            console.error('Error loading blogs view:', error);
        }
    });
}