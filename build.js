const sass = require('sass');
const fs = require('fs');
const postcss = require('postcss');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');
const path = require('path');


const inputFile = path.join(__dirname, 'src', 'clad.scss');
const outputFile = path.join(__dirname, 'dist', 'clad.min.css');

// Ensure the dist exists in main directory
if (!fs.existsSync(path.dirname(outputFile))) {
  fs.mkdirSync(path.dirname(outputFile), { recursive: true });
}

// Compile SCSS to CSS
sass.render({
  file: inputFile,
  outputStyle: 'expanded'
}, (error, result) => {
  if (error) {
    console.error('SASS compilation error:', error);
    return;
  }

  // Processing CSS with PostCSS  
  postcss([autoprefixer, cssnano])
    .process(result.css, { from: undefined })
    .then(result => {
      fs.writeFile(outputFile, result.css, (err) => {
        if (err) {
          console.error('Error writing file:', err);
        } else {
          console.log('Build completed successfully. Output:', outputFile);
        }
      });
    })
    .catch(err => {
      console.error('PostCSS processing error:', err);
    });
});