import { useEffect } from 'react';

export default function useShowOnScroll({ ref, setIsShowing }) {
  useEffect(() => {
    const handleScroll = () => {
      const bottomOfMainSection = ref?.current?.clientHeight;
      const hasScrolledPassedMainSection =
        window.scrollY > bottomOfMainSection - 1;
      if (hasScrolledPassedMainSection) {
        setIsShowing(true);
      } else {
        setIsShowing(false);
      }
    };
    if (ref) {
      handleScroll();
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [ref, setIsShowing]);
}
