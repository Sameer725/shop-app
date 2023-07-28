import React, { useMemo } from 'react';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

const withTime = (value: number) => withTiming(value, { duration: 50 });

export const useShakeAnimation = () => {
  const shakeValue = useSharedValue(0);

  const shakeStyle = useAnimatedStyle(() => {
    const inputRange = [-1, 0, 1];
    const outputRange = [-5, 0, 5];
    const translateX = interpolate(shakeValue.value, inputRange, outputRange, Extrapolate.CLAMP);

    return {
      transform: [{ translateX }],
    };
  }, []);

  const startShakeAnimation = () => {
    shakeValue.value = withSequence(withTime(1), withTime(-1), withTime(1), withTime(-1), withTime(1), withTime(0));
  };

  const ShakeContainer: React.FC = ({ children }) => {
    return <Animated.View style={shakeStyle}>{children}</Animated.View>;
  };

  return useMemo(() => ({ shakeStyle, startShakeAnimation, ShakeContainer }), []);
};
