import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { ImageStyle, StyleProp, useWindowDimensions, ViewStyle } from 'react-native';
import { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

export interface UseScreenAnimationType {
  imageStyle: StyleProp<ImageStyle>;
  slideUpAnimationStyle: StyleProp<ViewStyle>;
  slideDownAnimationStyle: StyleProp<ViewStyle>;
  startAnimation: () => void;
  reverseAnimation: (reverseDuration?: number) => Promise<void>;
}

interface UseScreenAnimationParams {
  duration?: number;
  initialValue?: number;
  finalValue?: number;
}

export const useScreenAnimation = (params: UseScreenAnimationParams = {}): UseScreenAnimationType => {
  const { duration = 1000, initialValue = 0, finalValue = 1 } = params;
  const animation = useSharedValue<number>(initialValue);
  const imageAnimation = useSharedValue<number>(initialValue);
  const { height } = useWindowDimensions();

  const startAnimation = useCallback(() => {
    animation.value = withTiming(finalValue, { duration });
    imageAnimation.value = withTiming(finalValue, { duration });
  }, [finalValue, duration]);

  const reverseAnimation = useCallback(
    async (reverseDuration?: number) => {
      animation.value = withTiming(initialValue, { duration });

      return new Promise<void>((resolve) => {
        const timer = setTimeout(() => {
          clearTimeout(timer);
          resolve();
        }, reverseDuration ?? duration / 2);
      });
    },
    [duration, initialValue]
  );

  useFocusEffect(() => {
    startAnimation();
  });

  const imageStyle = useAnimatedStyle(() => {
    return {
      top: ((1 - imageAnimation.value) * height) / 2.5,
      transform: [{ scale: 2 - imageAnimation.value }],
    };
  }, [animation.value]);

  const slideDownAnimationStyle = useAnimatedStyle(() => {
    return {
      top: -(1 - animation.value) * height,
    };
  }, [animation.value]);

  const slideUpAnimationStyle = useAnimatedStyle(() => {
    return {
      top: (1 - animation.value) * height,
    };
  }, [animation.value]);

  return { imageStyle, slideUpAnimationStyle, slideDownAnimationStyle, startAnimation, reverseAnimation };
};
