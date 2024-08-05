'use client';

import { useMediaQuery } from '@chakra-ui/react';
import { useEffect } from 'react';

const useIntersectionObserver = (setActiveCategory) => {
  const [isMobile] = useMediaQuery('(max-width: 992px)');

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      let activeSection = null;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const offset = isMobile ? 0 : -100; // Adjust offset for mobile and desktop
        if (rect.top + offset >= 0 && rect.top + offset < window.innerHeight / 2) {
          activeSection = section.id;
        }
      });

      if (activeSection) {
        setActiveCategory(activeSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call to set the correct active category on load

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [setActiveCategory, isMobile]);
};

export default useIntersectionObserver;
