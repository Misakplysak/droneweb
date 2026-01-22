// ========================================
// Theme Toggle
// ========================================

const themeToggle = document.getElementById('themeToggle');
const moonIcon = document.getElementById('moonIcon');
const sunIcon = document.getElementById('sunIcon');
const html = document.documentElement;

// Check for saved theme preference or default to dark mode
const currentTheme = localStorage.getItem('theme') || 'dark';
if (currentTheme === 'light') {
    html.classList.add('light-mode');
    moonIcon.classList.remove('active');
    sunIcon.classList.add('active');
}

// Theme toggle functionality
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        html.classList.toggle('light-mode');
        
        if (html.classList.contains('light-mode')) {
            localStorage.setItem('theme', 'light');
            moonIcon.classList.remove('active');
            sunIcon.classList.add('active');
        } else {
            localStorage.setItem('theme', 'dark');
            moonIcon.classList.add('active');
            sunIcon.classList.remove('active');
        }
    });
}

// ========================================
// Navigation
// ========================================

const navbar = document.getElementById('navbar');
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ========================================
// Intersection Observer for Animations
// ========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
        }
    });
}, observerOptions);

// Observe all elements with data-aos attribute
document.querySelectorAll('[data-aos]').forEach(el => {
    observer.observe(el);
});

// ========================================
// Counter Animation
// ========================================

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    };

    updateCounter();
}

// Observe stat numbers
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                if (!stat.classList.contains('animated')) {
                    stat.classList.add('animated');
                    animateCounter(stat);
                }
            });
            statObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statObserver.observe(statsSection);
}

// ========================================
// Gallery Filtering
// ========================================

const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        const filter = button.getAttribute('data-filter');

        galleryItems.forEach(item => {
            const category = item.getAttribute('data-category');
            
            if (filter === 'all' || category === filter) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 10);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// ========================================
// Gallery Modal
// ========================================

const modal = document.getElementById('galleryModal');
const modalBody = document.getElementById('modalBody');
const modalClose = document.getElementById('modalClose');
const galleryViewBtns = document.querySelectorAll('.gallery-view-btn');

galleryViewBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const type = btn.getAttribute('data-type');
        const src = btn.getAttribute('data-src');

        if (type === 'video' && src) {
            modalBody.innerHTML = `<iframe src="${src}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
            modal.classList.add('active');
        } else if (type === 'image') {
            if (src) {
                modalBody.innerHTML = `<img src="${src}" alt="Náhled" style="width: 100%; border-radius: 16px;">`;
            } else {
                modalBody.innerHTML = `<div style="aspect-ratio: 16/9; background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); border-radius: 16px; display: flex; align-items: center; justify-content: center; font-size: 24px;">Obrázek</div>`;
            }
            modal.classList.add('active');
        }
    });
});

if (modalClose) {
    modalClose.addEventListener('click', () => {
        modal.classList.remove('active');
        modalBody.innerHTML = '';
    });
}

if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            modalBody.innerHTML = '';
        }
    });
}

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
        modal.classList.remove('active');
        if (modalBody) modalBody.innerHTML = '';
    }
});

// ========================================
// Contact Form
// ========================================

const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);

        // Simple validation
        if (!data.name || !data.email || !data.message) {
            showFormMessage('Prosím vyplňte všechna povinná pole.', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showFormMessage('Prosím zadejte platnou emailovou adresu.', 'error');
            return;
        }

        // Disable submit button
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Odesílám...</span>';

        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            showFormMessage('Děkujeme za vaši zprávu! Brzy se vám ozveme.', 'success');
            contactForm.reset();
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }, 1500);

        // For real implementation, use:
        /*
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                showFormMessage('Děkujeme za vaši zprávu! Brzy se vám ozveme.', 'success');
                contactForm.reset();
            } else {
                showFormMessage('Něco se pokazilo. Zkuste to prosím znovu.', 'error');
            }
        } catch (error) {
            showFormMessage('Něco se pokazilo. Zkuste to prosím znovu.', 'error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }
        */
    });
}

function showFormMessage(message, type) {
    if (formMessage) {
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
        
        // Auto-hide success message after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                formMessage.className = 'form-message';
            }, 5000);
        }
    }
}

// ========================================
// FAQ Accordion
// ========================================

const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains('active');

        // Close all FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });

        // Open clicked item if it wasn't active
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// ========================================
// Parallax Effect
// ========================================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    // Hero parallax
    const heroBg = document.querySelector('.hero-bg');
    if (heroBg) {
        heroBg.style.transform = `translateY(${scrolled * 0.5}px) scale(1.1)`;
    }
    
    // Parallax sections
    const parallaxBgs = document.querySelectorAll('.parallax-bg');
    parallaxBgs.forEach(bg => {
        const rect = bg.getBoundingClientRect();
        const scrollPercent = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
        bg.style.transform = `translateY(${scrollPercent * -100}px) scale(1.1)`;
    });
});

// ========================================
// Loading Animation
// ========================================

window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ========================================
// Active Navigation Link
// ========================================

function setActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            if (navLink) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                navLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', setActiveNavLink);

// ========================================
// Performance: Lazy Loading Images
// ========================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ========================================
// Video Gallery
// ========================================

const videoCards = document.querySelectorAll('.video-card');
const videoModal = document.getElementById('videoModal');
const videoModalClose = document.getElementById('videoModalClose');
const videoEmbedContainer = document.getElementById('videoEmbedContainer');

videoCards.forEach(card => {
    card.addEventListener('click', () => {
        const videoId = card.getAttribute('data-video-id');
        if (videoId) {
            openVideo(videoId);
        }
    });
});

function openVideo(videoId) {
    videoEmbedContainer.innerHTML = `
        <iframe 
            src="https://www.youtube.com/embed/${videoId}?autoplay=1" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen>
        </iframe>
    `;
    videoModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

if (videoModalClose) {
    videoModalClose.addEventListener('click', () => {
        closeVideoModal();
    });
}

if (videoModal) {
    videoModal.addEventListener('click', (e) => {
        if (e.target === videoModal) {
            closeVideoModal();
        }
    });
}

function closeVideoModal() {
    videoModal.classList.remove('active');
    videoEmbedContainer.innerHTML = '';
    document.body.style.overflow = '';
}

// Close video modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && videoModal && videoModal.classList.contains('active')) {
        closeVideoModal();
    }
});

// ========================================
// Photo Slider (removed - using custom implementation below)
// ========================================

// ========================================
// Photo Slider with Thumbnails
// ========================================

const photoThumbnails = document.querySelectorAll('#photoSliderThumbnails .slider-thumbnail');
const photoSliderTrack = document.getElementById('photoSliderTrack');
const photoSliderContainer = document.getElementById('photoSliderContainer');

if (photoThumbnails.length > 0 && photoSliderTrack) {
    let currentPhotoSlide = 0;
    const totalPhotoSlides = photoSliderTrack.querySelectorAll('.slider-item').length;

    // Click on thumbnail to navigate
    photoThumbnails.forEach((thumb, index) => {
        thumb.addEventListener('click', () => {
            currentPhotoSlide = index;
            updatePhotoSlider();
            resetAutoplay();
        });
    });

    function updatePhotoSlider() {
        // Update slider position
        photoSliderTrack.style.transform = `translateX(-${currentPhotoSlide * 100}%)`;
        
        // Update active thumbnail
        photoThumbnails.forEach((thumb, index) => {
            thumb.classList.toggle('active', index === currentPhotoSlide);
        });
    }

    function nextPhotoSlide() {
        currentPhotoSlide = (currentPhotoSlide + 1) % totalPhotoSlides;
        updatePhotoSlider();
    }

    function prevPhotoSlide() {
        currentPhotoSlide = (currentPhotoSlide - 1 + totalPhotoSlides) % totalPhotoSlides;
        updatePhotoSlider();
    }

    // Button controls
    const photoSliderPrev = document.getElementById('photoSliderPrev');
    const photoSliderNext = document.getElementById('photoSliderNext');

    if (photoSliderPrev) {
        photoSliderPrev.addEventListener('click', () => {
            prevPhotoSlide();
            resetAutoplay();
        });
    }

    if (photoSliderNext) {
        photoSliderNext.addEventListener('click', () => {
            nextPhotoSlide();
            resetAutoplay();
        });
    }

    // Autoplay
    let autoplayInterval = setInterval(nextPhotoSlide, 5000);

    function resetAutoplay() {
        clearInterval(autoplayInterval);
        autoplayInterval = setInterval(nextPhotoSlide, 5000);
    }

    // Pause on hover
    if (photoSliderContainer) {
        photoSliderContainer.addEventListener('mouseenter', () => {
            clearInterval(autoplayInterval);
        });

        photoSliderContainer.addEventListener('mouseleave', () => {
            resetAutoplay();
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevPhotoSlide();
            resetAutoplay();
        }
        if (e.key === 'ArrowRight') {
            nextPhotoSlide();
            resetAutoplay();
        }
    });

    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    if (photoSliderContainer) {
        photoSliderContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        photoSliderContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handlePhotoSwipe();
            resetAutoplay();
        });
    }

    function handlePhotoSwipe() {
        if (touchEndX < touchStartX - 50) nextPhotoSlide();
        if (touchEndX > touchStartX + 50) prevPhotoSlide();
    }
}

// ========================================
// Album Modal
// ========================================

const albumModal = document.getElementById('albumModal');
const albumModalClose = document.getElementById('albumModalClose');
const albumTitle = document.getElementById('albumTitle');
const albumGallery = document.getElementById('albumGallery');

// Album data
const albums = {
    nemovitosti: {
        title: 'Nemovitosti',
        images: [
            'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=800',
            'https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=800',
            'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800',
            'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800',
            'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800',
            'https://images.unsplash.com/photo-1600607687644-c7171b42498f?q=80&w=800',
            'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=800',
            'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=800',
            'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=800'
        ]
    },
    priroda: {
        title: 'Příroda',
        images: [
            'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=800',
            'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=800',
            'https://images.unsplash.com/photo-1426604966848-d7adac402bff?q=80&w=800',
            'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?q=80&w=800',
            'https://images.unsplash.com/photo-1470770903676-69b98201ea1c?q=80&w=800',
            'https://images.unsplash.com/photo-1511884642898-4c92249e20b6?q=80&w=800',
            'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=800',
            'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=800',
            'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=800'
        ]
    },
    mesta: {
        title: 'Města',
        images: [
            'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=800',
            'https://images.unsplash.com/photo-1514565131-fce0801e5785?q=80&w=800',
            'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?q=80&w=800',
            'https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=800',
            'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=800',
            'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=800',
            'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=800',
            'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=800'
        ]
    },
    sport: {
        title: 'Sport & Akce',
        images: [
            'https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=800',
            'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=800',
            'https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=800',
            'https://images.unsplash.com/photo-1519315901367-f34ff9154487?q=80&w=800',
            'https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?q=80&w=800',
            'https://images.unsplash.com/photo-1530549387789-4c1017266635?q=80&w=800'
        ]
    },
    pobrezi: {
        title: 'Pobřeží',
        images: [
            'https://images.unsplash.com/photo-1470770903676-69b98201ea1c?q=80&w=800',
            'https://images.unsplash.com/photo-1505142468610-359e7d316be0?q=80&w=800',
            'https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=800',
            'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=800',
            'https://images.unsplash.com/photo-1559181567-c3190ca9959b?q=80&w=800',
            'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?q=80&w=800'
        ]
    },
    lesy: {
        title: 'Lesy',
        images: [
            'https://images.unsplash.com/photo-1523906630133-f6934a1ab2b9?q=80&w=800',
            'https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=800',
            'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=800',
            'https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=800',
            'https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=800',
            'https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=800'
        ]
    }
};

// Current album and image index for lightbox
let currentAlbum = null;
let currentImageIndex = 0;

// Open album function (called from HTML onclick)
window.openAlbum = function(albumKey) {
    const album = albums[albumKey];
    if (!album) return;

    currentAlbum = album;
    albumTitle.textContent = album.title;
    albumGallery.innerHTML = '';

    album.images.forEach((imageUrl, index) => {
        const item = document.createElement('div');
        item.className = 'album-gallery-item';
        item.innerHTML = `<img src="${imageUrl}" alt="${album.title} ${index + 1}">`;
        item.addEventListener('click', () => openImageLightbox(index));
        albumGallery.appendChild(item);
    });

    albumModal.classList.add('active');
    document.body.style.overflow = 'hidden';
};

// Close album modal
if (albumModalClose) {
    albumModalClose.addEventListener('click', () => {
        albumModal.classList.remove('active');
        document.body.style.overflow = '';
    });
}

if (albumModal) {
    albumModal.addEventListener('click', (e) => {
        if (e.target === albumModal) {
            albumModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Lightbox slider for full-size images with navigation
function openImageLightbox(index) {
    if (!currentAlbum) return;
    
    currentImageIndex = index;
    
    const lightbox = document.createElement('div');
    lightbox.className = 'image-lightbox';
    lightbox.id = 'imageLightbox';
    
    lightbox.innerHTML = `
        <button class="lightbox-close" id="lightboxClose">&times;</button>
        <div class="lightbox-counter" id="lightboxCounter">${currentImageIndex + 1} / ${currentAlbum.images.length}</div>
        <button class="lightbox-nav lightbox-prev" id="lightboxPrev">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
        </button>
        <div class="lightbox-content">
            <img src="${currentAlbum.images[currentImageIndex]}" alt="${currentAlbum.title} ${currentImageIndex + 1}" id="lightboxImage">
            <div class="lightbox-caption" id="lightboxCaption">${currentAlbum.title.toLowerCase()}-${currentImageIndex + 1}</div>
        </div>
        <button class="lightbox-nav lightbox-next" id="lightboxNext">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
        </button>
    `;

    document.body.appendChild(lightbox);
    document.body.style.overflow = 'hidden';

    // Close button
    document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
    
    // Navigation buttons
    document.getElementById('lightboxPrev').addEventListener('click', (e) => {
        e.stopPropagation();
        navigateLightbox(-1);
    });
    
    document.getElementById('lightboxNext').addEventListener('click', (e) => {
        e.stopPropagation();
        navigateLightbox(1);
    });
    
    // Click outside to close
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
            closeLightbox();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', lightboxKeyHandler);
}

function navigateLightbox(direction) {
    if (!currentAlbum) return;
    
    currentImageIndex += direction;
    
    // Loop around
    if (currentImageIndex < 0) {
        currentImageIndex = currentAlbum.images.length - 1;
    } else if (currentImageIndex >= currentAlbum.images.length) {
        currentImageIndex = 0;
    }
    
    // Update image and counter with slide animation
    const img = document.getElementById('lightboxImage');
    const counter = document.getElementById('lightboxCounter');
    const caption = document.getElementById('lightboxCaption');
    
    if (img && counter && caption) {
        // Remove existing animation classes
        img.classList.remove('slide-in-right', 'slide-in-left');
        
        // Add appropriate slide animation based on direction
        // Use a small delay to trigger the animation
        setTimeout(() => {
            img.src = currentAlbum.images[currentImageIndex];
            img.alt = `${currentAlbum.title} ${currentImageIndex + 1}`;
            
            // Add slide animation class
            if (direction > 0) {
                img.classList.add('slide-in-right');
            } else {
                img.classList.add('slide-in-left');
            }
            
            counter.textContent = `${currentImageIndex + 1} / ${currentAlbum.images.length}`;
            caption.textContent = `${currentAlbum.title.toLowerCase()}-${currentImageIndex + 1}`;
        }, 50);
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('imageLightbox');
    if (lightbox) {
        lightbox.remove();
        document.body.style.overflow = '';
        document.removeEventListener('keydown', lightboxKeyHandler);
    }
}

function lightboxKeyHandler(e) {
    if (e.key === 'Escape') {
        closeLightbox();
    } else if (e.key === 'ArrowLeft') {
        navigateLightbox(-1);
    } else if (e.key === 'ArrowRight') {
        navigateLightbox(1);
    }
}

// ========================================
// Console Message
// ========================================

console.log('%c🚁 Macha Videos', 'color: #3b82f6; font-size: 20px; font-weight: bold;');
console.log('%cProfesionální dronová produkce', 'color: #8b5cf6; font-size: 14px;');
console.log('%cWebsite vytvořen s ❤️', 'color: #a1a1aa; font-size: 12px;');
