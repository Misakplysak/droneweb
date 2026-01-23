// Data Loader - načítá obsah z JSON souborů
let websiteData = {
    services: [],
    videos: [],
    featuredPhotos: [],
    photoAlbums: [],
    pricing: [],
    team: []
};

// Načtení všech dat
async function loadWebsiteData() {
    try {
        const [services, videos, featuredPhotos, photoAlbums, pricing, team] = await Promise.all([
            fetch('admin/data/services.json').then(r => r.json()),
            fetch('admin/data/videos.json').then(r => r.json()),
            fetch('admin/data/featured-photos.json').then(r => r.json()),
            fetch('admin/data/photo-albums.json').then(r => r.json()),
            fetch('admin/data/pricing.json').then(r => r.json()),
            fetch('admin/data/team.json').then(r => r.json())
        ]);
        
        websiteData = { services, videos, featuredPhotos, photoAlbums, pricing, team };
        
        // Vykreslení obsahu
        renderServices();
        renderVideos();
        renderFeaturedPhotos();
        renderPhotoAlbums();
        renderPricing();
        renderTeam();
        
        return websiteData;
    } catch (error) {
        console.error('Chyba při načítání dat:', error);
        return null;
    }
}

// Vykreslení služeb
function renderServices() {
    const container = document.querySelector('.services-grid');
    if (!container) return;
    
    const iconMap = {
        'image': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                    <polyline points="21 15 16 10 5 21"></polyline>
                </svg>`,
        'video': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polygon points="23 7 16 12 23 17 23 7"></polygon>
                    <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                </svg>`,
        'fpv': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                    <path d="M2 17l10 5 10-5M2 12l10 5 10-5"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                </svg>`,
        'map': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                </svg>`,
        '3d': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                    <path d="M2 17l10 5 10-5"></path>
                    <path d="M2 12l10 5 10-5"></path>
                </svg>`,
        'edit': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M23 7l-7 5 7 5V7z"></path>
                    <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                    <line x1="5" y1="9" x2="11" y2="9"></line>
                    <line x1="5" y1="13" x2="9" y2="13"></line>
                </svg>`
    };
    
    container.innerHTML = websiteData.services.map((service, index) => `
        <div class="service-card" data-aos="fade-up" data-aos-delay="${index * 100}">
            <div class="service-icon">
                ${iconMap[service.icon] || iconMap['image']}
            </div>
            <h3>${service.title}</h3>
            <p>${service.description}</p>
        </div>
    `).join('');
}

// Vykreslení videí
function renderVideos() {
    const container = document.querySelector('.videos-grid');
    if (!container) return;
    
    container.innerHTML = websiteData.videos.map((video, index) => `
        <div class="video-card" data-aos="fade-up" data-aos-delay="${index * 100}" data-video-id="${video.youtubeId}">
            <div class="video-thumbnail" style="background-image: url('https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg')">
                <div class="video-play-overlay">
                    <button class="video-play-btn">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <polygon points="5 3 19 12 5 21 5 3"></polygon>
                        </svg>
                    </button>
                </div>
                <div class="video-info">
                    <h3>${video.title}</h3>
                </div>
            </div>
        </div>
    `).join('');
}

// Vykreslení vybraných fotek (slider)
function renderFeaturedPhotos() {
    const sliderTrack = document.getElementById('photoSliderTrack');
    const thumbnails = document.getElementById('photoSliderThumbnails');
    if (!sliderTrack || !thumbnails) return;
    
    sliderTrack.innerHTML = websiteData.featuredPhotos.map(photo => `
        <div class="slider-item">
            <img src="${photo.imageUrl}" alt="${photo.title}">
            <div class="slider-caption">
                <h3>${photo.title}</h3>
                <p>${photo.subtitle}</p>
            </div>
        </div>
    `).join('');
    
    thumbnails.innerHTML = websiteData.featuredPhotos.map((photo, index) => `
        <div class="slider-thumbnail ${index === 0 ? 'active' : ''}" data-slide="${index}">
            <img src="${photo.thumbnailUrl}" alt="Thumbnail ${index + 1}">
        </div>
    `).join('');
}

// Vykreslení fotogalerie (alba)
function renderPhotoAlbums() {
    const container = document.querySelector('.albums-grid');
    if (!container) return;
    
    container.innerHTML = websiteData.photoAlbums.map((album, index) => `
        <div class="album-card" data-aos="fade-up" data-aos-delay="${index * 100}">
            <div class="album-image" style="background-image: url('${album.coverImage}')">
                <div class="album-overlay">
                    <div class="album-info">
                        <h3>${album.title}</h3>
                        <p>${album.photoCount} fotografií</p>
                        <button class="btn btn-small" onclick="openAlbum('${album.albumSlug}')">Zobrazit album</button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Vykreslení ceníku
function renderPricing() {
    const container = document.querySelector('.pricing-grid');
    if (!container) return;
    
    const iconMap = {
        'Letecké fotografie': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                                <polyline points="21 15 16 10 5 21"></polyline>
                            </svg>`,
        'Dronové video 5.4K': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polygon points="23 7 16 12 23 17 23 7"></polygon>
                                <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                            </svg>`,
        'FPV létání': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                        <path d="M2 17l10 5 10-5M2 12l10 5 10-5"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                    </svg>`,
        'Mapování & 3D modely': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                    <circle cx="12" cy="10" r="3"></circle>
                                </svg>`
    };
    
    container.innerHTML = websiteData.pricing.map((price, index) => `
        <div class="pricing-card ${price.featured ? 'featured' : ''}" data-aos="fade-up" data-aos-delay="${index * 100}">
            ${price.featured ? '<div class="pricing-badge">Nejoblíbenější</div>' : ''}
            <div class="pricing-icon">
                ${iconMap[price.title] || iconMap['Letecké fotografie']}
            </div>
            <h3>${price.title}</h3>
            <div class="pricing-price">
                <span class="price-from">od</span>
                <span class="price-amount">${price.price.toLocaleString('cs-CZ')}</span>
                <span class="price-currency">Kč</span>
            </div>
            <ul class="pricing-features">
                ${price.features.map(feature => `
                    <li>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        <span>${feature}</span>
                    </li>
                `).join('')}
            </ul>
            <a href="kontakt.html" class="btn ${price.featured ? 'btn-primary' : 'btn-outline'}">Objednat</a>
        </div>
    `).join('');
}

// Vykreslení týmu
function renderTeam() {
    const container = document.querySelector('.team-grid');
    if (!container) return;
    
    container.innerHTML = websiteData.team.map((member, index) => `
        <div class="team-card" data-aos="fade-up" data-aos-delay="${index * 100}">
            <div class="team-image">
                <img src="${member.image}" alt="${member.name}">
                <div class="team-overlay">
                    <div class="team-social">
                        ${member.instagram ? `
                            <a href="${member.instagram}" aria-label="Instagram">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                                </svg>
                            </a>
                        ` : ''}
                        ${member.youtube ? `
                            <a href="${member.youtube}" aria-label="YouTube">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                </svg>
                            </a>
                        ` : ''}
                        ${member.behance ? `
                            <a href="${member.behance}" aria-label="Behance">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M6.5 4.5h3.5c1.1 0 2 .9 2 2v1c0 1.1-.9 2-2 2H6.5V4.5zm0 6.5h3.5c1.38 0 2.5 1.12 2.5 2.5v1c0 1.38-1.12 2.5-2.5 2.5H6.5V11zM0 0v24h13.5c2.76 0 5-2.24 5-5v-1c0-1.68-.83-3.17-2.09-4.09C17.67 12.83 18.5 11.34 18.5 9.5v-1c0-2.76-2.24-5-5-5H0zm15 6h6v1.5h-6V6z"/>
                                </svg>
                            </a>
                        ` : ''}
                    </div>
                </div>
            </div>
            <div class="team-info">
                <h3>${member.name}</h3>
                <p class="team-role">${member.role}</p>
                <p class="team-description">${member.description}</p>
                <div class="team-skills">
                    ${member.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                </div>
            </div>
        </div>
    `).join('');
}

// Inicializace po načtení stránky
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadWebsiteData);
} else {
    loadWebsiteData();
}
