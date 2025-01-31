import React from 'react';

const HomePage: React.FC = () => {
    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-6 text-gray-800">Welcome to AI React Playground! 🚀</h1>
            
            <div className="prose prose-lg">
                <p className="text-lg text-gray-600 mb-8">
                    This is your playground for testing and showcasing React components. Perfect for experimenting
                    with AI-generated code or building your own components.
                </p>

                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">Quick Start Guide</h2>
                    <ol className="list-decimal list-inside space-y-3 text-gray-600">
                        <li>Use the sidebar to navigate between pages and components</li>
                        <li>Create new components: <code className="bg-gray-100 px-2 py-1 rounded">npm run create-component ComponentName</code></li>
                        <li>Create new pages: <code className="bg-gray-100 px-2 py-1 rounded">npm run create-page PageName</code></li>
                        <li>Or use the interactive generator: <code className="bg-gray-100 px-2 py-1 rounded">npm run generate</code></li>
                    </ol>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-blue-50 rounded-lg p-6">
                        <h3 className="text-xl font-semibold mb-3 text-blue-800">Components</h3>
                        <p className="text-blue-600">
                            Click on any component in the sidebar to see it in action. Each component is automatically
                            added to the navigation when created.
                        </p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-6">
                        <h3 className="text-xl font-semibold mb-3 text-green-800">Pages</h3>
                        <p className="text-green-600">
                            Create full pages for your application. Pages are automatically added to the
                            navigation when created.
                        </p>
                    </div>
                </div>

                <div className="bg-purple-50 rounded-lg p-6">
                    <h2 className="text-2xl font-semibold mb-4 text-purple-800">Testing AI-Generated Code</h2>
                    <p className="text-purple-600 mb-4">
                        Got some React code from ChatGPT, Claude, or another AI? Here's how to test it:
                    </p>
                    <ol className="list-decimal list-inside space-y-2 text-purple-600">
                        <li>Generate a new component using the CLI or interactive generator</li>
                        <li>Paste your AI-generated code into the new component file</li>
                        <li>Click on the component in the sidebar to see it live</li>
                        <li>Make changes and see instant updates</li>
                    </ol>
                </div>
            </div>
        </div>
    );
};

export default HomePage; 
