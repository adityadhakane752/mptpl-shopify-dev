/**
 * Mobile Banner Animation Fix
 * Ensures accent-2 backgrounds stay black even after scroll animations
 */

(function() {
  'use strict';
  
  // Only run on mobile devices
  if (window.innerWidth > 749) return;
  
  // Force black background for accent-2 elements
  function forceAccent2Background() {
    const accent2Elements = document.querySelectorAll([
      '.color-accent-2',
      '.banner__box.color-accent-2',
      '.slideshow__text.color-accent-2',
      '[class*="accent-2"]'
    ].join(', '));
    
    accent2Elements.forEach(element => {
      element.style.backgroundColor = '#000000';
      element.style.background = '#000000';
      element.style.setProperty('background', '#000000', 'important');
      element.style.setProperty('background-color', '#000000', 'important');
    });
  }
  
  // Run immediately
  forceAccent2Background();
  
  // Run after DOM is loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', forceAccent2Background);
  }
  
  // Monitor for scroll animations and override them
  const observeAnimations = new MutationObserver((mutations) => {
    let shouldFix = false;
    
    mutations.forEach((mutation) => {
      if (mutation.type === 'attributes' && 
          (mutation.attributeName === 'class' || mutation.attributeName === 'style')) {
        const target = mutation.target;
        if (target.classList && (
          target.classList.contains('color-accent-2') ||
          target.classList.contains('scroll-trigger') ||
          target.className.includes('accent-2')
        )) {
          shouldFix = true;
        }
      }
    });
    
    if (shouldFix) {
      // Small delay to let animations start, then override
      setTimeout(forceAccent2Background, 10);
      setTimeout(forceAccent2Background, 100);
      setTimeout(forceAccent2Background, 500);
    }
  });
  
  // Start observing
  observeAnimations.observe(document.body, {
    attributes: true,
    subtree: true,
    attributeFilter: ['class', 'style']
  });
  
  // Also run on scroll events (when animations trigger)
  let scrollTimeout;
  window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(forceAccent2Background, 50);
  }, { passive: true });
  
  // Run periodically to ensure backgrounds stay black
  setInterval(forceAccent2Background, 1000);
  
  console.log('Mobile Banner Animation Fix loaded');
})();
