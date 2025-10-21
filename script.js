// Smooth scrolling per i link di navigazione
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerOffset = 80;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Header background change on scroll
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
    });
    
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Project modal functionality
    const projectModal = document.getElementById('projectModal');
    const modalClose = document.getElementById('modalClose');
    const modalOverlay = document.querySelector('.modal-overlay');
    const projectCards = document.querySelectorAll('.project-card');
    
    // Load project data from JSON
    let projectsData = {};
    
    async function loadProjectsData() {
        try {
            const response = await fetch('projects-data.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            projectsData = await response.json();
            console.log('Projects data loaded:', Object.keys(projectsData));
        } catch (error) {
            console.error('Error loading projects data:', error);
            // Fallback data
            projectsData = {
                'default': {
                    title: 'Nome Progetto',
                    role: 'Developer',
                    duration: '3 mesi',
                    teamSize: '2 persone',
                    description: 'Descrizione del progetto.',
                    longDescription: 'Descrizione estesa del progetto con dettagli tecnici e caratteristiche innovative implementate durante lo sviluppo.',
                    technologies: ['Unity 3D', 'C#'],
                    features: ['Feature 1', 'Feature 2', 'Feature 3'],
                    engine: 'Unity 3D',
                    platforms: ['windows'],
                    stores: [],
                    media: {
                        images: ['https://via.placeholder.com/600x400/2d2d2d/dc2626?text=Screenshot'],
                        videos: []
                    }
                }
            };
        }
    }
    
    // Function to update store icons in project cards
    function updateProjectCardStores() {
        const projectCards = document.querySelectorAll('.project-card[data-project-id]');
        
        projectCards.forEach(card => {
            const projectId = card.getAttribute('data-project-id');
            const projectData = projectsData[projectId];
            
            if (projectData && projectData.stores) {
                const storeLinksContainer = card.querySelector('.store-links');
                if (storeLinksContainer) {
                    storeLinksContainer.innerHTML = '';
                    
                    if (projectData.stores.length > 0) {
                        projectData.stores.forEach(store => {
                            // Check if this is a status store (non-clickable)
                            const isStatusStore = store.type === 'limited-distribution' || store.type === 'abandoned' || store.type === 'discontinued';
                            
                            if (isStatusStore) {
                                // Create non-clickable icon for status stores
                                const storeIcon = createStoreIcon(store.type, store.name);
                                storeIcon.classList.add('store-status-icon');
                                storeLinksContainer.appendChild(storeIcon);
                            } else {
                                // Create clickable link for all stores
                                const storeLink = document.createElement('a');
                                storeLink.href = store.url || '#';
                                storeLink.target = '_blank';
                                storeLink.title = store.name;
                                storeLink.classList.add('store-card-link');
                                
                                const storeIcon = createStoreIcon(store.type, store.name);
                                
                                storeLink.appendChild(storeIcon);
                                storeLinksContainer.appendChild(storeLink);
                            }
                        });
                    }
                }
            }
        });
    }
    
    // Initialize data loading and update cards
    async function initializeData() {
        await loadProjectsData();
        generateProjectCards();
    }
    
    // Run initialization when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeData);
    } else {
        initializeData();
    }
    
    // Platform and store icon mappings
    const platformIcons = {
        'windows': 'fab fa-windows',
        'android': 'fab fa-android',
        'ios': 'fab fa-apple',
        'apple': 'fab fa-apple',
        'browser': 'fas fa-globe',
        'linux': 'fab fa-linux',
        'vr-headset': 'fas fa-vr-cardboard',
        'vr': 'fas fa-vr-cardboard'
    };
    
    // Function to create store icon (FontAwesome or custom image)
    function createStoreIcon(storeType, storeName) {
        if (storeType === 'gamejam') {
            // Create container with custom image for Global Game Jam
            const container = document.createElement('div');
            container.classList.add('store-icon-custom');
            container.setAttribute('data-store', storeType);
            container.title = storeName;
            
            const img = document.createElement('img');
            img.src = 'public/Images/Icons/ggj.png';
            img.alt = storeName;
            
            container.appendChild(img);
            return container;
        } else {
            // Create FontAwesome icon for other stores
            const icon = document.createElement('i');
            icon.className = storeIcons[storeType] || 'fas fa-external-link-alt';
            icon.title = storeName;
            icon.setAttribute('data-store', storeType);
            return icon;
        }
    }

    const storeIcons = {
        'steam': 'fab fa-steam',
        'google-play': 'fab fa-google-play',
        'app-store': 'fab fa-app-store-ios',
        'itch-io': 'fab fa-itch-io',
        'direct-download': 'fas fa-download',
        'github': 'fab fa-github',
        'global-game-jam': 'fas fa-gamepad',
        'limited-distribution': 'fas fa-user-friends',
        'abandoned': 'fas fa-times',
        'discontinued': 'fas fa-times'
    };
    
    // Function to create engine icon (FontAwesome or custom image)
    function createEngineIcon(engine) {
        if (engine === 'C#') {
            // Create container with custom image for C#
            const container = document.createElement('div');
            container.classList.add('engine-icon-custom');
            container.title = engine;
            
            const img = document.createElement('img');
            img.src = 'public/Images/Icons/cs.svg';
            img.alt = engine;
            img.style.width = '16px';
            img.style.height = '16px';
            
            container.appendChild(img);
            return container;
        } else {
            // Create FontAwesome icon for other engines
            const icon = document.createElement('i');
            icon.className = engineIcons[engine] || 'fas fa-cogs';
            icon.title = engine;
            return icon;
        }
    }
    
    const engineIcons = {
        'Unity 3D': 'fab fa-unity',
        'Unity': 'fab fa-unity',
        'Unreal Engine': 'fas fa-cube',
        'Unreal': 'fas fa-cube',
        'Godot': 'fas fa-robot',
        'Custom Engine': 'fas fa-cogs',
        'Custom': 'fas fa-cogs',
        'Python': 'fab fa-python',
        'C#': 'fas fa-hashtag'
    };
    
    // Function to generate project cards dynamically
    function generateProjectCards() {
        // Clear existing cards (keep only the structure)
        const categoryMappings = {
            'educational': 'education',
            'work': 'work', 
            'personal': 'personal',
            'gamejam': 'gamejam'
        };
        
        Object.keys(projectsData).forEach(projectId => {
            const project = projectsData[projectId];
            const categoryPrefix = projectId.split('-')[0];
            const categoryName = categoryMappings[categoryPrefix];
            
            if (!categoryName) return;
            
            // Find the projects grid for this category
            const categorySection = document.querySelector(`[data-category="${categoryName}"] .projects-grid`);
            if (!categorySection) return;
            
            // Create project card
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card';
            projectCard.setAttribute('data-project-id', projectId);
            
            // Generate platforms HTML
            const platformsHTML = project.platforms.map(platform => {
                const iconClass = platformIcons[platform] || 'fas fa-desktop';
                return `<i class="${iconClass}" title="${platform}"></i>`;
            }).join('');
            
            projectCard.innerHTML = `
                <div class="project-image">
                    <img src="${project.thumbnail || project.media.images[0] || 'public/Games/placeholder-project.jpg'}" alt="${project.title}">
                </div>
                <div class="project-info">
                    <h4 class="project-title">${project.title}</h4>
                    <span class="project-role">${project.role}</span>
                    <p class="project-description">${project.description}</p>
                    <div class="project-tech">
                        <div class="engine-icon">
                        </div>
                        <div class="platform-icons">
                            ${platformsHTML}
                        </div>
                    </div>
                    <div class="store-links">
                        <!-- Store icons will be populated dynamically -->
                    </div>
                </div>
            `;
            
            // Add engine icon after creating the card
            const engineIconContainer = projectCard.querySelector('.engine-icon');
            const engineIconElement = createEngineIcon(project.engine);
            engineIconContainer.appendChild(engineIconElement);
            
            categorySection.appendChild(projectCard);
        });
        
        // Update store icons after cards are created
        updateProjectCardStores();
        
        // Re-attach event listeners to new cards
        attachCardEventListeners();
    }
    
    // Function to attach event listeners to cards
    function attachCardEventListeners() {
        const allProjectCards = document.querySelectorAll('.project-card[data-project-id]');
        
        allProjectCards.forEach(card => {
            // Remove existing listeners to avoid duplicates
            card.replaceWith(card.cloneNode(true));
        });
        
        // Re-get cards after cloning and add listeners
        const newProjectCards = document.querySelectorAll('.project-card[data-project-id]');
        newProjectCards.forEach(card => {
            card.addEventListener('click', function(e) {
                // Prevent opening modal if clicking on store links
                if (e.target.closest('.store-links')) {
                    return;
                }
                
                const projectId = this.dataset.projectId;
                const projectData = projectsData[projectId];
                
                if (projectData) {
                    populateModal(projectData);
                    showModal();
                }
            });
        });
    }
    
    // Open modal when project card is clicked
    projectCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't open modal for placeholder cards (cards without data-project-id)
            if (!this.dataset.projectId) {
                return;
            }
            
            // Prevent opening modal if clicking on store links
            if (e.target.closest('.store-links')) {
                return;
            }
            
            openProjectModal(card);
        });
    });
    
    // Close modal functionality
    function closeModal() {
        projectModal.classList.remove('active');
        document.body.style.overflow = 'auto';
        
        // Stop any playing YouTube video
        const youtubeFrame = document.getElementById('youtubeFrame');
        const currentSrc = youtubeFrame.src;
        youtubeFrame.src = '';
        setTimeout(() => {
            youtubeFrame.src = currentSrc;
        }, 100);
    }
    
    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && projectModal.classList.contains('active')) {
            closeModal();
        }
    });
    
    function getProjectId(card) {
        // Get project ID from data attribute
        const projectId = card.dataset.projectId;
        if (projectId && projectsData[projectId]) {
            return projectId;
        }
        
        // Fallback to default
        return 'educational-1'; // Use a valid ID as fallback
    }
    
    // Functions for dynamic cards
    function populateModal(data) {
        // Populate modal content
        document.getElementById('modalTitle').textContent = data.title;
        document.getElementById('modalRole').textContent = data.role;
        document.getElementById('modalYear').textContent = data.year;
        document.getElementById('modalDescription').innerHTML = data.longDescription || data.description;
        
        // Populate engine info
        const engineContainer = document.getElementById('modalEngine');
        engineContainer.innerHTML = '';
        const engineIconElement = createEngineIcon(data.engine);
        engineContainer.appendChild(engineIconElement);
        
        // Populate platforms
        const platformsContainer = document.getElementById('modalPlatforms');
        platformsContainer.innerHTML = '';
        data.platforms.forEach(platform => {
            const icon = document.createElement('i');
            icon.className = platformIcons[platform] || 'fas fa-desktop';
            platformsContainer.appendChild(icon);
        });
        
        // Populate stores
        const storesContainer = document.getElementById('modalStores');
        storesContainer.innerHTML = '';
        if (data.stores && data.stores.length > 0) {
            data.stores.forEach(store => {
                // Check if this is a status store (non-clickable)
                const isStatusStore = store.type === 'limited-distribution' || store.type === 'abandoned' || store.type === 'discontinued';
                
                if (isStatusStore) {
                    // Create status element (non-clickable)
                    const statusElement = document.createElement('div');
                    statusElement.className = 'store-status';
                    statusElement.setAttribute('data-store', store.type);
                    
                    const icon = createStoreIcon(store.type, store.name);
                    
                    const text = document.createElement('span');
                    text.textContent = store.name;
                    text.className = 'status-text';
                    
                    statusElement.appendChild(icon);
                    statusElement.appendChild(text);
                    storesContainer.appendChild(statusElement);
                } else {
                    // Create regular clickable link
                    const link = document.createElement('a');
                    link.href = store.url || '#';
                    link.target = '_blank';
                    link.className = 'store-link';
                    link.setAttribute('data-store', store.type);
                    link.title = store.name;
                    const icon = createStoreIcon(store.type, store.name);
                    link.appendChild(icon);
                    storesContainer.appendChild(link);
                }
            });
        } else {
            const placeholder = document.createElement('span');
            placeholder.textContent = 'Non ancora disponibile';
            placeholder.style.color = 'var(--primary-black)';
            placeholder.style.fontStyle = 'italic';
            storesContainer.appendChild(placeholder);
        }
        
        // Populate technologies
        const techContainer = document.getElementById('modalTechnologies');
        techContainer.innerHTML = '';
        data.technologies.forEach(tech => {
            const techItem = document.createElement('span');
            techItem.className = 'tech-item';
            techItem.textContent = tech;
            techContainer.appendChild(techItem);
        });
        
        // Populate features
        const featuresContainer = document.getElementById('modalFeatures');
        featuresContainer.innerHTML = '';
        data.features.forEach(feature => {
            const li = document.createElement('li');
            li.textContent = feature;
            featuresContainer.appendChild(li);
        });
        
        // Setup media gallery
        setupModalGallery(data.media);
    }
    
    function showModal() {
        projectModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function openProjectModal(card) {
        // Wait for projects data to be loaded
        if (!projectsData || Object.keys(projectsData).length === 0) {
            console.log('Projects data not loaded yet');
            return;
        }
        
        const projectId = getProjectId(card);
        const data = projectsData[projectId];
        
        if (!data) {
            console.error('Project data not found for ID:', projectId);
            return;
        }
        
        // Populate modal content
        document.getElementById('modalTitle').textContent = data.title;
        document.getElementById('modalRole').textContent = data.role;
        document.getElementById('modalYear').textContent = data.year;
        document.getElementById('modalDescription').innerHTML = data.longDescription || data.description;
        
        // Populate engine info
        const engineContainer = document.getElementById('modalEngine');
        engineContainer.innerHTML = '';
        const engineIconElement = createEngineIcon(data.engine);
        engineContainer.appendChild(engineIconElement);
        
        // Populate platforms
        const platformsContainer = document.getElementById('modalPlatforms');
        platformsContainer.innerHTML = '';
        data.platforms.forEach(platform => {
            const icon = document.createElement('i');
            icon.className = platformIcons[platform] || 'fas fa-desktop';
            platformsContainer.appendChild(icon);
        });
        
        // Populate stores
        const storesContainer = document.getElementById('modalStores');
        storesContainer.innerHTML = '';
        if (data.stores && data.stores.length > 0) {
            data.stores.forEach(store => {
                // Check if this is a status store (non-clickable)
                const isStatusStore = store.type === 'limited-distribution' || store.type === 'abandoned' || store.type === 'discontinued';
                
                if (isStatusStore) {
                    // Create status element (non-clickable)
                    const statusElement = document.createElement('div');
                    statusElement.className = 'store-status';
                    statusElement.setAttribute('data-store', store.type);
                    
                    const icon = createStoreIcon(store.type, store.name);
                    
                    const text = document.createElement('span');
                    text.textContent = store.name;
                    text.className = 'status-text';
                    
                    statusElement.appendChild(icon);
                    statusElement.appendChild(text);
                    storesContainer.appendChild(statusElement);
                } else {
                    // Create regular clickable link
                    const link = document.createElement('a');
                    link.href = store.url || '#';
                    link.target = '_blank';
                    link.className = 'store-link';
                    link.setAttribute('data-store', store.type);
                    link.title = store.name;
                    const icon = createStoreIcon(store.type, store.name);
                    link.appendChild(icon);
                    storesContainer.appendChild(link);
                }
            });
        } else {
            const placeholder = document.createElement('span');
            placeholder.textContent = 'Non ancora disponibile';
            placeholder.style.color = 'var(--primary-black)';
            placeholder.style.fontStyle = 'italic';
            storesContainer.appendChild(placeholder);
        }
        
        // Populate technologies
        const techContainer = document.getElementById('modalTechnologies');
        techContainer.innerHTML = '';
        data.technologies.forEach(tech => {
            const techItem = document.createElement('span');
            techItem.className = 'tech-item';
            techItem.textContent = tech;
            techContainer.appendChild(techItem);
        });
        
        // Populate features
        const featuresContainer = document.getElementById('modalFeatures');
        featuresContainer.innerHTML = '';
        data.features.forEach(feature => {
            const li = document.createElement('li');
            li.textContent = feature;
            featuresContainer.appendChild(li);
        });
        
        // Setup media gallery
        setupModalGallery(data.media);
        
        // Show modal
        projectModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function setupModalGallery(media) {
        const thumbnailsContainer = document.querySelector('.media-thumbnails');
        const mainImage = document.getElementById('modalMainImage');
        const mainVideo = document.getElementById('modalMainVideo');
        
        thumbnailsContainer.innerHTML = '';
        
        let mediaItems = [];
        
        // Helper function to extract YouTube ID from URL
        function getYouTubeID(url) {
            const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
            const match = url.match(regExp);
            return (match && match[2].length === 11) ? match[2] : null;
        }
        
        console.log('Setting up modal gallery with media:', media); // Debug log
        
        // Add images
        if (media.images && media.images.length > 0) {
            media.images.forEach((imageSrc, index) => {
                mediaItems.push({
                    type: 'image',
                    src: imageSrc,
                    thumbnail: imageSrc,
                    title: `Screenshot ${index + 1}`
                });
            });
        }
        
        // Add videos
        if (media.videos && media.videos.length > 0) {
            console.log('Processing videos:', media.videos); // Debug log
            media.videos.forEach((video, index) => {
                let videoData;
                
                if (typeof video === 'string') {
                    // Handle string URLs (YouTube, Vimeo, etc.)
                    const youtubeId = getYouTubeID(video);
                    console.log('String video URL:', video, 'Extracted ID:', youtubeId); // Debug log
                    if (youtubeId) {
                        videoData = {
                            type: 'video',
                            src: `https://www.youtube.com/embed/${youtubeId}`,
                            thumbnail: `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`,
                            title: `Video ${index + 1}`,
                            youtubeId: youtubeId
                        };
                    }
                } else {
                    // Handle object format
                    const youtubeId = video.youtubeId || getYouTubeID(video.url);
                    console.log('Object video:', video, 'YouTube ID:', youtubeId); // Debug log
                    if (youtubeId) {
                        videoData = {
                            type: 'video',
                            src: `https://www.youtube.com/embed/${youtubeId}`,
                            thumbnail: video.thumbnail && video.thumbnail.trim() !== '' 
                                ? video.thumbnail 
                                : `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`,
                            title: video.title || `Video ${index + 1}`,
                            youtubeId: youtubeId
                        };
                    }
                }
                
                if (videoData) {
                    console.log('Adding video data:', videoData); // Debug log
                    mediaItems.push(videoData);
                }
            });
        }
        
        // Create thumbnails
        mediaItems.forEach((item, index) => {
            const thumbnail = document.createElement('div');
            thumbnail.className = `thumbnail ${index === 0 ? 'active' : ''}`;
            thumbnail.dataset.type = item.type;
            thumbnail.dataset.src = item.src;
            if (item.youtubeId) {
                thumbnail.dataset.youtube = item.youtubeId;
            }
            
            if (item.type === 'image') {
                const img = document.createElement('img');
                img.src = item.thumbnail;
                img.alt = item.title;
                thumbnail.appendChild(img);
            } else {
                const videoThumb = document.createElement('div');
                videoThumb.className = 'video-thumbnail';
                videoThumb.innerHTML = `
                    <i class="fas fa-play"></i>
                    <span>${item.title}</span>
                `;
                thumbnail.appendChild(videoThumb);
            }
            
            thumbnailsContainer.appendChild(thumbnail);
        });
        
        // Set first media as active
        if (mediaItems.length > 0) {
            const firstItem = mediaItems[0];
            if (firstItem.type === 'image') {
                mainImage.src = firstItem.src;
                mainImage.style.display = 'block';
                mainVideo.style.display = 'none';
            } else {
                document.getElementById('youtubeFrame').src = firstItem.src;
                mainVideo.style.display = 'block';
                mainImage.style.display = 'none';
            }
        }
        
        // Add click handlers to new thumbnails
        setupThumbnailHandlers();
    }
    
    function setupThumbnailHandlers() {
        const thumbnails = document.querySelectorAll('.thumbnail');
        const mainImage = document.getElementById('modalMainImage');
        const mainVideo = document.getElementById('modalMainVideo');
        const youtubeFrame = document.getElementById('youtubeFrame');
        
        thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', function() {
                // Remove active class from all thumbnails
                thumbnails.forEach(t => t.classList.remove('active'));
                // Add active class to clicked thumbnail
                this.classList.add('active');
                
                const mediaType = this.dataset.type;
                const mediaSrc = this.dataset.src;
                
                if (mediaType === 'image') {
                    mainImage.src = mediaSrc;
                    mainImage.style.display = 'block';
                    mainVideo.style.display = 'none';
                } else if (mediaType === 'video') {
                    youtubeFrame.src = mediaSrc;
                    mainVideo.style.display = 'block';
                    mainImage.style.display = 'none';
                }
            });
        });
    }

    // Project categories filter
    const categoryBtns = document.querySelectorAll('.category-btn');
    const projectCategories = document.querySelectorAll('.projects-category');
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active button
            categoryBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Show/hide categories
            projectCategories.forEach(cat => {
                if (category === 'all') {
                    cat.style.display = 'block';
                } else {
                    if (cat.getAttribute('data-category') === category) {
                        cat.style.display = 'block';
                    } else {
                        cat.style.display = 'none';
                    }
                }
            });
        });
    });
    
    // Initially show all categories
    projectCategories.forEach(cat => {
        cat.style.display = 'block';
    });
    
    // Skills: No animations needed for brutalist design
    
    // Brutalist design: immediate visibility, no smooth animations
    const allElements = document.querySelectorAll('.hero-text, .hero-image, .about-content, .project-card, .timeline-item, .experience-card');
    allElements.forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'none';
    });
    
    // Immediate title display (no typing effect for brutalist design)
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        // Just ensure title is visible immediately
        heroTitle.style.opacity = '1';
    }
    
    // Contact form handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Simple validation
            if (!name || !email || !subject || !message) {
                alert('Per favore compila tutti i campi');
                return;
            }
            
            // Here you would typically send the data to a server
            // For now, we'll just show a success message
            alert('Grazie per il messaggio! Ti risponderò presto.');
            this.reset();
        });
    }
    
    // Add stagger animation to project cards
    projectCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Mobile navigation improvements
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (hamburger.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });
    
    // Add scroll indicator functionality
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const aboutSection = document.querySelector('#about');
            if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
});
