# Development Guide

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm (comes with Node.js)
- git

### Quick Start
1. Clone the repository:
```bash
git clone <repository-url>
cd <repository-name>
```

2. Run the setup script:
```bash
chmod +x setup.sh
./setup.sh
```

3. Start the development server:
```bash
npm run dev
```

## Project Structure
```
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Page components
│   ├── assets/        # Static assets
│   ├── App.tsx        # Main application component
│   └── main.tsx       # Application entry point
├── docs/             # Documentation
├── scripts/          # Development scripts
└── setup.sh          # Setup script
```

## Development Workflow

### Creating New Components
```bash
npm run create-component ComponentName
```
This will:
1. Create a new component file
2. Add it to the sidebar automatically
3. Create a showcase section

### Creating New Pages
```bash
npm run create-page PageName
```
This will:
1. Create a new page component
2. Add it to the navigation automatically

### Interactive Generator
```bash
npm run generate
```
Follow the prompts to create components or pages interactively.

## Testing Your Code

### Testing Components
1. Create your component
2. Click on it in the sidebar
3. View it in the main area
4. Make changes and see live updates

### Testing Pages
1. Create your page
2. Click on it in the sidebar
3. View it in the main area
4. Make changes and see live updates

## Best Practices

### Code Style
- Use TypeScript for type safety
- Follow React best practices
- Use functional components
- Use hooks for state management
- Keep components small and focused

### CSS/Styling
- Use Tailwind CSS for styling
- Follow utility-first approach
- Keep styles close to components
- Use consistent spacing

### Git Workflow
1. Create feature branch
2. Make changes
3. Test changes
4. Create pull request
5. Get review
6. Merge to main

## Troubleshooting

### Common Issues

1. Setup script fails
   - Check Node.js version
   - Clear npm cache
   - Delete node_modules and try again

2. Component not showing up
   - Check the import in App.tsx
   - Check the component name
   - Check for console errors

3. Styles not applying
   - Check Tailwind classes
   - Verify PostCSS config
   - Clear browser cache

### Getting Help
- Check the troubleshooting guide
- Open an issue on GitHub
- Ask in discussions 
