import React from 'react';
import { useTranslation } from 'react-i18next';
import { Languages } from 'lucide-react';

export const LanguageToggle: React.FC = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'es' : 'en');
  };

  return (
    <button
      onClick={toggleLanguage}
      className="fixed top-4 left-4 p-2 rounded-full bg-gray-200 text-gray-600 hover:bg-purple-500 hover:text-white transition-all transform hover:scale-110 z-50"
    >
      <Languages size={20} />
    </button>
  );
};