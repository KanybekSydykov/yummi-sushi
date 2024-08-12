'use client';

import { useEffect, useRef, useState } from 'react';

const IntersectionObserverWrapper = ({ onVisible, children }) => {
  const [hasFetched, setHasFetched] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasFetched) {
          onVisible();
          setHasFetched(true); // Prevent further fetching
        }
      },
      { threshold: 0.1 } // Adjust as needed
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [onVisible, hasFetched]);

  return <div ref={ref}>{children}</div>;
};

export default IntersectionObserverWrapper;
