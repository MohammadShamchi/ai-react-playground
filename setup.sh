#!/bin/bash

# Print colorful messages
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Starting React + TypeScript + Tailwind CSS setup...${NC}"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install Node.js and npm first."
    exit 1
fi

# Create Vite project with React and TypeScript
echo -e "${GREEN}📦 Creating Vite project with React and TypeScript...${NC}"
npm create vite@latest . -- --template react-ts

# Install dependencies
echo -e "${GREEN}📚 Installing dependencies...${NC}"
npm install

# Install Tailwind CSS and its dependencies
echo -e "${GREEN}🎨 Installing Tailwind CSS and its dependencies...${NC}"
npm install -D tailwindcss@3.4.1 postcss@8.4.33 autoprefixer@10.4.17

# Create Tailwind CSS config file
echo -e "${GREEN}⚙️ Creating Tailwind CSS configuration...${NC}"
cat > tailwind.config.js << EOL
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
EOL

# Create PostCSS config file
echo -e "${GREEN}⚙️ Creating PostCSS configuration...${NC}"
cat > postcss.config.js << EOL
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
EOL

# Add Tailwind directives to CSS
echo -e "${GREEN}🎯 Adding Tailwind directives to CSS...${NC}"
cat > src/index.css << EOL
@tailwind base;
@tailwind components;
@tailwind utilities;
EOL

# Create scripts directory and add generator
echo -e "${GREEN}📝 Setting up component and page generators...${NC}"
mkdir -p scripts

# Create the generator script
cat > scripts/generate.js << EOL
#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const TEMPLATES = {
  component: (name) => \`type \${name}Props = {
  children?: React.ReactNode;
};

const \${name} = ({ children }: \${name}Props) => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">\${name}</h2>
      {children}
    </div>
  );
};

export default \${name};
\`,
  page: (name) => \`const \${name}Page = () => {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-6">\${name}</h1>
      <div className="prose">
        <p>Content for \${name} page goes here.</p>
      </div>
    </div>
  );
};

export default \${name}Page;
\`
};

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function createFile(type, name) {
  const basePath = path.join(__dirname, '..', 'src', type === 'component' ? 'components' : 'pages');
  const fileName = type === 'component' ? \`\${name}.tsx\` : \`\${name}Page.tsx\`;
  const filePath = path.join(basePath, fileName);

  // Check if file already exists
  if (fs.existsSync(filePath)) {
    console.error(\`❌ \${type} \${name} already exists at \${filePath}\`);
    process.exit(1);
  }

  // Create the file
  const template = type === 'component' ? TEMPLATES.component(name) : TEMPLATES.page(name);
  fs.writeFileSync(filePath, template);

  // Update App.tsx
  const appPath = path.join(__dirname, '..', 'src', 'App.tsx');
  let appContent = fs.readFileSync(appPath, 'utf8');

  // Add import
  const importStatement = \`import \${type === 'component' ? name : name + 'Page'} from './\${type === 'component' ? 'components' : 'pages'}/\${fileName.replace('.tsx', '')}'\n\`;
  appContent = appContent.replace(
    /import.*from ['"]react['"]/,
    \`import { useState } from 'react'\n\${importStatement}\`
  );

  // Add to arrays
  const arrayName = type === 'component' ? 'COMPONENTS' : 'PAGES';
  appContent = appContent.replace(
    new RegExp(\`const \${arrayName} = \\\\[(.*?)\\\\]\`, 's'),
    \`const \${arrayName} = [\$1, '\${name}']\`
  );

  // Add to switch statement if it's a component
  if (type === 'component') {
    const switchCaseStr = \`
        case '\${name}':
          return (
            <div className="p-8">
              <h1 className="text-3xl font-bold mb-6">\${name} Component</h1>
              <\${name} />
            </div>
          )\`;
    appContent = appContent.replace(
      /switch \\(selectedComponent\\) {/,
      \`switch (selectedComponent) {\${switchCaseStr}\`
    );
  } else {
    // Add to pages switch statement
    const switchCaseStr = \`
      case '\${name}':
        return <\${name}Page />\`;
    appContent = appContent.replace(
      /switch \\(selectedPage\\) {/,
      \`switch (selectedPage) {\${switchCaseStr}\`
    );
  }

  fs.writeFileSync(appPath, appContent);

  console.log(\`✅ Created \${type} \${name} at \${filePath}\`);
  console.log(\`✅ Updated App.tsx with \${name} \${type}\`);
}

function promptCreate() {
  rl.question('What do you want to create? (component/page): ', (type) => {
    if (type !== 'component' && type !== 'page') {
      console.error('❌ Invalid type. Please choose "component" or "page"');
      rl.close();
      return;
    }

    rl.question(\`Enter the name of the \${type}: \`, (name) => {
      const capitalizedName = capitalize(name);
      createFile(type, capitalizedName);
      rl.close();
    });
  });
}

// If running directly
if (process.argv[2]) {
  const type = process.argv[2];
  const name = capitalize(process.argv[3] || '');

  if (!name) {
    console.error('❌ Please provide a name');
    process.exit(1);
  }

  createFile(type, name);
} else {
  promptCreate();
}
EOL

# Make the generator script executable
chmod +x scripts/generate.js

# Update package.json to add generator commands
echo -e "${GREEN}📝 Adding generator commands to package.json...${NC}"
node -e "
const fs = require('fs');
const package = JSON.parse(fs.readFileSync('package.json', 'utf8'));
package.scripts = {
  ...package.scripts,
  'create-component': 'node scripts/generate.js component',
  'create-page': 'node scripts/generate.js page',
  'generate': 'node scripts/generate.js'
};
fs.writeFileSync('package.json', JSON.stringify(package, null, 2));
"

echo -e "${BLUE}✨ Setup complete! You can now:${NC}"
echo -e "${GREEN}1. Run the development server:${NC} npm run dev"
echo -e "${GREEN}2. Create new components:${NC} npm run create-component ComponentName"
echo -e "${GREEN}3. Create new pages:${NC} npm run create-page PageName"
echo -e "${GREEN}4. Use interactive generator:${NC} npm run generate" 