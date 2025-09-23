import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, Home, Book, FlaskConical, FileText, HelpCircle, BarChart3, GraduationCap, FileCheck, Heart as HeartIcon, Wrench, Shield } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  const { t, language } = useLanguage();

  const menuItems = [
    { path: '/', icon: Home, label: t('nav.home') },
    { path: '/theory', icon: Book, label: t('nav.theory') },
    { path: '/labs', icon: FlaskConical, label: t('nav.labs') },
    { path: '/exams', icon: FileText, label: t('nav.exams') },
    { path: '/joker', icon: HelpCircle, label: t('nav.joker') },
    { path: '/evaluation', icon: BarChart3, label: t('nav.evaluation') },
    { path: '/courses', icon: GraduationCap, label: t('nav.courses') },
    { path: '/patent', icon: FileCheck, label: t('nav.patent') },
    { path: '/donations', icon: HeartIcon, label: t('nav.donations') },
    { path: '/office', icon: Wrench, label: t('nav.office') },
    { path: '/security', icon: Shield, label: t('nav.security') },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={onClose} />
      )}
      
      {/* Sidebar */}
      <div className={`fixed md:static inset-y-0 ${language === 'ar' ? 'right-0' : 'left-0'} z-50 w-64 bg-gradient-to-b from-pink-500 to-blue-600 text-white transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : language === 'ar' ? 'translate-x-full md:translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}>
        <div className="flex items-center justify-between p-4 border-b border-pink-400">
          <h2 className="text-xl font-bold">ME Whisper</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-white hover:bg-opacity-20 transition-colors md:hidden"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <nav className="mt-8">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={`flex items-center px-6 py-3 text-sm transition-all duration-200 hover:bg-white hover:bg-opacity-10 border-r-4 ${
                  isActive
                    ? 'bg-white bg-opacity-20 border-white'
                    : 'border-transparent'
                }`}
              >
                <Icon className="h-5 w-5 mr-3" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
        
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-white bg-opacity-10 rounded-lg p-3 text-center">
            <p className="text-xs opacity-80">© 2024 ME Whisper</p>
            <p className="text-xs opacity-60 mt-1">Biomedical Engineering Platform</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;