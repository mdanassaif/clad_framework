const sass = require('sass');
const fs = require('fs-extra');
const postcss = require('postcss');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');
const path = require('path');

// Check if watch mode is enabled
const watchMode = process.argv.includes('--watch');

// Source and destination paths
const srcDir = path.join(__dirname, 'src');
const distDir = path.join(__dirname, 'dist');
const mainScssFile = path.join(srcDir, 'clad.scss');
const outputCssFile = path.join(distDir, 'clad.min.css');
const outputFullCssFile = path.join(distDir, 'clad.css');

// Ensure the dist directory exists
fs.ensureDirSync(distDir);

// Function to compile SCSS
function compileSass() {
  console.log('Compiling SCSS...');
  
  try {
    // Compile to full version (expanded)
    const fullResult = sass.renderSync({
      file: mainScssFile,
      outputStyle: 'expanded',
      sourceMap: true,
      sourceMapContents: true,
      outFile: outputFullCssFile
    });
    
    // Write full version
    fs.writeFileSync(outputFullCssFile, fullResult.css);
    if (fullResult.map) {
      fs.writeFileSync(`${outputFullCssFile}.map`, fullResult.map);
    }
    
    // Process with PostCSS for minified version
    postcss([autoprefixer, cssnano])
      .process(fullResult.css, { 
        from: mainScssFile, 
        to: outputCssFile,
        map: { inline: false }
      })
      .then(result => {
        fs.writeFileSync(outputCssFile, result.css);
        if (result.map) {
          fs.writeFileSync(`${outputCssFile}.map`, result.map.toString());
        }
        console.log(`✅ Build successful! Output: ${outputCssFile} and ${outputFullCssFile}`);
      });
      
  } catch (error) {
    console.error('❌ Error compiling SCSS:', error.message);
    if (error.file) {
      console.error(`File: ${error.file}`);
      console.error(`Line: ${error.line}, Column: ${error.column}`);
    }
  }
}

// Initial compilation
compileSass();

// Watch mode
if (watchMode) {
  console.log('Watching for changes...');
  
  // Watch the src directory for changes
  fs.watch(srcDir, { recursive: true }, (eventType, filename) => {
    if (filename && filename.endsWith('.scss')) {
      console.log(`File ${filename} changed. Rebuilding...`);
      compileSass();
    }
  });
}