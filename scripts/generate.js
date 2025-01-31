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
  component: (name) => `type ${name}Props = {
  children?: React.ReactNode;
};

const ${name} = ({ children }: ${name}Props) => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">${name}</h2>
      {children}
    </div>
  );
};

export default ${name};
`,
  page: (name) => `const ${name}Page = () => {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-6">${name}</h1>
      <div className="prose">
        <p>Content for ${name} page goes here.</p>
      </div>
    </div>
  );
};

export default ${name}Page;
`
};

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function createFile(type, name) {
  const basePath = path.join(__dirname, '..', 'src', type === 'component' ? 'components' : 'pages');
  const fileName = type === 'component' ? `${name}.tsx` : `${name}Page.tsx`;
  const filePath = path.join(basePath, fileName);

  // Check if file already exists
  if (fs.existsSync(filePath)) {
    console.error(`❌ ${type} ${name} already exists at ${filePath}`);
    process.exit(1);
  }

  // Create the file
  const template = type === 'component' ? TEMPLATES.component(name) : TEMPLATES.page(name);
  fs.writeFileSync(filePath, template);

  // Update App.tsx
  const appPath = path.join(__dirname, '..', 'src', 'App.tsx');
  let appContent = fs.readFileSync(appPath, 'utf8');

  // Add import
  const importStatement = `import ${type === 'component' ? name : name + 'Page'} from './${type === 'component' ? 'components' : 'pages'}/${fileName.replace('.tsx', '')}'\n`;
  appContent = appContent.replace(
    /import.*from ['"]react['"]/,
    `import { useState } from 'react'\n${importStatement}`
  );

  // Add to arrays
  const arrayName = type === 'component' ? 'COMPONENTS' : 'PAGES';
  appContent = appContent.replace(
    new RegExp(`const ${arrayName} = \\[(.*?)\\]`, 's'),
    `const ${arrayName} = [$1, '${name}']`
  );

  // Add to switch statement if it's a component
  if (type === 'component') {
    const switchCaseStr = `
        case '${name}':
          return (
            <div className="p-8">
              <h1 className="text-3xl font-bold mb-6">${name} Component</h1>
              <${name} />
            </div>
          )`;
    appContent = appContent.replace(
      /switch \(selectedComponent\) {/,
      `switch (selectedComponent) {${switchCaseStr}`
    );
  } else {
    // Add to pages switch statement
    const switchCaseStr = `
      case '${name}':
        return <${name}Page />`;
    appContent = appContent.replace(
      /switch \(selectedPage\) {/,
      `switch (selectedPage) {${switchCaseStr}`
    );
  }

  fs.writeFileSync(appPath, appContent);

  console.log(`✅ Created ${type} ${name} at ${filePath}`);
  console.log(`✅ Updated App.tsx with ${name} ${type}`);
}

function promptCreate() {
  rl.question('What do you want to create? (component/page): ', (type) => {
    if (type !== 'component' && type !== 'page') {
      console.error('❌ Invalid type. Please choose "component" or "page"');
      rl.close();
      return;
    }

    rl.question(`Enter the name of the ${type}: `, (name) => {
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