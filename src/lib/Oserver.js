import { useMediaQuery } from '@chakra-ui/react';
import { useEffect } from 'react';

const useIntersectionObserver = (setActiveCategory) => {
  const [isMobile] = useMediaQuery('(max-width: 992px)');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveCategory(entry.target.id);
          }
        });
      },
      { root: null, rootMargin: isMobile ? '0px 0px 0px 0px' : '0px 0px -100px 0px', threshold: 0.1 }
    );

    const sections = document.querySelectorAll('section');
    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, [setActiveCategory, isMobile]);
};

export default useIntersectionObserver;
