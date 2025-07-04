// contact.js

function showCopyNotification() {
    // Check if a notification element exists, if not, create it
    let notification = document.getElementById('copy-notification');
    if (!notification) {
        notification = document.createElement('p');
        notification.id = 'copy-notification';
        notification.className = 'copy-notification';
        document.body.appendChild(notification);
    }
    notification.textContent = 'Copied to clipboard!';
    notification.style.display = 'block';
    notification.style.opacity = '1';
    
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            notification.style.display = 'none';
        }, 300);
    }, 1500);
}

export async function initContactView(containerId, mainContainerId) {
    const dynamicViewContainer = document.getElementById(containerId);
    const mainContent = document.getElementById('main-content');
    const profileSection = document.querySelector('.profile-section');

    if (!dynamicViewContainer) {
        console.error('Dynamic view container not found for contact');
        return;
    }

    const contactDetailsContainer = dynamicViewContainer.querySelector('#contact-details-container');
    const socialsListContainer = dynamicViewContainer.querySelector('#socials-list-container');
    const mainContactLink = dynamicViewContainer.querySelector('#main-contact-link');

    if (!socialsListContainer || !mainContactLink || !contactDetailsContainer) {
        console.error('Required elements not found in contact view HTML.');
        dynamicViewContainer.innerHTML = '<p>Error loading contact view.</p>';
        return;
    }

    try {
        const response = await fetch('contact.json');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        const { personalInfo, socials, contactDetails } = data;

        // Set the main bio link
        if (personalInfo && personalInfo.contactMeLink) {
            mainContactLink.href = personalInfo.contactMeLink;
        } else {
            mainContactLink.style.display = 'none';
        }

        // Populate contact details (phone, email)
        contactDetailsContainer.innerHTML = '';
        if (contactDetails) {
            if (contactDetails.phone) {
                const itemDiv = document.createElement('div');
                itemDiv.className = 'info-item';
                itemDiv.innerHTML = `
                    <span class="info-label"><i class="fas fa-phone"></i> Phone:</span>
                    <span class="info-value" id="contact-phone">${contactDetails.phone}</span>
                    <button class="copy-btn" data-target="contact-phone" aria-label="Copy Phone Number"><i class="fas fa-copy"></i></button>
                `;
                contactDetailsContainer.appendChild(itemDiv);
            }
            if (contactDetails.emails && contactDetails.emails.length > 0) {
                 contactDetails.emails.forEach((email, index) => {
                    const itemDiv = document.createElement('div');
                    itemDiv.className = 'info-item';
                    const emailId = `contact-email-${index}`;
                    itemDiv.innerHTML = `
                        <span class="info-label"><i class="fas fa-envelope"></i> Email:</span>
                        <span class="info-value" id="${emailId}">${email}</span>
                        <button class="copy-btn" data-target="${emailId}" aria-label="Copy Email"><i class="fas fa-copy"></i></button>
                    `;
                    contactDetailsContainer.appendChild(itemDiv);
                 });
            }
        }

        // Populate social media buttons
        socialsListContainer.innerHTML = ''; // Clear previous content
        if (socials && Array.isArray(socials)) {
            socials.forEach(social => {
                const link = document.createElement('a');
                link.href = social.url;
                link.className = 'social-link-item';
                link.target = '_blank';
                link.setAttribute('aria-label', `Visit my ${social.name}`);

                const icon = document.createElement('i');
                icon.className = social.icon_class;

                const nameSpan = document.createElement('span');
                nameSpan.textContent = social.name;

                link.appendChild(icon);
                link.appendChild(nameSpan);
                socialsListContainer.appendChild(link);
            });
        }

    } catch (error) {
        console.error('Failed to load or process contact data:', error);
        socialsListContainer.innerHTML = `<p style="text-align:center;">Could not load social links.</p>`;
    }

    // Attach event listeners for new copy buttons
      const copyButtons = dynamicViewContainer.querySelectorAll('.copy-btn');
      copyButtons.forEach(button => {
        button.addEventListener('click', (e) => {
          e.stopPropagation();
          const targetId = button.dataset.target;
          const textElement = dynamicViewContainer.querySelector(`#${targetId}`);
          if (textElement) {
            const textToCopy = textElement.textContent;
            navigator.clipboard.writeText(textToCopy).then(() => {
              showCopyNotification();
            }).catch(err => {
              console.error('Failed to copy text: ', err);
            });
          }
        });
      });

    // Back button functionality
    const backButton = dynamicViewContainer.querySelector('#contact-back-btn');
    if (backButton) {
        backButton.addEventListener('click', () => {
            dynamicViewContainer.style.display = 'none';
            dynamicViewContainer.innerHTML = '';
            if (mainContent) mainContent.style.display = '';
            if (profileSection) profileSection.style.display = '';
        });
    }
}