# Troubleshooting Guide

## Common Issues and Solutions

### Setup Issues

#### Node.js Version Issues
**Problem**: Setup fails with Node.js version error
**Solution**:
1. Check your Node.js version:
```bash
node -v
```
2. If below v16, update Node.js:
- Windows/Mac: Download from [nodejs.org](https://nodejs.org)
- Linux: Use nvm or package manager

#### npm Installation Failures
**Problem**: npm install fails
**Solution**:
1. Clear npm cache:
```bash
npm cache clean --force
```
2. Delete node_modules:
```bash
rm -rf node_modules package-lock.json
```
3. Retry installation:
```bash
npm install
```

### Development Issues

#### Component Not Showing in Sidebar
**Problem**: New component not appearing in sidebar
**Solution**:
1. Check component file name matches component name
2. Verify import in App.tsx
3. Check console for errors
4. Restart development server

#### Live Updates Not Working
**Problem**: Changes not reflecting in browser
**Solution**:
1. Check if development server is running
2. Clear browser cache
3. Hard refresh (Ctrl/Cmd + Shift + R)
4. Check for compilation errors in terminal

#### Tailwind Classes Not Applying
**Problem**: Tailwind CSS styles not working
**Solution**:
1. Verify tailwind.config.js content paths
2. Check PostCSS configuration
3. Verify class names are correct
4. Rebuild the project:
```bash
npm run build
npm run dev
```

### TypeScript Issues

#### Type Errors
**Problem**: TypeScript compilation errors
**Solution**:
1. Check prop types match usage
2. Verify import paths
3. Update TypeScript configuration if needed
4. Check for missing type definitions

#### Missing Type Definitions
**Problem**: Cannot find module or its corresponding type declarations
**Solution**:
1. Install @types package:
```bash
npm install --save-dev @types/package-name
```
2. Create custom type definitions if needed

### Git Issues

#### Setup Script Not Executable
**Problem**: Permission denied running setup.sh
**Solution**:
```bash
chmod +x setup.sh
```

#### Git Not Tracking Files
**Problem**: New files not showing in git status
**Solution**:
1. Check .gitignore
2. Initialize git if needed:
```bash
git init
```
3. Add files:
```bash
git add .
```

## Advanced Troubleshooting

### Debugging Tools

#### React Developer Tools
1. Install browser extension
2. Use Components tab to inspect state
3. Use Profiler for performance issues

#### Console Debugging
1. Use console.log for basic debugging
2. Use console.table for arrays/objects
3. Use debugger statement for breakpoints

### Performance Issues

#### Slow Development Server
1. Check system resources
2. Clear node_modules and reinstall
3. Update dependencies
4. Use production build for testing

#### Memory Leaks
1. Check useEffect cleanup
2. Monitor React DevTools
3. Use Chrome Memory profiler

## Getting Help

### Community Resources
1. Check GitHub Issues
2. Stack Overflow
3. React Discord
4. Project Discussions

### Reporting Issues
When reporting issues:
1. Describe the problem
2. List steps to reproduce
3. Include error messages
4. Share relevant code
5. Mention environment details 
