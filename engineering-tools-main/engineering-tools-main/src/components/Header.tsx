import React from 'react';
import { Menu, Globe, Heart } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="bg-white shadow-sm border-b border-pink-100 sticky top-0 z-40">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center">
          <button
            onClick={onMenuClick}
            className="p-2 rounded-lg hover:bg-pink-50 transition-colors md:hidden"
          >
            <Menu className="h-6 w-6 text-pink-600" />
          </button>
          <div className="flex items-center ml-4">
            <Heart className="h-8 w-8 text-pink-500 mr-2" />
            <h1 className="text-xl font-bold text-gray-800">{t('landing.title')}</h1>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
            className="flex items-center px-3 py-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
          >
            <Globe className="h-4 w-4 mr-2" />
            <span className="text-sm font-medium">
              {language === 'en' ? 'العربية' : 'English'}
            </span>
          </button>
          <div className="hidden sm:block text-sm text-pink-600 font-medium bg-pink-50 px-3 py-2 rounded-lg">
            {t('landing.free')}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;