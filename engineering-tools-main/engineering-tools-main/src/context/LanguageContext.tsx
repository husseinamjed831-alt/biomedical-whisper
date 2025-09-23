import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.theory': 'Theory & Practice',
    'nav.labs': 'Labs',
    'nav.exams': 'Exams',
    'nav.joker': 'Joker Help',
    'nav.evaluation': 'Weekly Evaluation',
    'nav.courses': 'Courses',
    'nav.patent': 'Patent Generator',
    'nav.donations': 'Donations',
    'nav.office': 'Office Tools',
    'nav.security': 'Security',
    
    // Landing Page
    'landing.title': 'ME Whisper',
    'landing.subtitle': 'Advanced Biomedical Engineering Education Platform',
    'landing.description': 'Explore interactive 3D models, comprehensive labs, and cutting-edge tools designed for biomedical engineering students.',
    'landing.cta': 'Start Learning',
    'landing.free': 'Free Platform',
    
    // Subjects
    'subject.anatomy': 'Anatomy',
    'subject.physiology': 'Physiology',
    'subject.math': 'Mathematics',
    'subject.circuits': 'Circuits',
    
    // Common
    'common.loading': 'Loading...',
    'common.save': 'Save',
    'common.submit': 'Submit',
    'common.cancel': 'Cancel',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.view': 'View',
    'common.download': 'Download',
  },
  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.theory': 'النظرية والممارسة',
    'nav.labs': 'المختبرات',
    'nav.exams': 'الامتحانات',
    'nav.joker': 'مساعد الطلاب',
    'nav.evaluation': 'التقييم الأسبوعي',
    'nav.courses': 'الدورات',
    'nav.patent': 'منشئ براءات الاختراع',
    'nav.donations': 'التبرعات',
    'nav.office': 'أدوات المكتب',
    'nav.security': 'الأمان',
    
    // Landing Page
    'landing.title': 'همسة الطب الحيوي',
    'landing.subtitle': 'منصة تعليمية متقدمة للهندسة الطبية الحيوية',
    'landing.description': 'استكشف نماذج ثلاثية الأبعاد تفاعلية ومختبرات شاملة وأدوات متطورة مصممة لطلاب الهندسة الطبية الحيوية.',
    'landing.cta': 'ابدأ التعلم',
    'landing.free': 'مجاني للسنة الأولى',
    
    // Subjects
    'subject.anatomy': 'التشريح',
    'subject.physiology': 'علم وظائف الأعضاء',
    'subject.math': 'الرياضيات',
    'subject.circuits': 'الدوائر',
    
    // Common
    'common.loading': 'جاري التحميل...',
    'common.save': 'حفظ',
    'common.submit': 'إرسال',
    'common.cancel': 'إلغاء',
    'common.edit': 'تعديل',
    'common.delete': 'حذف',
    'common.view': 'عرض',
    'common.download': 'تحميل',
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      <div className={language === 'ar' ? 'rtl' : 'ltr'}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};