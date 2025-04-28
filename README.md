# Clad Framework

A modern, utility-first CSS framework designed for flexibility and ease of use.

## Features

- Utility-first approach with intuitive class naming conventions
- Responsive design system with customizable breakpoints
- Modern color system with CSS variables for easy theming
- Flexible layout utilities with grid and flexbox support
- Lightweight core with tree-shakable components
- Dark mode support built-in from the start
- Comprehensive documentation

## Installation

```bash
npm install clad-framework
```

## Quick Start

### 1. Include the CSS

```html
<!-- Option 1: Import in your CSS/SCSS file -->
@import 'clad-framework';

<!-- Option 2: Import in JavaScript -->
import 'clad-framework';
```

### 2. Start using the utilities

```html
<div class="flex items-center justify-between p-4 bg-primary-100">
  <div class="text-lg font-bold text-primary-900">Clad Framework</div>
  <button class="px-4 py-2 text-white bg-primary-600 rounded-md hover:bg-primary-700 transition-colors">
    Get Started
  </button>
</div>
```

## Customization

Clad Framework is designed to be easily customizable through CSS variables. Override the default variables to match your design system:

```css
:root {
  /* Primary color */
  --c-primary-500: #4f46e5; /* Your brand color */
  
  /* Font family */
  --f-body: 'Your Font', sans-serif;
  
  /* Adjust other variables as needed */
}
```

## Documentation

For complete documentation, see the [docs](./docs) directory.

## Browser Support

Clad Framework supports all modern browsers and is compatible with the latest versions of:

- Chrome
- Firefox
- Safari
- Edge

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.