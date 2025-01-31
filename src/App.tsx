import { useState } from 'react';
import ComponentName from './components/ComponentName';
import Sidebar from './components/Sidebar';
import HomePage from './pages/HomePage';
import Button from './components/Button';

// Only include actual implemented components and pages
const PAGES = ['Home'];
const COMPONENTS = ['Button', 'ComponentName'];

function App() {
  const [selectedPage, setSelectedPage] = useState('Home');
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);

  const renderContent = () => {
    if (selectedComponent) {
      // Render selected component showcase
      switch (selectedComponent) {
        case 'ComponentName':
          return (
            <div className="p-8">
              <h1 className="text-3xl font-bold mb-6">Example Component</h1>
              <ComponentName title="Interactive Counter" initialCount={0} />
            </div>
          );
        case 'Button':
          return (
            <div className="p-8">
              <h1 className="text-3xl font-bold mb-6">Button Component</h1>
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl mb-4">Variants</h2>
                  <div className="flex flex-wrap gap-4">
                    <Button variant="primary">Primary</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="success">Success</Button>
                    <Button variant="danger">Danger</Button>
                    <Button variant="warning">Warning</Button>
                    <Button variant="info">Info</Button>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl mb-4">Sizes</h2>
                  <div className="flex flex-wrap items-center gap-4">
                    <Button size="sm">Small</Button>
                    <Button size="md">Medium</Button>
                    <Button size="lg">Large</Button>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl mb-4">States</h2>
                  <div className="flex flex-wrap gap-4">
                    <Button disabled>Disabled</Button>
                    <Button isLoading>Loading</Button>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl mb-4">With Icons</h2>
                  <div className="flex flex-wrap gap-4">
                    <Button leftIcon="👈">Left Icon</Button>
                    <Button rightIcon="👉">Right Icon</Button>
                  </div>
                </div>
              </div>
            </div>
          );
        default:
          return null;
      }
    }

    // Render selected page
    switch (selectedPage) {
      case 'Home':
        return <HomePage />;
      default:
        return null;
    }
  };

  return (
    <div className="flex">
      <Sidebar
        pages={PAGES}
        components={COMPONENTS}
        onSelectPage={page => {
          setSelectedPage(page);
          setSelectedComponent(null);
        }}
        onSelectComponent={component => {
          setSelectedComponent(component);
          setSelectedPage('');
        }}
      />
      <main className="flex-1 bg-gray-50 min-h-screen">{renderContent()}</main>
    </div>
  );
}

export default App;
