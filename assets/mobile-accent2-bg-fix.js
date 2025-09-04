// Mobile Accent-2 Background Enforcer
(function() {
  function isMobile() {
    return window.innerWidth <= 749 || /Mobi|Android/i.test(navigator.userAgent);
  }
  function enforceAccent2Bg() {
    var accentEls = document.querySelectorAll('.color-accent-2, [class*="accent-2"], .banner__box.color-accent-2, .slideshow__text.color-accent-2');
    accentEls.forEach(function(el) {
      el.style.setProperty('background', '#000', 'important');
      el.style.setProperty('background-color', '#000', 'important');
      // Also force text color to white for contrast
      el.style.setProperty('color', '#fff', 'important');
      // For all children
      Array.from(el.querySelectorAll('*')).forEach(function(child) {
        child.style.setProperty('color', '#fff', 'important');
      });
    });
  }
  if (isMobile()) {
    // Initial run after DOMContentLoaded
    document.addEventListener('DOMContentLoaded', function() {
      setTimeout(enforceAccent2Bg, 100); // After initial paint
      setTimeout(enforceAccent2Bg, 1000); // After possible animation
    });
    // Also run after scroll-triggered animations
    document.addEventListener('animationend', enforceAccent2Bg, true);
    document.addEventListener('transitionend', enforceAccent2Bg, true);
    window.addEventListener('resize', function() {
      if (isMobile()) enforceAccent2Bg();
    });
  }
})();
