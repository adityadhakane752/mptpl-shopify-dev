# Mobile Banner Background Fix - Issue Resolution

## Problem Summary
The website hero section and first slideshow slide were displaying with white backgrounds on real mobile devices (not in desktop dev tools), making the white text invisible. The 2nd and 3rd slideshow slides were working correctly with black backgrounds.

## Root Cause Analysis
The issue was caused by CSS rules in `assets/section-image-banner.css` that were aggressively setting `background: transparent` on mobile devices. Specifically:

1. **Line 231**: `.banner:not(.banner--mobile-bottom):not(.email-signup-banner) .banner__box { background: transparent; }`
2. **Line 337**: `.banner--mobile-bottom:not(.banner--stacked) .banner__box.color-scheme-1 { background: transparent; }`
3. **Line 363**: `.banner--desktop-transparent .banner__box { background: transparent; }` (for desktop transparent mode)

These rules were overriding the `accent-2` color scheme's black background (`#000000`) that should have been applied to maintain contrast with the white text.

## Configuration Context
- Hero section uses: `"color_scheme": "accent-2"`, `"show_text_box": false`, `"show_text_below": true`
- First slideshow slide uses: `"color_scheme": "accent-2"`, `"show_text_box": false`
- `accent-2` color scheme: `background: "#000000"`, `text: "#FFFFFF"`

## Solution Implemented

### 1. Modified `assets/section-image-banner.css`
- **Line 231**: Added `:not(.color-accent-2)` exception to prevent transparent background for accent-2 scheme
- **Line 337**: Added `:not(.color-accent-2)` exception for mobile-bottom banners
- **Line 363**: Added `:not(.color-accent-2)` exception for desktop-transparent banners

### 2. Created `assets/mobile-banner-fix.css`
Added comprehensive CSS fixes with `!important` declarations to ensure accent-2 backgrounds are properly applied:
- Mobile banner fixes for all accent-2 color scheme elements
- Desktop transparent banner fixes for accent-2 scheme
- Slideshow-specific fixes for mobile devices

### 3. Updated Section Templates
- Modified `sections/image-banner.liquid` to include the fix CSS
- Modified `sections/slideshow.liquid` to include the fix CSS

## Technical Details
The solution uses CSS specificity and `!important` declarations to override the problematic transparent background rules specifically for elements using the `accent-2` color scheme, while preserving the existing behavior for other color schemes.

## Files Modified
1. `assets/section-image-banner.css` - Modified existing rules to exclude accent-2
2. `assets/mobile-banner-fix.css` - New CSS file with comprehensive fixes  
3. `sections/image-banner.liquid` - Added CSS include
4. `sections/slideshow.liquid` - Added CSS include

## Testing Recommendations
1. Test on actual mobile devices (not just dev tools)
2. Verify hero section shows black background with white text
3. Verify first slideshow slide shows black background with white text
4. Verify 2nd and 3rd slides continue working correctly
5. Test on various screen sizes and orientations
6. Verify desktop functionality remains unchanged

## Why 2nd and 3rd Slides Worked
The 2nd and 3rd slideshow slides likely worked because they may have had different settings or the CSS specificity worked differently for subsequent slides in the slideshow component.
