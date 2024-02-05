import { useEffect, useRef } from "react";
import { AppState } from "react-native";

function useAppStateChange(callback) {
  const appState = useRef(AppState.currentState);

  const handleAppStateChange = nextAppState => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      console.log('foreground');
      callback();
    }
    appState.current = nextAppState;
  };

  useEffect(() => {
    // handleCheckPermissions();
    const appStateListener = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );

    return () => {
      appStateListener.remove();
    };
  }, []);
}

export default useAppStateChange;