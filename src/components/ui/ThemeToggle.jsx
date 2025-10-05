import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import Icon from '../AppIcon';

const ThemeToggle = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      className={`
        relative inline-flex items-center h-6 w-11 rounded-full border-2 border-transparent 
        transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 
        focus:ring-primary focus:ring-offset-2 focus:ring-offset-background
        ${isDark ? 'bg-primary' : 'bg-muted'}
        ${className}
      `}
      data-testid="theme-toggle-button"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {/* Toggle Switch */}
      <span
        className={`
          inline-flex items-center justify-center h-5 w-5 rounded-full shadow-lg transform transition-all duration-200 ease-in-out
          ${isDark ? 'translate-x-5 bg-white' : 'translate-x-0 bg-white'}
        `}
      >
        {/* Icon inside the toggle */}
        <Icon 
          name={isDark ? 'Moon' : 'Sun'} 
          size={12} 
          className={isDark ? 'text-primary' : 'text-warning'}
        />
      </span>
      
      {/* Background Icons */}
      <span className="absolute left-1 top-1/2 transform -translate-y-1/2">
        <Icon 
          name="Sun" 
          size={10} 
          className={`transition-opacity duration-200 ${
            isDark ? 'opacity-40 text-white' : 'opacity-0'
          }`}
        />
      </span>
      <span className="absolute right-1 top-1/2 transform -translate-y-1/2">
        <Icon 
          name="Moon" 
          size={10} 
          className={`transition-opacity duration-200 ${
            isDark ? 'opacity-0' : 'opacity-40 text-muted-foreground'
          }`}
        />
      </span>
    </button>
  );
};

export default ThemeToggle;