import { useEffect, useState } from 'react';
import { Dimensions, Platform } from 'react-native';

export function useWindowSize() {
  const [size, setSize] = useState(() => Dimensions.get('window'));

  useEffect(() => {
    const handler = ({ window }) => setSize(window);

    const sub = Dimensions.addEventListener ? Dimensions.addEventListener('change', handler) : null;

    return () => {
      if (sub && sub.remove) sub.remove();
      else if (Dimensions.removeEventListener) Dimensions.removeEventListener('change', handler);
    };
  }, []);

  return size;
}
