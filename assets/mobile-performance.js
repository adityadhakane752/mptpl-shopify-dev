// Mobile Performance Optimizations for Dark Theme

document.addEventListener('DOMContentLoaded', function() {
  // Optimize for mobile performance
  optimizeMobilePerformance();
  
  // Enhance mobile interactions
  enhanceMobileInteractions();
  
  // Implement lazy loading for images
  implementLazyLoading();
  
  // Add touch optimizations
  addTouchOptimizations();
  
  // Optimize scroll performance
  optimizeScrollPerformance();
});

function optimizeMobilePerformance() {
  // Reduce animation complexity on mobile
  if (window.innerWidth <= 750) {
    document.documentElement.style.setProperty('--animation-duration', '0.2s');
    
    // Disable expensive animations on older devices
    const userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.indexOf('android') > -1 && userAgent.indexOf('chrome') === -1) {
      document.body.classList.add('reduce-motion');
    }
  }
  
  // Optimize font loading
  if ('FontFace' in window) {
    // Load fonts asynchronously
    const fonts = [
      'frutiger_serif_n3',
      'newsreader_i4'
    ];
    
    fonts.forEach(font => {
      const fontFace = new FontFace(font, `url(/assets/fonts/${font}.woff2)`, {
        display: 'swap'
      });
      
      fontFace.load().then(loadedFont => {
        document.fonts.add(loadedFont);
      });
    });
  }
}

function enhanceMobileInteractions() {
  // Add ripple effect to buttons
  const buttons = document.querySelectorAll('.button');
  buttons.forEach(button => {
    button.addEventListener('touchstart', function(e) {
      if (!this.querySelector('.ripple')) {
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        this.appendChild(ripple);
        
        setTimeout(() => {
          ripple.remove();
        }, 600);
      }
    });
  });
  
  // Improve card interactions
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.addEventListener('touchstart', function() {
      this.style.transform = 'scale(0.98)';
    });
    
    card.addEventListener('touchend', function() {
      this.style.transform = '';
    });
  });
  
  // Enhanced mobile menu
  const menuToggle = document.querySelector('[data-menu-toggle]');
  if (menuToggle) {
    menuToggle.addEventListener('touchstart', function(e) {
      e.preventDefault();
      this.classList.add('touched');
      
      setTimeout(() => {
        this.classList.remove('touched');
      }, 300);
    });
  }
}

function implementLazyLoading() {
  // Lazy load images for better performance
  const images = document.querySelectorAll('img[data-src]');
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        imageObserver.unobserve(img);
      }
    });
  });
  
  images.forEach(img => imageObserver.observe(img));
  
  // Lazy load background images
  const bgImages = document.querySelectorAll('[data-bg]');
  const bgObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        element.style.backgroundImage = `url(${element.dataset.bg})`;
        element.classList.add('loaded');
        bgObserver.unobserve(element);
      }
    });
  });
  
  bgImages.forEach(bg => bgObserver.observe(bg));
}

function addTouchOptimizations() {
  // Prevent 300ms click delay on mobile
  let touchStartTime = 0;
  
  document.addEventListener('touchstart', function() {
    touchStartTime = Date.now();
  });
  
  document.addEventListener('touchend', function(e) {
    const touchEndTime = Date.now();
    const touchDuration = touchEndTime - touchStartTime;
    
    if (touchDuration < 150) {
      e.target.click();
      e.preventDefault();
    }
  });
  
  // Improve swipe gestures for product galleries
  const galleries = document.querySelectorAll('.product__media-wrapper');
  galleries.forEach(gallery => {
    let startX = 0;
    let currentX = 0;
    
    gallery.addEventListener('touchstart', function(e) {
      startX = e.touches[0].clientX;
    });
    
    gallery.addEventListener('touchmove', function(e) {
      if (!startX) return;
      currentX = e.touches[0].clientX;
      const diffX = startX - currentX;
      
      if (Math.abs(diffX) > 50) {
        // Trigger swipe action
        if (diffX > 0) {
          // Swipe left - next image
          const nextBtn = gallery.querySelector('.slider-button--next');
          if (nextBtn) nextBtn.click();
        } else {
          // Swipe right - previous image
          const prevBtn = gallery.querySelector('.slider-button--prev');
          if (prevBtn) prevBtn.click();
        }
        startX = 0;
      }
    });
    
    gallery.addEventListener('touchend', function() {
      startX = 0;
    });
  });
}

function optimizeScrollPerformance() {
  // Throttle scroll events
  let ticking = false;
  
  function updateOnScroll() {
    // Update scroll-dependent elements
    updateHeader();
    updateScrollProgress();
    ticking = false;
  }
  
  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateOnScroll);
      ticking = true;
    }
  }
  
  document.addEventListener('scroll', requestTick, { passive: true });
  
  function updateHeader() {
    const header = document.querySelector('.header-wrapper');
    if (header) {
      const scrolled = window.scrollY > 100;
      header.classList.toggle('scrolled', scrolled);
    }
  }
  
  function updateScrollProgress() {
    const progressBar = document.querySelector('.scroll-progress');
    if (progressBar) {
      const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (window.scrollY / windowHeight) * 100;
      progressBar.style.width = `${scrolled}%`;
    }
  }
}

// Optimize viewport height for mobile browsers
function setViewportHeight() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

window.addEventListener('resize', setViewportHeight);
setViewportHeight();

// Optimize image loading for retina displays
function optimizeImageSources() {
  const images = document.querySelectorAll('img[data-sizes]');
  images.forEach(img => {
    const pixelRatio = window.devicePixelRatio || 1;
    if (pixelRatio > 1) {
      const sizes = JSON.parse(img.dataset.sizes);
      const currentSrc = img.src;
      const retinaSize = Math.round(img.offsetWidth * pixelRatio);
      
      // Find the best size for retina display
      const bestSize = sizes.find(size => size >= retinaSize) || sizes[sizes.length - 1];
      const retinaUrl = currentSrc.replace(/(\d+)x/, `${bestSize}x`);
      
      if (retinaUrl !== currentSrc) {
        img.src = retinaUrl;
      }
    }
  });
}

// Initialize image optimization after page load
window.addEventListener('load', optimizeImageSources);

// Add CSS for mobile optimizations
const mobileStyles = `
<style>
.ripple {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.6);
  transform: scale(0);
  animation: ripple 0.6s linear;
  pointer-events: none;
}

@keyframes ripple {
  to {
    transform: scale(4);
    opacity: 0;
  }
}

.button.touched {
  transform: scale(0.95);
  transition: transform 0.1s ease;
}

.card {
  transition: transform 0.2s ease;
}

.scroll-progress {
  position: fixed;
  top: 0;
  left: 0;
  width: 0%;
  height: 3px;
  background: linear-gradient(90deg, #ffffff, #cccccc);
  z-index: 9999;
  transition: width 0.3s ease;
}

.reduce-motion * {
  animation-duration: 0.01ms !important;
  animation-iteration-count: 1 !important;
  transition-duration: 0.01ms !important;
}

.loaded {
  opacity: 1;
  transition: opacity 0.3s ease;
}

@media (max-width: 750px) {
  .mobile-optimized {
    will-change: transform;
    transform: translateZ(0);
  }
  
  .button:active {
    transform: scale(0.95);
  }
  
  .card:active {
    transform: scale(0.98);
  }
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', mobileStyles);

// Add scroll progress bar
document.body.insertAdjacentHTML('afterbegin', '<div class="scroll-progress"></div>');

// Performance monitoring
if ('PerformanceObserver' in window) {
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.entryType === 'largest-contentful-paint') {
        console.log('LCP:', entry.startTime);
      }
      if (entry.entryType === 'cumulative-layout-shift') {
        console.log('CLS:', entry.value);
      }
    }
  });
  
  observer.observe({entryTypes: ['largest-contentful-paint', 'layout-shift']});
}
