/**
 * Smart Ring Homepage Animation Initializer
 * Automatically applies animation classes to homepage elements.
 */

document.addEventListener('DOMContentLoaded', function() {
  // Only run on homepage
  if (!document.body.classList.contains('template-index')) return;

  // Apply animation classes to elements
  applyAnimationClasses();
  
  // Setup intersection observer for scroll animations
  setupScrollAnimations();
});

function applyAnimationClasses() {
  // Hero banner elements
  const heroBanner = document.querySelector('.banner');
  if (heroBanner) {
    heroBanner.classList.add('sr-hero-content');
    
    const heroHeading = heroBanner.querySelector('.banner__heading');
    const heroText = heroBanner.querySelector('.banner__text');
    const heroButtons = heroBanner.querySelector('.banner__buttons');
    
    if (heroHeading) heroHeading.classList.add('sr-animate-fade', 'sr-stagger-1');
    if (heroText) heroText.classList.add('sr-animate-fade', 'sr-stagger-2');
    if (heroButtons) heroButtons.classList.add('sr-animate-fade', 'sr-stagger-3');
  }

  // Feature cards
  const featureCards = document.querySelectorAll('.multicolumn-card');
  featureCards.forEach((card, index) => {
    card.classList.add('sr-animate-slide-up', 'sr-hover-lift', `sr-stagger-${index + 1}`);
  });

  // Product cards
  const productCards = document.querySelectorAll('.product-card-wrapper, .card-wrapper');
  productCards.forEach((card, index) => {
    card.classList.add('sr-card', 'sr-animate-scale', `sr-stagger-${(index % 4) + 1}`);
  });

  // Statistics elements
  const statsElements = document.querySelectorAll('.multicolumn-list__item');
  statsElements.forEach((stat, index) => {
    stat.classList.add('sr-animate-slide-up', 'sr-hover-scale', `sr-stagger-${index + 1}`);
    
    // Add counter class to number elements
    const numberElement = stat.querySelector('h3, .multicolumn-card__title');
    if (numberElement && /\d/.test(numberElement.textContent)) {
      numberElement.classList.add('sr-stats-counter');
    }
  });

  // Video elements
  const videoElements = document.querySelectorAll('.video-section__media, .deferred-media');
  videoElements.forEach(video => {
    video.classList.add('sr-video-container');
    
    const playButton = video.querySelector('.deferred-media__poster-button');
    if (playButton) {
      playButton.classList.add('sr-video-play-button', 'sr-pulse');
    }
  });

  // Buttons
  const buttons = document.querySelectorAll('.btn, .button');
  buttons.forEach(button => {
    button.classList.add('sr-button-enhanced');
  });

  // Newsletter form
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.classList.add('sr-newsletter-form');
    
    const newsletterInput = newsletterForm.querySelector('input[type="email"]');
    if (newsletterInput) {
      newsletterInput.classList.add('sr-newsletter-input', 'sr-glow');
    }
  }

  // Testimonial cards
  const testimonialCards = document.querySelectorAll('.multicolumn-card');
  const testimonialSection = document.querySelector('[data-section-type="testimonials"]');
  if (testimonialSection) {
    testimonialCards.forEach((card, index) => {
      card.classList.add('sr-animate-slide-up', 'sr-hover-lift', `sr-stagger-${index + 1}`);
    });
  }

  // Rich text sections
  const richTextSections = document.querySelectorAll('.rich-text');
  richTextSections.forEach(section => {
    const heading = section.querySelector('.rich-text__heading');
    const text = section.querySelector('.rich-text__text');
    
    if (heading) heading.classList.add('sr-animate-fade');
    if (text) text.classList.add('sr-animate-slide-up', 'sr-stagger-2');
  });

  // Slideshow elements
  const slideshowElements = document.querySelectorAll('.slideshow__slide');
  slideshowElements.forEach(slide => {
    slide.classList.add('sr-animate-fade');
  });

  // Image banners
  const imageBanners = document.querySelectorAll('.banner:not(.banner--mobile-bottom)');
  imageBanners.forEach(banner => {
    const bannerContent = banner.querySelector('.banner__content');
    if (bannerContent) {
      bannerContent.classList.add('sr-animate-slide-right');
    }
  });
}

function setupScrollAnimations() {
  const animatedElements = document.querySelectorAll('.sr-animate-fade, .sr-animate-slide-up, .sr-animate-slide-left, .sr-animate-slide-right, .sr-animate-scale');
  
  if (!animatedElements.length) return;

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('sr-visible');
        
        // Trigger counter animation for stats
        if (entry.target.classList.contains('sr-stats-counter')) {
          animateCounter(entry.target);
        }
        
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animatedElements.forEach((element) => {
    observer.observe(element);
  });
}

function animateCounter(element) {
  const text = element.textContent;
  const numbers = text.match(/\d+(\.\d+)?/);
  
  if (!numbers) return;
  
  const targetNumber = parseFloat(numbers[0]);
  const suffix = text.replace(/[\d.]/g, '');
  const duration = 2000;
  const increment = targetNumber / (duration / 16);
  let current = 0;
  
  const updateCounter = () => {
    current += increment;
    if (current < targetNumber) {
      element.textContent = Math.floor(current) + suffix;
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = text; // Reset to original text
    }
  };
  
  updateCounter();
}

// Add CSS for loading states
const loadingStyles = `
  <style>
    .sr-loading-state {
      opacity: 0.5;
      pointer-events: none;
    }
    
    .sr-loaded {
      opacity: 1;
      pointer-events: auto;
      transition: opacity 0.3s ease;
    }
    
    /* Ensure elements are hidden before animation */
    .sr-animate-fade:not(.sr-visible) { opacity: 0; }
    .sr-animate-slide-up:not(.sr-visible) { opacity: 0; transform: translateY(30px); }
    .sr-animate-slide-left:not(.sr-visible) { opacity: 0; transform: translateX(-50px); }
    .sr-animate-slide-right:not(.sr-visible) { opacity: 0; transform: translateX(50px); }
    .sr-animate-scale:not(.sr-visible) { opacity: 0; transform: scale(0.8); }
  </style>
`;

document.head.insertAdjacentHTML('beforeend', loadingStyles);
