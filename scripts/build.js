/**
 * FluidCSS Build Script
 * Compiles CSS files and processes them with PostCSS
 */

const fs = require('fs-extra');
const path = require('path');
const postcss = require('postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcssImport = require('postcss-import');
const postcssNested = require('postcss-nested');
const postcssPresetEnv = require('postcss-preset-env');

// Paths
const srcDir = path.join(__dirname, '../src');
const distDir = path.join(__dirname, '../dist');
const srcFile = path.join(srcDir, 'fluid.css');
const distFile = path.join(distDir, 'fluid.css');
const minifiedFile = path.join(distDir, 'fluid.min.css');

// Ensure the dist directory exists
fs.ensureDirSync(distDir);

// PostCSS processors
const processors = [
  postcssImport,
  postcssNested,
  postcssPresetEnv({
    stage: 1,
    features: {
      'nesting-rules': true,
      'custom-properties': true,
      'color-function': true,
    },
  }),
  autoprefixer,
];

// Main build function
async function build() {
  try {
    console.log('Building FluidCSS...');
    const css = fs.readFileSync(srcFile, 'utf8');

    // Process with PostCSS
    const result = await postcss(processors).process(css, {
      from: srcFile,
      to: distFile,
      map: { inline: false },
    });

    // Write the processed CSS
    fs.writeFileSync(distFile, result.css);
    if (result.map) {
      fs.writeFileSync(`${distFile}.map`, result.map.toString());
    }

    // Create minified version
    const minified = await postcss([cssnano]).process(result.css, {
      from: distFile,
      to: minifiedFile,
    });

    // Write the minified CSS
    fs.writeFileSync(minifiedFile, minified.css);

    // Create ESM version
    const esmContent = `const css = \`${minified.css}\`;\nexport default css;`;
    fs.writeFileSync(path.join(distDir, 'fluid.esm.js'), esmContent);

    console.log('Build completed successfully!');
    console.log(`Main CSS: ${distFile}`);
    console.log(`Minified CSS: ${minifiedFile}`);
    console.log(`ESM Module: ${path.join(distDir, 'fluid.esm.js')}`);
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

// Run the build
build();