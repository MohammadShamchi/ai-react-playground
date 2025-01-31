import { useState } from 'react';

type SidebarProps = {
    onSelectPage: (page: string) => void;
    onSelectComponent: (component: string) => void;
    pages: string[];
    components: string[];
};

const Sidebar = ({ onSelectPage, onSelectComponent, pages, components }: SidebarProps) => {
    const [activeTab, setActiveTab] = useState<'pages' | 'components'>('pages');

    return (
        <div className="w-64 h-screen bg-gray-800 text-white p-4">
            {/* Tab Switcher */}
            <div className="flex mb-6 bg-gray-700 rounded-lg p-1">
                <button
                    className={`flex-1 py-2 rounded-md ${activeTab === 'pages' ? 'bg-blue-500' : 'hover:bg-gray-600'
                        }`}
                    onClick={() => setActiveTab('pages')}
                >
                    Pages
                </button>
                <button
                    className={`flex-1 py-2 rounded-md ${activeTab === 'components' ? 'bg-blue-500' : 'hover:bg-gray-600'
                        }`}
                    onClick={() => setActiveTab('components')}
                >
                    Components
                </button>
            </div>

            {/* List */}
            <div className="space-y-2">
                {activeTab === 'pages' ? (
                    <>
                        <h2 className="text-lg font-semibold mb-4">Pages</h2>
                        {pages.map((page) => (
                            <button
                                key={page}
                                onClick={() => onSelectPage(page)}
                                className="w-full text-left px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
                            >
                                {page}
                            </button>
                        ))}
                    </>
                ) : (
                    <>
                        <h2 className="text-lg font-semibold mb-4">Components</h2>
                        {components.map((component) => (
                            <button
                                key={component}
                                onClick={() => onSelectComponent(component)}
                                className="w-full text-left px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
                            >
                                {component}
                            </button>
                        ))}
                    </>
                )}
            </div>
        </div>
    );
};

export default Sidebar; 