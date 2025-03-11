import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { Theme } from '../types';

interface Props {
  currentTheme: Theme;
  setTheme: (theme: Theme) => void;
}

export const ThemeToggle: React.FC<Props> = ({ currentTheme, setTheme }) => {
  return (
    <div className="fixed top-4 right-16 flex gap-2 z-50">
      {(['dark1', 'light2'] as Theme[]).map((theme) => (
        <button
          key={theme}
          onClick={() => setTheme(theme)}
          className={`p-2 rounded-full transition-all transform hover:scale-110 ${
            currentTheme === theme 
              ? 'bg-purple-500 text-white shadow-lg scale-110' 
              : 'bg-gray-200 text-gray-600'
          }`}
        >
          {theme.includes('dark') ? <Moon size={20} /> : <Sun size={20} />}
        </button>
      ))}
    </div>
  );
};