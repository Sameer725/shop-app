import { useTheme } from '@shopify/restyle';
import React from 'react';
import { ColorValue, ViewStyle } from 'react-native';
import Animated, { Extrapolate, interpolate, interpolateColor, useAnimatedStyle } from 'react-native-reanimated';

import { Theme } from '@assets/theme/theme';
import { Box } from './Box';

interface SliderIndicatorProps {
  scrollX: Animated.SharedValue<number>;
  index: number;
  width: number;
}

export const SliderIndicator = (props: SliderIndicatorProps) => {
  const { scrollX, index, width } = props;
  const AnimatedBox = Animated.createAnimatedComponent(Box);

  const {
    colors: { primary600, gray300 },
  } = useTheme<Theme>();

  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

  const animatedStyle = useAnimatedStyle<ViewStyle>(() => ({
    width: interpolate(scrollX.value, inputRange, [10, 20, 10], Extrapolate.CLAMP),
    backgroundColor: interpolateColor(scrollX.value, inputRange, [gray300, primary600, gray300], 'RGB') as ColorValue,
  }));

  return <AnimatedBox height={10} borderRadius={5} marginHorizontal="s1" style={[animatedStyle]} />;
};
