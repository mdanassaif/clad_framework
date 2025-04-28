# CLAD CSS Framework

A modern, lightweight CSS framework with customizable components.

## Features

- Flexbox and CSS Grid based layout system
- Fully customizable with CSS variables
- Dark mode support
- Mobile-first responsive design
- Comprehensive component library
- Accessibility-focused
- Modern animations and transitions
- Utility classes for rapid development

## Installation

```bash
npm install clad-css
```

## Usage

### Import the CSS

```html
<!-- In your HTML -->
<link rel="stylesheet" href="node_modules/clad-css/dist/clad.min.css">
```

Or import in your JavaScript:

```js
// Using a bundler (webpack, vite, etc.)
import 'clad-css';
```

### Basic Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CLAD CSS Example</title>
  <link rel="stylesheet" href="path/to/clad.min.css">
</head>
<body>
  <div class="clad-container">
    <h1 class="clad-text-primary">Hello, CLAD CSS!</h1>
    
    <div class="clad-card">
      <div class="clad-card-body">
        <h5 class="clad-card-title">Card Title</h5>
        <p class="clad-card-text">This is a simple card example using CLAD CSS.</p>
        <button class="clad-btn clad-btn-primary">Action Button</button>
      </div>
    </div>
  </div>
</body>
</html>
```

## Customization

CLAD CSS uses CSS variables for easy theming. You can override these variables in your own CSS:

```css
:root {
  /* Primary color */
  --clad-primary-hue: 220;
  --clad-primary-saturation: 90%;
  --clad-primary-lightness: 45%;
  
  /* Change font family */
  --clad-font-family-sans-serif: 'Roboto', sans-serif;
  
  /* Adjust border radius */
  --clad-border-radius: 0.5rem;
}
```

## Dark Mode

CLAD CSS includes automatic dark mode based on user preference (`prefers-color-scheme`). You can also manually apply dark mode with a class:

```html
<body class="clad-dark-mode">
  <!-- Your content -->
</body>
```

## Components

CLAD CSS includes a wide range of components:

- Buttons
- Cards
- Forms
- Navbar
- Tables
- Alerts
- Badges
- Modals
- Tooltips
- Dropdowns
- Progress bars
- And more...

## Layout System

### Container

```html
<div class="clad-container">
  <!-- Content here -->
</div>

<!-- Fluid container -->
<div class="clad-container-fluid">
  <!-- Content here -->
</div>
```

### Grid

```html
<div class="clad-row">
  <div class="clad-col-12 clad-col-md-6 clad-col-lg-4">
    <!-- Column content -->
  </div>
  <div class="clad-col-12 clad-col-md-6 clad-col-lg-4">
    <!-- Column content -->
  </div>
  <div class="clad-col-12 clad-col-md-6 clad-col-lg-4">
    <!-- Column content -->
  </div>
</div>
```

### CSS Grid

```html
<div class="clad-grid-container">
  <div class="clad-grid-item-md-6">
    <!-- Grid item -->
  </div>
  <div class="clad-grid-item-md-6">
    <!-- Grid item -->
  </div>
</div>
```

## Utilities

CLAD CSS provides utility classes for:

- Spacing (margin/padding)
- Typography
- Colors
- Flexbox
- Display
- Position
- Borders
- Shadows
- And more...

## Browser Support

CLAD CSS supports all modern browsers and IE11+.

## License

MIT