import React, { useCallback } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated';

import theme from '@assets/theme/theme';
import { Box, HorizontalSliderRenderItemProps, SpecialCard } from '@components';
import { Special } from '@types';

export interface SpecialSliderCardProps extends HorizontalSliderRenderItemProps<Special> {
  onPress?: (item: Special) => void;
}

const AnimatedBox = Animated.createAnimatedComponent(Box);

const SpecialSliderCard = (props: SpecialSliderCardProps) => {
  const { item, width, scrollX, index, onPress } = props;

  // InputRange for interpolation, represents prev,current,next item in the     slider
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scaleY: interpolate(scrollX.value, inputRange, [0.78, 1, 0.78], Extrapolate.CLAMP) },
      { scaleX: interpolate(scrollX.value, inputRange, [0.78, 1, 0.78], Extrapolate.CLAMP) },
      { translateX: interpolate(scrollX.value, inputRange, [-10, 0, 10], Extrapolate.CLAMP) },
    ],
  }));

  const handleOnPress = useCallback(() => {
    if (!onPress) {
      return;
    }
    onPress(item);
  }, [item]);

  return (
    <Pressable disabled={!item.externalLink && !item.internalLink} onPress={handleOnPress}>
      <AnimatedBox width={width} style={[styles.background, animatedStyle]}>
        <SpecialCard special={item} />
      </AnimatedBox>
    </Pressable>
  );
};

export default SpecialSliderCard;

const styles = StyleSheet.create({
  background: {
    borderRadius: theme.radii['2xl'],
    overflow: 'hidden',
    flex: 1,
    height: 180,
  },
});
