/**
 * Homepage Animations for Smart Ring Shopify Theme
 * Handles scroll-triggered animations and interactive effects
 */

class SmartRingAnimations {
  constructor() {
    this.init();
  }

  init() {
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setupAnimations());
    } else {
      this.setupAnimations();
    }
  }

  setupAnimations() {
    this.setupScrollAnimations();
    this.setupHoverEffects();
    this.setupButtonAnimations();
    this.setupStatsCounters();
    this.setupFloatingElements();
    this.setupVideoAnimations();
  }

  // Scroll-triggered animations using Intersection Observer
  setupScrollAnimations() {
    const animatedElements = document.querySelectorAll(
    '.multicolumn-card, .product-card-wrapper, .testimonial-card, .stats-item, .rich-text__wrapper'
    );

    if (!animatedElements.length) return;

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    animatedElements.forEach((element) => {
      element.classList.add('animate-on-scroll');
      observer.observe(element);
    });
  }

  // Enhanced hover effects for interactive elements
  setupHoverEffects() {
    // Product cards hover effects
    const productCards = document.querySelectorAll('.product-card-wrapper, .card-wrapper');
    productCards.forEach((card) => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px) scale(1.02)';
        card.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
        card.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
        card.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
      });
    });

    // Feature cards hover effects
    const featureCards = document.querySelectorAll('.multicolumn-card');
    featureCards.forEach((card, index) => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
        card.style.boxShadow = '0 25px 50px rgba(0,0,0,0.15)';
        card.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
      });
    });
  }

  // Button animations and effects
  setupButtonAnimations() {
    const buttons = document.querySelectorAll('.btn, .button, .shopify-payment-button__button');
    
    buttons.forEach((button) => {
      // Ripple effect on click
      button.addEventListener('click', (e) => {
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.height, rect.width);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple-effect');
        
        button.appendChild(ripple);
        
        setTimeout(() => {
          ripple.remove();
        }, 600);
      });

      // Hover effects
      button.addEventListener('mouseenter', () => {
        button.style.transform = 'translateY(-2px)';
        button.style.boxShadow = '0 10px 25px rgba(0,0,0,0.2)';
        button.style.transition = 'all 0.3s ease';
      });

      button.addEventListener('mouseleave', () => {
        button.style.transform = 'translateY(0)';
        button.style.boxShadow = 'initial';
      });
    });
  }

  // Animated counters for statistics
  setupStatsCounters() {
    const statsNumbers = document.querySelectorAll('.stats-number, [data-counter]');
    
    const animateCounter = (element) => {
      const target = parseInt(element.textContent.replace(/[^0-9]/g, ''));
      const duration = 2000; // 2 seconds
      const increment = target / (duration / 16); // 60fps
      let current = 0;
      
      const updateCounter = () => {
        current += increment;
        if (current < target) {
          element.textContent = Math.floor(current) + element.textContent.replace(/[0-9]/g, '').replace(/[0-9.]/g, '');
          requestAnimationFrame(updateCounter);
        } else {
          element.textContent = element.textContent; // Reset to original
        }
      };
      
      updateCounter();
    };

    // Observe stats for counter animation
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    statsNumbers.forEach((stat) => {
      statsObserver.observe(stat);
    });
  }

  // Floating animation for hero elements
  setupFloatingElements() {
    const floatingElements = document.querySelectorAll('.banner__content, .hero-content, .floating-element');
    
    floatingElements.forEach((element) => {
      element.style.animation = 'float 6s ease-in-out infinite';
    });
  }

  // Video section animations
  setupVideoAnimations() {
    const videoElements = document.querySelectorAll('.video-section__media, .deferred-media');
    
    videoElements.forEach((video) => {
      video.addEventListener('mouseenter', () => {
        video.style.transform = 'scale(1.02)';
        video.style.transition = 'transform 0.4s ease';
      });

      video.addEventListener('mouseleave', () => {
        video.style.transform = 'scale(1)';
      });

      // Pulse animation for play button
      const playButton = video.querySelector('.deferred-media__poster-button');
      if (playButton) {
        playButton.style.animation = 'pulse 2s infinite';
      }
    });
  }

  // Newsletter signup glow effect
  setupNewsletterEffects() {
    const newsletterInputs = document.querySelectorAll('.newsletter-form__field-wrapper input');
    
    newsletterInputs.forEach((input) => {
      input.addEventListener('focus', () => {
        input.parentElement.style.animation = 'glow 2s ease-in-out infinite';
      });

      input.addEventListener('blur', () => {
        input.parentElement.style.animation = 'none';
      });
    });
  }

  // Parallax effect for banners
  setupParallaxEffect() {
    const parallaxElements = document.querySelectorAll('.banner, .hero-banner');
    
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      
      parallaxElements.forEach((element) => {
        const rate = scrolled * -0.5;
        element.style.transform = `translateY(${rate}px)`;
      });
    });
  }

  // Smooth scroll for anchor links
  setupSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }
}

// CSS for animations (injected via JavaScript)
const animationStyles = `
  <style>
    .animate-on-scroll {
      opacity: 0;
      transform: translateY(30px);
      transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .animate-on-scroll.animate-in {
      opacity: 1;
      transform: translateY(0);
    }
    
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-15px); }
    }
    
    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.1); }
    }
    
    @keyframes glow {
      0%, 100% { box-shadow: 0 0 20px rgba(255, 255, 255, 0.1); }
      50% { box-shadow: 0 0 40px rgba(255, 255, 255, 0.3); }
    }
    
    .ripple-effect {
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.3);
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
    
    /* Staggered animation delays */
    .multicolumn-card:nth-child(1) { transition-delay: 0.1s; }
    .multicolumn-card:nth-child(2) { transition-delay: 0.2s; }
    .multicolumn-card:nth-child(3) { transition-delay: 0.3s; }
    .multicolumn-card:nth-child(4) { transition-delay: 0.4s; }
    
    /* Mobile responsive adjustments */
    @media (max-width: 768px) {
      .animate-on-scroll {
        transform: translateY(20px);
      }
      
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-8px); }
      }
    }
    
    /* Reduced motion preferences */
    @media (prefers-reduced-motion: reduce) {
      .animate-on-scroll,
      .floating-element,
      .video-section__media,
      .multicolumn-card {
        animation: none;
        transition: none;
      }
    }
  </style>
`;

// Inject styles and initialize animations
document.head.insertAdjacentHTML('beforeend', animationStyles);

// Initialize animations when DOM is ready
const smartRingAnimations = new SmartRingAnimations();

// Export for global access
window.SmartRingAnimations = SmartRingAnimations;
