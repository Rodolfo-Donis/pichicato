import React from 'react';
import { useTranslation } from 'react-i18next';
import { FiGlobe } from 'react-icons/fi';
import './LanguageSwitcher.css';

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' }
  ];

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const handleLanguageChange = (languageCode) => {
    i18n.changeLanguage(languageCode);
  };

  return (
    <div className="language-switcher">
      <div className="language-current" title={t('common.language')}>
        <FiGlobe className="language-icon" />
        <span className="language-flag">{currentLanguage.flag}</span>
        <span className="language-code">{currentLanguage.code.toUpperCase()}</span>
      </div>
      
      <div className="language-dropdown">
        {languages.map((language) => (
          <button
            key={language.code}
            className={`language-option ${i18n.language === language.code ? 'active' : ''}`}
            onClick={() => handleLanguageChange(language.code)}
          >
            <span className="language-flag">{language.flag}</span>
            <span className="language-name">{language.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSwitcher; 