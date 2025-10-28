# EM Block Collection

**Project:** EM Block Collection  
**Author:** [esmondmccain.com](https://esmondmccain.com/)  
**Version:** 0.1.0  
**Requires WordPress:** 6.1+  
**Requires PHP:** 7.0+

## Overview

EM Block Collection is a professional WordPress plugin that adds custom Gutenberg blocks to your site. Create engaging, interactive content with modern, responsive blocks designed for optimal user experience and performance.

## Included Blocks

All blocks are organized under the **"EM Blocks"** category for easy discovery.

### **EM Carousel**
- **Purpose:** Display posts in a responsive, scrollable carousel
- **Features:** 
  - Customizable post count and categories
  - Show/hide excerpts and featured images
  - Slick carousel integration
  - Mobile-responsive design
- **Category:** EM Blocks

### **EM FAQ Accordion**
- **Purpose:** Display frequently asked questions in an interactive accordion
- **Features:**
  - Add unlimited FAQ items
  - Smooth expand/collapse animations
  - Clean, accessible design
  - Easy content management
- **Category:** EM Blocks

### **EM Posts Grid**
- **Purpose:** Show posts in customizable grid or list layouts
- **Features:**
  - Multiple layout options (grid/list)
  - Featured image display options
  - Excerpt length control
  - Post date and meta display
  - Custom post type support
- **Category:** EM Blocks

### **EM Spacer + Divider Pro** 
- **Purpose:** Add customizable spacing and dividers between content sections
- **Features:**
  - Flexible spacing controls (top/bottom)
  - Advanced divider options with 6 styles (solid, dashed, dotted, double, groove, ridge)
  - Full color picker with alpha support
  - Position control (top, center, bottom)
  - Length and alignment customization
  - Custom CSS class support
- **Category:** EM Blocks

## Features

- **Unified Block Category:** All blocks organized under "EM Blocks" for better discoverability
- **Responsive Design:** Mobile-first approach for all devices
- **Performance Optimized:** Server-side rendering for fast loading
- **Professional Architecture:** Clean, object-oriented codebase
- **WordPress Standards:** Follows modern WordPress development best practices
- **Customizable:** Extensive options and settings for each block
- **Accessible:** Built with accessibility in mind

## Installation

### Method 1: WordPress Admin (Recommended)
1. Download the `em-block-collection.zip` file
2. In WordPress admin, go to **Plugins > Add New > Upload Plugin**
3. Select the zip file and click **Install Now**
4. Click **Activate** to enable the plugin

### Method 2: Manual Installation
1. Download or clone the plugin folder
2. Upload to your WordPress `wp-content/plugins` directory
3. Go to **Plugins** in WordPress admin and activate **EM Block Collection**

## Usage

1. **Add Blocks:** In the WordPress block editor, click the **+** button
2. **Find EM Blocks:** Look for the **"EM Blocks"** category or search for "EM"
3. **Select Block:** Choose from Carousel, FAQ Accordion, Posts Grid, or Spacer + Divider Pro
4. **Customize:** Use the block settings panel to configure options
5. **Publish:** Save your page/post to see the blocks in action

## Development

### Requirements
- Node.js 16+
- npm 7+
- WordPress 6.1+
- PHP 7.0+

### Building Blocks
```bash
# Install dependencies
npm install

# Build for production
npm run build

# Development build with watch
npm run start
```

### File Structure
```
em-block-collection/
├── src/                 # Source files
│   ├── carousel/        # Carousel block
│   ├── faq-accordion/   # FAQ accordion block
│   ├── posts-grid/      # Posts grid block
│   └── spacer-divider/  # Spacer + divider block
├── build/               # Compiled files
├── includes/classes/    # PHP block classes
└── assets/              # Static assets
```

## Customization

### Styling
- Edit SCSS files in `src/[block-name]/style.scss`
- Rebuild with `npm run build`

### Advanced Customization
- Modify PHP classes in `includes/classes/`
- Edit JavaScript in `src/[block-name]/edit.js`

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Internet Explorer 11+ (limited support)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Changelog

### Version 0.1.0
- ✅ Initial release
- ✅ EM Carousel block
- ✅ EM FAQ Accordion block
- ✅ EM Posts Grid block
- ✅ EM Spacer + Divider Pro block
- ✅ Unified "EM Blocks" category
- ✅ Professional class-based architecture
- ✅ Server-side rendering
- ✅ Mobile-responsive design

## Support & Contribution

For questions, bug reports, or feature requests:
- **Website:** [esmondmccain.com](https://esmondmccain.com/)
- **Repository:** [GitHub Repository](https://github.com/Esmond-M/em-block-collection)

## License

GPL-2.0-or-later - See LICENSE file for details.
