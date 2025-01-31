import { useState } from 'react'
import ComponentName from './components/ComponentName'

import Sidebar from './components/Sidebar'
import HomePage from './pages/HomePage'
import Button from './components/Button'

// This would be your actual pages and components
const PAGES = ['Home', 'About', 'Contact']
const COMPONENTS = ['Button', 'Card', 'Input', 'ComponentName']

function App() {
  const [selectedPage, setSelectedPage] = useState('Home')
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null)

  const renderContent = () => {
    if (selectedComponent) {
      // Render selected component showcase
      switch (selectedComponent) {
        case 'ComponentName':
          return (
            <div className="p-8">
              <h1 className="text-3xl font-bold mb-6">ComponentName Component</h1>
              <ComponentName />
            </div>
          )
        case 'Button':
          return (
            <div className="p-8">
              <h1 className="text-3xl font-bold mb-6">Button Component</h1>
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl mb-2">Primary Button</h2>
                  <Button variant="primary">Click Me</Button>
                </div>
                <div>
                  <h2 className="text-xl mb-2">Secondary Button</h2>
                  <Button variant="secondary">Click Me</Button>
                </div>
              </div>
            </div>
          )
        default:
          return <div className="p-8">Component "{selectedComponent}" showcase coming soon!</div>
      }
    }

    // Render selected page
    switch (selectedPage) {
      case 'Home':
        return <HomePage />
      default:
        return <div className="p-8">Page "{selectedPage}" coming soon!</div>
    }
  }

  return (
    <div className="flex">
      <Sidebar
        pages={PAGES}
        components={COMPONENTS}
        onSelectPage={(page) => {
          setSelectedPage(page)
          setSelectedComponent(null)
        }}
        onSelectComponent={(component) => {
          setSelectedComponent(component)
          setSelectedPage('')
        }}
      />
      <main className="flex-1 bg-gray-50 min-h-screen">
        {renderContent()}
      </main>
    </div>
  )
}

export default App
