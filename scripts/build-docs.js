/**
 * FluidCSS Documentation Generator
 * Generates documentation for the CSS framework
 */

const fs = require('fs-extra');
const path = require('path');

// Paths
const srcDir = path.join(__dirname, '../src');
const docsDir = path.join(__dirname, '../docs');
const cssFiles = [
  'base/_reset.css',
  'base/_variables.css',
  'base/_typography.css',
  'utilities/_spacing.css',
  'utilities/_flexbox.css',
  'utilities/_grid.css',
  'utilities/_colors.css',
  'components/_buttons.css',
  'components/_forms.css',
];

// Ensure the docs directory exists
fs.ensureDirSync(docsDir);

// Generate markdown documentation
function generateDocs() {
  console.log('Generating FluidCSS documentation...');
  
  // Create index.md
  let index = `# FluidCSS Documentation\n\n`;
  index += `A modern, utility-first CSS framework designed for flexibility and ease of use.\n\n`;
  index += `## Contents\n\n`;
  
  // Create sidebar navigation
  let sidebar = `# Navigation\n\n`;
  
  // Process each CSS file and extract documentation
  for (const file of cssFiles) {
    try {
      const filePath = path.join(srcDir, file);
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        const fileName = path.basename(file);
        const section = file.split('/')[0];
        const sectionName = section.charAt(0).toUpperCase() + section.slice(1);
        const componentName = fileName.replace('.css', '').replace('_', '');
        const componentNameFormatted = componentName.charAt(0).toUpperCase() + componentName.slice(1);
        
        // Create a markdown file for each CSS component
        const mdFileName = `${componentName}.md`;
        let mdContent = `# ${componentNameFormatted}\n\n`;
        
        // Extract comments from CSS
        const comments = extractComments(content);
        if (comments.description) {
          mdContent += `${comments.description}\n\n`;
        }
        
        // Add code examples if they exist
        if (comments.examples && comments.examples.length > 0) {
          mdContent += `## Examples\n\n`;
          comments.examples.forEach(example => {
            mdContent += `### ${example.title || 'Example'}\n\n`;
            mdContent += `\`\`\`html\n${example.code}\n\`\`\`\n\n`;
          });
        }
        
        // Add class documentation
        mdContent += `## Available Classes\n\n`;
        const classes = extractClasses(content);
        if (classes.length > 0) {
          mdContent += `| Class | Description |\n|-------|-------------|\n`;
          classes.forEach(cls => {
            mdContent += `| \`.${cls.name}\` | ${cls.description || 'No description available'} |\n`;
          });
        } else {
          mdContent += `No classes found in this file.\n`;
        }
        
        // Write the markdown file
        fs.writeFileSync(path.join(docsDir, mdFileName), mdContent);
        
        // Add to index
        index += `- [${componentNameFormatted}](./${mdFileName})\n`;
        
        // Add to sidebar
        sidebar += `- ${sectionName}\n`;
        sidebar += `  - [${componentNameFormatted}](./${mdFileName})\n`;
      }
    } catch (error) {
      console.error(`Error processing ${file}:`, error);
    }
  }
  
  // Write the index file
  fs.writeFileSync(path.join(docsDir, 'index.md'), index);
  
  // Write the sidebar file
  fs.writeFileSync(path.join(docsDir, '_sidebar.md'), sidebar);
  
  console.log('Documentation generated successfully!');
}

// Extract comments from CSS content
function extractComments(content) {
  const result = {
    description: '',
    examples: []
  };
  
  // Extract the main description comment
  const descRegex = /\/\*\*\s*([\s\S]*?)\s*\*\//g;
  const descMatches = [...content.matchAll(descRegex)];
  
  if (descMatches.length > 0) {
    // Get the first comment block as the description
    result.description = descMatches[0][1]
      .replace(/\s*\*\s*/g, '\n')
      .replace(/^\n+|\n+$/g, '')
      .trim();
  }
  
  // Extract example comments
  const exampleRegex = /\/\* Example:([\s\S]*?)\*\//g;
  const exampleMatches = [...content.matchAll(exampleRegex)];
  
  exampleMatches.forEach(match => {
    const exampleContent = match[1].trim();
    const titleMatch = exampleContent.match(/Title:\s*(.*?)(?:\n|$)/);
    const codeMatch = exampleContent.match(/```(html|css)\s*([\s\S]*?)```/);
    
    result.examples.push({
      title: titleMatch ? titleMatch[1] : 'Example',
      code: codeMatch ? codeMatch[2].trim() : exampleContent
    });
  });
  
  return result;
}

// Extract CSS classes from content
function extractClasses(content) {
  const result = [];
  const classRegex = /\.([\w-]+)\s*{[^}]*}/g;
  const classMatches = [...content.matchAll(classRegex)];
  
  classMatches.forEach(match => {
    // Find the comment before this class (if any)
    const classIndex = match.index;
    const beforeClass = content.substring(0, classIndex);
    const commentRegex = /\/\* ([^*]*) \*\/\s*$/;
    const commentMatch = beforeClass.match(commentRegex);
    
    result.push({
      name: match[1],
      description: commentMatch ? commentMatch[1].trim() : ''
    });
  });
  
  return result;
}

// Run the documentation generator
generateDocs();