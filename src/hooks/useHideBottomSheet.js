import React, { useEffect } from 'react';
import { Keyboard } from 'react-native';

export default function useHideBottomSheet(callBack) {
  useEffect(() => {
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      callBack();
    });
    return () => {
      hideSubscription.remove();
    };
  }, []);
  return;
}