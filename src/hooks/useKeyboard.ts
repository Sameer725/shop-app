import { useCallback, useLayoutEffect, useState } from 'react';
import { Keyboard, KeyboardEventListener } from 'react-native';

export const useKeyboard = () => {
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  const keyboardDidShow: KeyboardEventListener = useCallback(
    (e) => {
      setKeyboardHeight(e?.endCoordinates?.height);
      setIsKeyboardOpen(true);
    },
    [keyboardHeight]
  );

  const keyboardDidHide: KeyboardEventListener = useCallback(() => {
    setIsKeyboardOpen(false);
  }, []);

  useLayoutEffect(() => {
    const show = Keyboard.addListener('keyboardDidShow', keyboardDidShow);
    const hide = Keyboard.addListener('keyboardDidHide', keyboardDidHide);

    return () => {
      show.remove();
      hide.remove();
    };
  }, [keyboardDidHide, keyboardDidShow]);

  const hideKeyboard = () => Keyboard.dismiss();

  return { hideKeyboard, isKeyboardOpen, keyboardHeight };
};
