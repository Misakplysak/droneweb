// Global state
let currentData = {
    services: [],
    videos: [],
    featuredPhotos: [],
    photoAlbums: [],
    pricing: [],
    team: []
};

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    setupNavigation();
    loadAllData();
    setupFormHandlers();
});

// Navigation
function setupNavigation() {
    const tabs = document.querySelectorAll('.nav-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const sectionId = tab.dataset.section;
            switchSection(sectionId);
        });
    });
}

function switchSection(sectionId) {
    // Update tabs
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.classList.toggle('active', tab.dataset.section === sectionId);
    });
    
    // Update sections
    document.querySelectorAll('.admin-section').forEach(section => {
        section.classList.toggle('active', section.id === sectionId);
    });
}

// Load all data
async function loadAllData() {
    try {
        const [services, videos, featuredPhotos, photoAlbums, pricing, team] = await Promise.all([
            fetch('data/services.json').then(r => r.json()),
            fetch('data/videos.json').then(r => r.json()),
            fetch('data/featured-photos.json').then(r => r.json()),
            fetch('data/photo-albums.json').then(r => r.json()),
            fetch('data/pricing.json').then(r => r.json()),
            fetch('data/team.json').then(r => r.json())
        ]);
        
        currentData = { services, videos, featuredPhotos, photoAlbums, pricing, team };
        
        renderServices();
        renderVideos();
        renderFeaturedPhotos();
        renderAlbums();
        renderPricing();
        renderTeam();
    } catch (error) {
        console.error('Error loading data:', error);
        alert('Chyba při načítání dat. Zkontrolujte konzoli.');
    }
}

// Services
function renderServices() {
    const container = document.getElementById('services-list');
    if (currentData.services.length === 0) {
        container.innerHTML = '<div class="empty-state"><h3>Zatím žádné služby</h3><p>Přidejte první službu pomocí tlačítka výše</p></div>';
        return;
    }
    
    container.innerHTML = currentData.services.map(service => `
        <div class="card">
            <div class="card-header">
                <div>
                    <div class="card-title">${service.title}</div>
                </div>
            </div>
            <p class="card-description">${service.description}</p>
            <div class="card-actions">
                <button class="btn btn-secondary" onclick="editService(${service.id})">✏️ Upravit</button>
                <button class="btn btn-danger" onclick="deleteService(${service.id})">🗑️ Smazat</button>
            </div>
        </div>
    `).join('');
}

function openAddServiceModal() {
    document.getElementById('service-modal-title').textContent = 'Přidat službu';
    document.getElementById('service-form').reset();
    document.getElementById('service-id').value = '';
    openModal('service-modal');
}

function editService(id) {
    const service = currentData.services.find(s => s.id === id);
    if (!service) return;
    
    document.getElementById('service-modal-title').textContent = 'Upravit službu';
    document.getElementById('service-id').value = service.id;
    document.getElementById('service-title').value = service.title;
    document.getElementById('service-description').value = service.description;
    document.getElementById('service-icon').value = service.icon || '';
    openModal('service-modal');
}

function deleteService(id) {
    if (!confirm('Opravdu chcete smazat tuto službu?')) return;
    
    currentData.services = currentData.services.filter(s => s.id !== id);
    saveData('services', currentData.services);
    renderServices();
}

// Videos
function renderVideos() {
    const container = document.getElementById('videos-list');
    if (currentData.videos.length === 0) {
        container.innerHTML = '<div class="empty-state"><h3>Zatím žádná videa</h3><p>Přidejte první video pomocí tlačítka výše</p></div>';
        return;
    }
    
    container.innerHTML = currentData.videos.map(video => `
        <div class="card video-card">
            <div class="video-thumbnail" style="background-image: url('https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg')"></div>
            <div class="card-title">${video.title}</div>
            <p class="card-description">YouTube ID: ${video.youtubeId}</p>
            <div class="card-actions">
                <button class="btn btn-secondary" onclick="editVideo(${video.id})">✏️ Upravit</button>
                <button class="btn btn-danger" onclick="deleteVideo(${video.id})">🗑️ Smazat</button>
            </div>
        </div>
    `).join('');
}

function openAddVideoModal() {
    document.getElementById('video-modal-title').textContent = 'Přidat video';
    document.getElementById('video-form').reset();
    document.getElementById('video-id').value = '';
    openModal('video-modal');
}

function editVideo(id) {
    const video = currentData.videos.find(v => v.id === id);
    if (!video) return;
    
    document.getElementById('video-modal-title').textContent = 'Upravit video';
    document.getElementById('video-id').value = video.id;
    document.getElementById('video-title').value = video.title;
    document.getElementById('video-youtubeId').value = video.youtubeId;
    openModal('video-modal');
}

function deleteVideo(id) {
    if (!confirm('Opravdu chcete smazat toto video?')) return;
    
    currentData.videos = currentData.videos.filter(v => v.id !== id);
    saveData('videos', currentData.videos);
    renderVideos();
}

// Featured Photos
function renderFeaturedPhotos() {
    const container = document.getElementById('featured-photos-list');
    if (currentData.featuredPhotos.length === 0) {
        container.innerHTML = '<div class="empty-state"><h3>Zatím žádné fotky</h3><p>Přidejte první fotku pomocí tlačítka výše</p></div>';
        return;
    }
    
    container.innerHTML = currentData.featuredPhotos.map(photo => `
        <div class="card">
            <div class="video-thumbnail" style="background-image: url('${photo.thumbnailUrl}')"></div>
            <div class="card-title">${photo.title}</div>
            <p class="card-description">${photo.subtitle}</p>
            <div class="card-actions">
                <button class="btn btn-secondary" onclick="editFeaturedPhoto(${photo.id})">✏️ Upravit</button>
                <button class="btn btn-danger" onclick="deleteFeaturedPhoto(${photo.id})">🗑️ Smazat</button>
            </div>
        </div>
    `).join('');
}

function openAddFeaturedPhotoModal() {
    document.getElementById('featured-photo-modal-title').textContent = 'Přidat vybranou fotku';
    document.getElementById('featured-photo-form').reset();
    document.getElementById('featured-photo-id').value = '';
    openModal('featured-photo-modal');
}

function editFeaturedPhoto(id) {
    const photo = currentData.featuredPhotos.find(p => p.id === id);
    if (!photo) return;
    
    document.getElementById('featured-photo-modal-title').textContent = 'Upravit fotku';
    document.getElementById('featured-photo-id').value = photo.id;
    document.getElementById('featured-photo-title').value = photo.title;
    document.getElementById('featured-photo-subtitle').value = photo.subtitle;
    document.getElementById('featured-photo-imageUrl').value = photo.imageUrl;
    document.getElementById('featured-photo-thumbnailUrl').value = photo.thumbnailUrl;
    openModal('featured-photo-modal');
}

function deleteFeaturedPhoto(id) {
    if (!confirm('Opravdu chcete smazat tuto fotku?')) return;
    
    currentData.featuredPhotos = currentData.featuredPhotos.filter(p => p.id !== id);
    saveData('featuredPhotos', currentData.featuredPhotos);
    renderFeaturedPhotos();
}

// Albums
function renderAlbums() {
    const container = document.getElementById('albums-list');
    if (currentData.photoAlbums.length === 0) {
        container.innerHTML = '<div class="empty-state"><h3>Zatím žádná alba</h3><p>Přidejte první album pomocí tlačítka výše</p></div>';
        return;
    }
    
    container.innerHTML = currentData.photoAlbums.map(album => `
        <div class="card">
            <div class="video-thumbnail" style="background-image: url('${album.coverImage}')"></div>
            <div class="card-title">${album.title}</div>
            <p class="card-description">${album.photoCount} fotografií | Slug: ${album.albumSlug}</p>
            <div class="card-actions">
                <button class="btn btn-secondary" onclick="editAlbum(${album.id})">✏️ Upravit</button>
                <button class="btn btn-danger" onclick="deleteAlbum(${album.id})">🗑️ Smazat</button>
            </div>
        </div>
    `).join('');
}

function openAddAlbumModal() {
    document.getElementById('album-modal-title').textContent = 'Přidat album';
    document.getElementById('album-form').reset();
    document.getElementById('album-id').value = '';
    openModal('album-modal');
}

function editAlbum(id) {
    const album = currentData.photoAlbums.find(a => a.id === id);
    if (!album) return;
    
    document.getElementById('album-modal-title').textContent = 'Upravit album';
    document.getElementById('album-id').value = album.id;
    document.getElementById('album-title').value = album.title;
    document.getElementById('album-photoCount').value = album.photoCount;
    document.getElementById('album-coverImage').value = album.coverImage;
    document.getElementById('album-albumSlug').value = album.albumSlug;
    openModal('album-modal');
}

function deleteAlbum(id) {
    if (!confirm('Opravdu chcete smazat toto album?')) return;
    
    currentData.photoAlbums = currentData.photoAlbums.filter(a => a.id !== id);
    saveData('photoAlbums', currentData.photoAlbums);
    renderAlbums();
}

// Pricing
function renderPricing() {
    const container = document.getElementById('pricing-list');
    if (currentData.pricing.length === 0) {
        container.innerHTML = '<div class="empty-state"><h3>Zatím žádný ceník</h3><p>Přidejte první položku pomocí tlačítka výše</p></div>';
        return;
    }
    
    container.innerHTML = currentData.pricing.map(price => `
        <div class="card">
            <div class="card-header">
                <div class="card-title">${price.title}</div>
                ${price.featured ? '<span class="badge badge-success">Nejoblíbenější</span>' : ''}
            </div>
            <div class="price-display">${price.price}</div>
            <ul class="features-list">
                ${price.features.map(f => `<li>${f}</li>`).join('')}
            </ul>
            <div class="card-actions">
                <button class="btn btn-secondary" onclick="editPricing(${price.id})">✏️ Upravit</button>
                <button class="btn btn-danger" onclick="deletePricing(${price.id})">🗑️ Smazat</button>
            </div>
        </div>
    `).join('');
}

function openAddPricingModal() {
    document.getElementById('pricing-modal-title').textContent = 'Přidat ceník';
    document.getElementById('pricing-form').reset();
    document.getElementById('pricing-id').value = '';
    document.getElementById('pricing-features-container').innerHTML = '';
    addPricingFeature();
    openModal('pricing-modal');
}

function editPricing(id) {
    const pricing = currentData.pricing.find(p => p.id === id);
    if (!pricing) return;
    
    document.getElementById('pricing-modal-title').textContent = 'Upravit ceník';
    document.getElementById('pricing-id').value = pricing.id;
    document.getElementById('pricing-title').value = pricing.title;
    document.getElementById('pricing-price').value = pricing.price;
    document.getElementById('pricing-featured').checked = pricing.featured;
    
    const container = document.getElementById('pricing-features-container');
    container.innerHTML = '';
    pricing.features.forEach(feature => {
        addPricingFeature(feature);
    });
    
    openModal('pricing-modal');
}

function deletePricing(id) {
    if (!confirm('Opravdu chcete smazat tuto položku?')) return;
    
    currentData.pricing = currentData.pricing.filter(p => p.id !== id);
    saveData('pricing', currentData.pricing);
    renderPricing();
}

function addPricingFeature(value = '') {
    const container = document.getElementById('pricing-features-container');
    const div = document.createElement('div');
    div.className = 'form-array-item';
    div.innerHTML = `
        <input type="text" class="pricing-feature" value="${value}" placeholder="Vlastnost" required>
        <button type="button" class="btn btn-danger" onclick="this.parentElement.remove()">✕</button>
    `;
    container.appendChild(div);
}

// Team
function renderTeam() {
    const container = document.getElementById('team-list');
    if (currentData.team.length === 0) {
        container.innerHTML = '<div class="empty-state"><h3>Zatím žádní členové týmu</h3><p>Přidejte prvního člena pomocí tlačítka výše</p></div>';
        return;
    }
    
    container.innerHTML = currentData.team.map(member => `
        <div class="card">
            <div class="team-image" style="background-image: url('${member.image}')"></div>
            <div class="card-title">${member.name}</div>
            <p class="card-description"><strong>${member.role}</strong><br>${member.description}</p>
            <div class="skills-list">
                ${member.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
            </div>
            <div class="card-actions">
                <button class="btn btn-secondary" onclick="editTeam(${member.id})">✏️ Upravit</button>
                <button class="btn btn-danger" onclick="deleteTeam(${member.id})">🗑️ Smazat</button>
            </div>
        </div>
    `).join('');
}

function openAddTeamModal() {
    document.getElementById('team-modal-title').textContent = 'Přidat člena týmu';
    document.getElementById('team-form').reset();
    document.getElementById('team-id').value = '';
    document.getElementById('team-skills-container').innerHTML = '';
    addTeamSkill();
    openModal('team-modal');
}

function editTeam(id) {
    const member = currentData.team.find(m => m.id === id);
    if (!member) return;
    
    document.getElementById('team-modal-title').textContent = 'Upravit člena týmu';
    document.getElementById('team-id').value = member.id;
    document.getElementById('team-name').value = member.name;
    document.getElementById('team-role').value = member.role;
    document.getElementById('team-description').value = member.description;
    document.getElementById('team-image').value = member.image;
    document.getElementById('team-instagram').value = member.instagram || '';
    document.getElementById('team-youtube').value = member.youtube || '';
    document.getElementById('team-behance').value = member.behance || '';
    
    const container = document.getElementById('team-skills-container');
    container.innerHTML = '';
    member.skills.forEach(skill => {
        addTeamSkill(skill);
    });
    
    openModal('team-modal');
}

function deleteTeam(id) {
    if (!confirm('Opravdu chcete smazat tohoto člena týmu?')) return;
    
    currentData.team = currentData.team.filter(m => m.id !== id);
    saveData('team', currentData.team);
    renderTeam();
}

function addTeamSkill(value = '') {
    const container = document.getElementById('team-skills-container');
    const div = document.createElement('div');
    div.className = 'form-array-item';
    div.innerHTML = `
        <input type="text" class="team-skill" value="${value}" placeholder="Dovednost" required>
        <button type="button" class="btn btn-danger" onclick="this.parentElement.remove()">✕</button>
    `;
    container.appendChild(div);
}

// Form handlers
function setupFormHandlers() {
    // Service form
    document.getElementById('service-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const id = document.getElementById('service-id').value;
        const data = {
            id: id ? parseInt(id) : getNextId(currentData.services),
            title: document.getElementById('service-title').value,
            description: document.getElementById('service-description').value,
            icon: document.getElementById('service-icon').value || 'image'
        };
        
        if (id) {
            const index = currentData.services.findIndex(s => s.id === parseInt(id));
            currentData.services[index] = data;
        } else {
            currentData.services.push(data);
        }
        
        saveData('services', currentData.services);
        renderServices();
        closeModal('service-modal');
    });
    
    // Video form
    document.getElementById('video-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const id = document.getElementById('video-id').value;
        const data = {
            id: id ? parseInt(id) : getNextId(currentData.videos),
            title: document.getElementById('video-title').value,
            youtubeId: document.getElementById('video-youtubeId').value
        };
        
        if (id) {
            const index = currentData.videos.findIndex(v => v.id === parseInt(id));
            currentData.videos[index] = data;
        } else {
            currentData.videos.push(data);
        }
        
        saveData('videos', currentData.videos);
        renderVideos();
        closeModal('video-modal');
    });
    
    // Featured photo form
    document.getElementById('featured-photo-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const id = document.getElementById('featured-photo-id').value;
        const data = {
            id: id ? parseInt(id) : getNextId(currentData.featuredPhotos),
            title: document.getElementById('featured-photo-title').value,
            subtitle: document.getElementById('featured-photo-subtitle').value,
            imageUrl: document.getElementById('featured-photo-imageUrl').value,
            thumbnailUrl: document.getElementById('featured-photo-thumbnailUrl').value
        };
        
        if (id) {
            const index = currentData.featuredPhotos.findIndex(p => p.id === parseInt(id));
            currentData.featuredPhotos[index] = data;
        } else {
            currentData.featuredPhotos.push(data);
        }
        
        saveData('featuredPhotos', currentData.featuredPhotos);
        renderFeaturedPhotos();
        closeModal('featured-photo-modal');
    });
    
    // Album form
    document.getElementById('album-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const id = document.getElementById('album-id').value;
        const data = {
            id: id ? parseInt(id) : getNextId(currentData.photoAlbums),
            title: document.getElementById('album-title').value,
            photoCount: parseInt(document.getElementById('album-photoCount').value),
            coverImage: document.getElementById('album-coverImage').value,
            albumSlug: document.getElementById('album-albumSlug').value
        };
        
        if (id) {
            const index = currentData.photoAlbums.findIndex(a => a.id === parseInt(id));
            currentData.photoAlbums[index] = data;
        } else {
            currentData.photoAlbums.push(data);
        }
        
        saveData('photoAlbums', currentData.photoAlbums);
        renderAlbums();
        closeModal('album-modal');
    });
    
    // Pricing form
    document.getElementById('pricing-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const id = document.getElementById('pricing-id').value;
        const features = Array.from(document.querySelectorAll('.pricing-feature')).map(input => input.value);
        
        const data = {
            id: id ? parseInt(id) : getNextId(currentData.pricing),
            title: document.getElementById('pricing-title').value,
            price: parseInt(document.getElementById('pricing-price').value),
            featured: document.getElementById('pricing-featured').checked,
            features: features
        };
        
        if (id) {
            const index = currentData.pricing.findIndex(p => p.id === parseInt(id));
            currentData.pricing[index] = data;
        } else {
            currentData.pricing.push(data);
        }
        
        saveData('pricing', currentData.pricing);
        renderPricing();
        closeModal('pricing-modal');
    });
    
    // Team form
    document.getElementById('team-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const id = document.getElementById('team-id').value;
        const skills = Array.from(document.querySelectorAll('.team-skill')).map(input => input.value);
        
        const data = {
            id: id ? parseInt(id) : getNextId(currentData.team),
            name: document.getElementById('team-name').value,
            role: document.getElementById('team-role').value,
            description: document.getElementById('team-description').value,
            image: document.getElementById('team-image').value,
            skills: skills,
            instagram: document.getElementById('team-instagram').value || '#',
            youtube: document.getElementById('team-youtube').value || '#',
            behance: document.getElementById('team-behance').value || '#'
        };
        
        if (id) {
            const index = currentData.team.findIndex(m => m.id === parseInt(id));
            currentData.team[index] = data;
        } else {
            currentData.team.push(data);
        }
        
        saveData('team', currentData.team);
        renderTeam();
        closeModal('team-modal');
    });
}

// Modal helpers
function openModal(modalId) {
    document.getElementById(modalId).classList.add('active');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

// Save data directly to file
async function saveData(type, data) {
    const filename = {
        services: 'services.json',
        videos: 'videos.json',
        featuredPhotos: 'featured-photos.json',
        photoAlbums: 'photo-albums.json',
        pricing: 'pricing.json',
        team: 'team.json'
    }[type];
    
    const json = JSON.stringify(data, null, 2);
    
    try {
        // Try to use File System Access API (Chrome/Edge)
        if ('showSaveFilePicker' in window) {
            const handle = await window.showSaveFilePicker({
                suggestedName: filename,
                startIn: 'downloads',
                types: [{
                    description: 'JSON Files',
                    accept: {'application/json': ['.json']}
                }]
            });
            
            const writable = await handle.createWritable();
            await writable.write(json);
            await writable.close();
            
            alert(`✅ Soubor ${filename} byl uložen!\n\n⚠️ DŮLEŽITÉ:\n1. Přesuňte soubor do admin/data/${filename}\n2. Commitněte změny (git add, commit, push)`);
        } else {
            // Fallback: download file
            const blob = new Blob([json], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            a.click();
            URL.revokeObjectURL(url);
            
            alert(`✅ Soubor ${filename} byl stažen!\n\n⚠️ DŮLEŽITÉ:\n1. Přesuňte soubor do admin/data/${filename}\n2. Commitněte změny (git add, commit, push)\n\nTip: Použijte Chrome/Edge pro automatické ukládání do správné složky.`);
        }
    } catch (err) {
        if (err.name !== 'AbortError') {
            console.error('Error saving file:', err);
            alert('Chyba při ukládání souboru. Zkuste to znovu.');
        }
    }
}

// Helpers
function getNextId(array) {
    return array.length > 0 ? Math.max(...array.map(item => item.id)) + 1 : 1;
}
