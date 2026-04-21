"use client";

import React, { useEffect, useState } from 'react';
import Script from 'next/script';

declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: () => void;
  }
}

const GoogleTranslator: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Define the initialization function for Google Translate
    (window as any).googleTranslateElementInit = () => {
      new (window as any).google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          includedLanguages: 'en,bn', // English and Bengali only
          layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
        },
        'google_translate_element'
      );
    };
    setIsLoaded(true);
  }, []);

  return (
    <div className="google-translator-container">
      <div id="google_translate_element"></div>
      
      {/* Load the Google Translate script */}
      {isLoaded && (
        <Script
          src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="afterInteractive"
        />
      )}

    </div>
  );
};

export default GoogleTranslator;
