# React + TypeScript + Tailwind CSS + Vite Template

A modern, fast template for building React applications with TypeScript, Tailwind CSS, and Vite. Includes a built-in component and page generator for rapid development.

## Features

- ⚡️ [Vite](https://vitejs.dev/) - Lightning fast build tool
- ⚛️ [React 18](https://reactjs.org/) - A JavaScript library for building user interfaces
- 📝 [TypeScript](https://www.typescriptlang.org/) - Type safety for JavaScript
- 🎨 [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- 🛠️ Component & Page Generators - CLI tools for rapid development
- 📱 Responsive Sidebar Layout - Ready-to-use navigation structure

## Quick Start

### Option 1: Create a new project using this template

```bash
# Clone this repository
git clone https://github.com/YOUR_USERNAME/react-ts-tailwind-template.git my-project

# Navigate to the project
cd my-project

# Make the setup script executable
chmod +x setup.sh

# Run the setup script
./setup.sh

# Start the development server
npm run dev
```

### Option 2: Use as a template through GitHub

1. Click the "Use this template" button above
2. Clone your new repository
3. Run the setup script:
   ```bash
   chmod +x setup.sh
   ./setup.sh
   ```
4. Start developing!

## Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Component & Page Generation

This template includes CLI tools to quickly generate new components and pages. The generators will:
- Create the new component/page file with TypeScript and Tailwind CSS
- Add the import to App.tsx
- Update the navigation arrays
- Add the routing logic

### Creating Components

```bash
# Using npm script
npm run create-component ComponentName

# Example
npm run create-component Button
```

This will create:
- `src/components/Button.tsx`
- Add Button to the components list
- Add Button to the component switcher

### Creating Pages

```bash
# Using npm script
npm run create-page PageName

# Example
npm run create-page About
```

This will create:
- `src/pages/AboutPage.tsx`
- Add About to the pages list
- Add About to the page router

### Interactive Generator

You can also use the interactive generator:

```bash
npm run generate
```

This will prompt you to:
1. Choose between creating a component or page
2. Enter the name for your new component/page

## Project Structure

```
.
├── public/              # Static assets
├── src/                 # Source files
│   ├── components/      # React components
│   ├── pages/          # Page components
│   ├── App.tsx         # Root component
│   └── main.tsx        # Entry point
├── scripts/            # Generator scripts
│   └── generate.js     # Component & page generator
├── index.html          # HTML template
├── setup.sh            # Setup script
├── tailwind.config.js  # Tailwind CSS configuration
├── postcss.config.js   # PostCSS configuration
├── tsconfig.json       # TypeScript configuration
├── vite.config.ts      # Vite configuration
└── README.md           # Project documentation
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
