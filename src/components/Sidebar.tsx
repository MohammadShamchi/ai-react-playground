import React, { useState } from 'react';

/**
 * Props for the Sidebar component
 */
interface SidebarProps {
  /** Callback function when a page is selected */
  onSelectPage: (page: string) => void;
  /** Callback function when a component is selected */
  onSelectComponent: (component: string) => void;
  /** List of available pages */
  pages: string[];
  /** List of available components */
  components: string[];
  /** Optional class name for styling */
  className?: string;
}

type TabType = 'pages' | 'components';

/**
 * A sidebar navigation component that switches between pages and components
 */
const Sidebar: React.FC<SidebarProps> = ({
  onSelectPage,
  onSelectComponent,
  pages,
  components,
  className = '',
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('pages');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = (activeTab === 'pages' ? pages : components).filter(item =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleItemClick = (item: string) => {
    if (activeTab === 'pages') {
      onSelectPage(item);
    } else {
      onSelectComponent(item);
    }
  };

  const renderTabButton = (tab: TabType, label: string) => (
    <button
      className={`
        flex-1 py-2 px-4 rounded-md transition-all duration-200
        ${activeTab === tab
          ? 'bg-blue-500 text-white shadow-md'
          : 'hover:bg-gray-600 text-gray-300'
        }
      `}
      onClick={() => setActiveTab(tab)}
    >
      {label}
    </button>
  );

  const renderItem = (item: string) => (
    <button
      key={item}
      onClick={() => handleItemClick(item)}
      className={`
        w-full text-left px-4 py-2 rounded-md transition-all duration-200
        hover:bg-gray-700 hover:shadow-md
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
      `}
    >
      <span className="text-gray-200">{item}</span>
    </button>
  );

  return (
    <div className={`w-64 h-screen bg-gray-800 text-white p-4 flex flex-col ${className}`}>
      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-2 bg-gray-700 text-white rounded-md
            placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Tab Switcher */}
      <div className="flex mb-6 bg-gray-700 rounded-lg p-1">
        {renderTabButton('pages', 'Pages')}
        {renderTabButton('components', 'Components')}
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto">
        <div className="space-y-2">
          <h2 className="text-lg font-semibold mb-4 text-gray-300">
            {activeTab === 'pages' ? 'Pages' : 'Components'}
            <span className="text-sm font-normal text-gray-400 ml-2">
              ({filteredItems.length})
            </span>
          </h2>

          {filteredItems.length > 0 ? (
            filteredItems.map(renderItem)
          ) : (
            <div className="text-center text-gray-400 py-4">
              No {activeTab} found matching "{searchTerm}"
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 pt-4 border-t border-gray-700">
        <div className="text-xs text-gray-400 text-center">
          <p>AI React Playground</p>
          <p className="mt-1">Use the search box to filter {activeTab}</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar; 
