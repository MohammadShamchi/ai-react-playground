import React, { useState } from 'react';
import Button from './Button';

/**
 * Props for the ComponentName component
 */
interface ComponentNameProps {
  /** The title to display at the top of the component */
  title?: string;
  /** The initial count value */
  initialCount?: number;
  /** Optional class name for styling */
  className?: string;
}

/**
 * An example component demonstrating state management and component composition
 */
const ComponentName: React.FC<ComponentNameProps> = ({
  title = 'Example Component',
  initialCount = 0,
  className = '',
}) => {
  const [count, setCount] = useState(initialCount);
  const [isLoading, setIsLoading] = useState(false);

  const handleIncrement = () => {
    setCount(prev => prev + 1);
  };

  const handleDecrement = () => {
    setCount(prev => prev - 1);
  };

  const handleReset = async () => {
    setIsLoading(true);
    // Simulate an async operation
    await new Promise(resolve => setTimeout(resolve, 1000));
    setCount(initialCount);
    setIsLoading(false);
  };

  return (
    <div className={`p-6 bg-white rounded-lg shadow-md ${className}`}>
      <h2 className="text-2xl font-bold mb-4 text-gray-800">{title}</h2>
      
      <div className="space-y-4">
        <div className="flex items-center justify-center text-4xl font-bold text-blue-500">
          {count}
        </div>

        <div className="flex items-center justify-center space-x-4">
          <Button
            variant="primary"
            onClick={handleDecrement}
            disabled={isLoading}
          >
            -
          </Button>
          
          <Button
            variant="success"
            onClick={handleIncrement}
            disabled={isLoading}
          >
            +
          </Button>
        </div>

        <div className="flex justify-center">
          <Button
            variant="secondary"
            onClick={handleReset}
            isLoading={isLoading}
            disabled={count === initialCount}
          >
            Reset
          </Button>
        </div>

        <div className="mt-4 text-sm text-gray-600">
          <p className="text-center">
            This is an example component demonstrating:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>State management with hooks</li>
            <li>Component composition</li>
            <li>TypeScript types and interfaces</li>
            <li>Proper documentation</li>
            <li>Loading states</li>
            <li>Responsive design</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ComponentName;
