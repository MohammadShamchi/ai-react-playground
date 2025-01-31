# Component Documentation

## Overview
This project provides a simple way to create, test, and showcase React components. Each component is automatically added to the main page for easy visualization and testing.

## Creating Components
There are two ways to create new components:

1. Using the CLI generator:
```bash
npm run create-component ComponentName
```

2. Using the interactive generator:
```bash
npm run generate
# Then select 'component' when prompted
```

## Component Structure
Each component follows this basic structure:
```typescript
type ComponentProps = {
  children?: React.ReactNode;
  // Add other props here
};

const Component = ({ children, ...props }: ComponentProps) => {
  return (
    <div className="p-4">
      {/* Component content */}
    </div>
  );
};

export default Component;
```

## Available Components

### Button
A customizable button component with different variants.

Props:
- `variant`: 'primary' | 'secondary'
- `children`: React.ReactNode
- `onClick`: () => void

Example:
```tsx
<Button variant="primary" onClick={() => console.log('clicked')}>
  Click Me
</Button>
```

### More components will be added here automatically when created

## Testing Components
1. Create your component using the generator
2. The component will automatically appear in the sidebar
3. Click on the component name to see it in action
4. Modify the component code and see live updates

## Best Practices
1. Keep components small and focused
2. Use TypeScript props interface
3. Use Tailwind CSS for styling
4. Add proper documentation
5. Include examples in the component file 
