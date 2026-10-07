# EM Block Collection

**Project:** EM Block Collection  
**Author:** [esmondmccain.com](https://esmondmccain.com/)  
**Version:** 0.1.0  
**Requires WordPress:** 6.1+  
**Requires PHP:** 7.0+

## Overview

EM Block Collection adds a small set of Gutenberg blocks for common site sections: calls to action, service highlights, testimonials, process steps, FAQs, and post carousels.

## Included Blocks

All blocks are organized under the **"EM Blocks"** category for easy discovery.

### **EM Carousel**
- **Purpose:** Display posts in a responsive, scrollable carousel
- **Features:**
  - Customizable post count and categories
  - Optional post excerpts
  - Slick carousel integration
- **Category:** EM Blocks

### **EM FAQ Accordion**
- **Purpose:** Display frequently asked questions in an interactive accordion
- **Features:**
  - Add unlimited FAQ items
  - Edit questions and answers directly in the block editor
  - Reorder or remove items with inline controls
  - Smooth expand/collapse animations
- **Category:** EM Blocks

### **EM CTA Banner**
- **Purpose:** Give visitors a clear next step with a heading, supporting copy, and up to two actions
- **Features:** Theme-aware color and spacing controls, contained or full-width layouts, responsive actions

### **EM Feature Cards**
- **Purpose:** Present services or capabilities in a responsive card grid
- **Features:** Repeatable cards, editable markers, two- or three-column layout, mobile stacking

### **EM Testimonial**
- **Purpose:** Present a client quote with clear attribution
- **Features:** Optional WordPress Media Library portrait, stacked or inline attribution layouts

### **EM Process Steps**
- **Purpose:** Explain an ordered process for a service, project, or onboarding flow
- **Features:** Repeatable semantic steps, visible numbering, responsive presentation

## Features

- All blocks appear in the **EM Blocks** inserter category.
- Blocks render on the server, so their front-end markup is available without depending on editor JavaScript.
- Source styles live with the block that uses them under `src/`.
- The project includes PHP, editor, and browser smoke tests.

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
3. **Select Block:** Choose from Carousel, FAQ Accordion, CTA Banner, Feature Cards, Testimonial, or Process Steps
4. **Customize:** Use each block's inline controls and settings. FAQ questions and answers are edited directly in the block.
5. **Publish:** Save your page/post to see the blocks in action

## Development

### Requirements
- Node.js 24.18+ and npm 11.16+ for the development and test toolchain
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

# Create a distributable plugin ZIP in dist/
npm run plugin-zip
```

### Testing

```bash
# PHP renderer and registration tests
composer install
npm run test:php

# Editor component tests
npm run test:unit:js

# All unit tests
npm test

# Start an isolated WordPress environment with Docker
npm run env:start
```

The Playwright frontend smoke test targets a prepared page. On this local site, run:

```powershell
$env:E2E_BASE_URL = 'https://test-plugins.local'
$env:E2E_SMOKE_PATH = '/test-blocks/'
npm run test:e2e
```

The optional editor/publish smoke test requires an explicit test administrator account. `wp-env` uses `admin` / `password` by default:

```powershell
$env:E2E_BASE_URL = 'http://127.0.0.1:8888'
$env:WP_ADMIN_USERNAME = 'admin'
$env:WP_ADMIN_PASSWORD = 'password'
npm run test:e2e
```

### File Structure
```
em-block-collection/
├── .github/workflows/   # Continuous integration
├── assets/              # Static assets
├── build/               # Compiled files
├── includes/classes/    # PHP block classes
├── src/                 # Source files
│   ├── carousel/        # Carousel block
│   ├── faq-accordion/   # FAQ accordion block
│   ├── cta-banner/      # CTA banner block
│   ├── feature-cards/   # Feature cards block
│   ├── testimonial/     # Testimonial block
│   └── process-steps/   # Process steps block
└── tests/               # PHP, editor, and browser tests
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
- Initial release with Carousel, FAQ Accordion, CTA Banner, Feature Cards, Testimonial, and Process Steps blocks.

## Support & Contribution

For questions, bug reports, or feature requests:
- **Website:** [esmondmccain.com](https://esmondmccain.com/)
- **Repository:** [GitHub Repository](https://github.com/Esmond-M/em-block-collection)

## License

GPL-2.0-or-later - See LICENSE file for details.
