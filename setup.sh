#!/bin/bash

# Print colorful messages
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Progress indicator
show_spinner() {
  local pid=$1
  local delay=0.1
  local spinstr='|/-\'
  while [ "$(ps a | awk '{print $1}' | grep $pid)" ]; do
    local temp=${spinstr#?}
    printf " [%c]  " "$spinstr"
    local spinstr=$temp${spinstr%"$temp"}
    sleep $delay
    printf "\b\b\b\b\b\b"
  done
  printf "    \b\b\b\b"
}

# Check system requirements
check_requirements() {
  echo -e "${BLUE}🔍 Checking system requirements...${NC}"
  
  # Check Node.js version
  if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed. Please install Node.js first.${NC}"
    echo -e "${YELLOW}💡 Visit https://nodejs.org to download and install Node.js${NC}"
    exit 1
  fi

  NODE_VERSION=$(node -v | cut -d'v' -f2)
  if [ $(echo $NODE_VERSION | cut -d'.' -f1) -lt 16 ]; then
    echo -e "${RED}❌ Node.js version must be 16 or higher. Current version: ${NODE_VERSION}${NC}"
    echo -e "${YELLOW}💡 Please upgrade Node.js to continue${NC}"
    exit 1
  fi

  # Check npm
  if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm is not installed. Please install npm first.${NC}"
    exit 1
  fi

  # Check git
  if ! command -v git &> /dev/null; then
    echo -e "${RED}❌ git is not installed. Please install git first.${NC}"
    echo -e "${YELLOW}💡 Visit https://git-scm.com to download and install git${NC}"
    exit 1
  }

  echo -e "${GREEN}✅ All system requirements met!${NC}"
}

# Error handling function
handle_error() {
  echo -e "${RED}❌ Error: $1${NC}"
  echo -e "${YELLOW}💡 Trying to recover...${NC}"
  
  case $1 in
    "npm_install")
      echo -e "${YELLOW}Attempting to clear npm cache and reinstall...${NC}"
      npm cache clean --force
      rm -rf node_modules package-lock.json
      npm install
      ;;
    "vite_create")
      echo -e "${YELLOW}Attempting to create project again...${NC}"
      rm -rf ./* 
      npm create vite@latest . -- --template react-ts
      ;;
    *)
      echo -e "${RED}Unable to recover from error. Please try again or report this issue.${NC}"
      exit 1
      ;;
  esac
}

# Main setup process
main() {
  echo -e "${BLUE}🚀 Starting React + TypeScript + Tailwind CSS setup...${NC}"

  # Check requirements
  check_requirements

  # Create Vite project
  echo -e "${GREEN}📦 Creating Vite project with React and TypeScript...${NC}"
  npm create vite@latest . -- --template react-ts || handle_error "vite_create"

  # Install dependencies
  echo -e "${GREEN}📚 Installing dependencies...${NC}"
  npm install || handle_error "npm_install"

  # Install Tailwind CSS and its dependencies
  echo -e "${GREEN}🎨 Installing Tailwind CSS and its dependencies...${NC}"
  npm install -D tailwindcss@latest postcss@latest autoprefixer@latest

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

  echo -e "${BLUE}✨ Setup complete! Here's what you can do next:${NC}"
  echo -e "${GREEN}1. Start development server:${NC} npm run dev"
  echo -e "${GREEN}2. Create new component:${NC} npm run create-component ComponentName"
  echo -e "${GREEN}3. Create new page:${NC} npm run create-page PageName"
  echo -e "${GREEN}4. Use interactive generator:${NC} npm run generate"
  
  echo -e "\n${YELLOW}📚 Documentation:${NC}"
  echo -e "- Component documentation: ./docs/components.md"
  echo -e "- Development guide: ./docs/development.md"
  echo -e "- Troubleshooting: ./docs/troubleshooting.md"
}

# Run main function
main 
