import { useState, useEffect, useCallback } from 'react';

const KONAMI_CODE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
];

export const useKonamiCode = (onSuccess?: () => void) => {
  const [inputIndex, setInputIndex] = useState(0);
  const [isActivated, setIsActivated] = useState(false);

  const trigger = useCallback(() => {
    setIsActivated(true);
    if (onSuccess) {
      onSuccess();
    }
  }, [onSuccess]);

  const reset = useCallback(() => {
    setIsActivated(false);
    setInputIndex(0);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is currently typing in an input or textarea
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
        return;
      }

      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      const expectedKey = KONAMI_CODE[inputIndex].toLowerCase();

      if (key === expectedKey) {
        const nextIndex = inputIndex + 1;
        if (nextIndex === KONAMI_CODE.length) {
          trigger();
          setInputIndex(0);
        } else {
          setInputIndex(nextIndex);
        }
      } else {
        // Reset if mismatched, but check if the pressed key could be the first key
        if (key === KONAMI_CODE[0].toLowerCase()) {
          setInputIndex(1);
        } else {
          setInputIndex(0);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [inputIndex, trigger]);

  return { isActivated, trigger, reset, progress: inputIndex / KONAMI_CODE.length };
};
