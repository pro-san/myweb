import React, { useState, useEffect } from 'react';

export const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      title="Scroll to top"
      aria-label="Back to top"
      className="fixed bottom-6 left-6 z-50 w-11 h-11 rounded-full bg-blue-700 hover:bg-blue-800 text-white shadow-xl flex items-center justify-center text-sm transition-all duration-300 hover:-translate-y-1 cursor-pointer"
    >
      <i className="fa-solid fa-arrow-up"></i>
    </button>
  );
};
