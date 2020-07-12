import { useEffect } from 'react';

export function useOnClickOutside(ref, handler) {
  const handleClick = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      handler();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Escape') {
      handler();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('keydown', handleKeyPress);
    };
  });
}
