import { useEffect, useRef } from 'react';

export default function useHasChanged(val) {
  const usePrevious = value => {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    }, [value]);
    return ref.current;
  };
  const prevVal = usePrevious(val);
  return prevVal !== val;
}
