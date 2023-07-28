import React, { useCallback, useRef } from 'react';
import { ListRenderItem, Pressable, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Animated, {
  interpolate,
  interpolateColor,
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useDerivedValue,
} from 'react-native-reanimated';

import theme from '@assets/theme/theme';
import { Box } from './Box';
import { Text } from './Text';

export interface TabItemProps<T> {
  label: T;
  index: number;
  activeIndex: Animated.SharedValue<number>;
}

interface TabNavigationProps<T> {
  data: T[];
  labelAccessor: string;
  activeIndex: Animated.SharedValue<number>;
  containerStyle?: StyleProp<ViewStyle>;
  onItemPress?: (props: { index: number }) => void;
}

const AnimatedBox = Animated.createAnimatedComponent(Box);
const AnimatedText = Animated.createAnimatedComponent(Text);
const SecondaryTab = <T,>(props: TabItemProps<T>) => {
  const { label, activeIndex, index } = props;
  const animateValue = useDerivedValue(() => {
    return Number(activeIndex.value === index);
  }, [index]);

  const inputRange = [0, 1];

  const containerStyle = useAnimatedStyle(() => {
    const bgOutputRange = [theme.colors.white, theme.colors.primary600];
    const borderWidthOutputRange = [theme.borderWidth.b1, 0];

    const backgroundColor = interpolateColor(animateValue.value, inputRange, bgOutputRange);
    const borderWidth = interpolate(animateValue.value, inputRange, borderWidthOutputRange);

    return {
      backgroundColor,
      borderWidth,
    };
  }, []);

  const textStyle = useAnimatedStyle(() => {
    const colorOutputRange = [theme.colors.defaultTextColor, theme.colors.white];

    const color = interpolateColor(animateValue.value, inputRange, colorOutputRange);

    return {
      color,
    };
  }, []);

  return (
    <AnimatedBox
      marginVertical="s2"
      marginHorizontal="s1"
      borderRadius={theme.radii.md}
      height={theme.spacing.s8}
      alignItems="center"
      justifyContent="center"
      borderColor="gray200"
      paddingHorizontal="s2"
      style={containerStyle}
    >
      <AnimatedText style={textStyle} variant="text-sm">
        {label}
      </AnimatedText>
    </AnimatedBox>
  );
};

export const SecondaryTopTabNavigation = <T extends { name: string }>(props: TabNavigationProps<T>) => {
  const { data, activeIndex, containerStyle, onItemPress } = props;
  const animatedRef = useRef<FlatList<T>>(null);

  const scrollToIndex = useCallback((index: number) => {
    animatedRef.current?.scrollToIndex({
      index,
      animated: true,
      viewPosition: 0.5,
    });
  }, []);

  useAnimatedReaction(
    () => activeIndex.value,
    (value) => {
      runOnJS(scrollToIndex)(value ?? 0);
    },
    []
  );

  const renderItem: ListRenderItem<T> = useCallback(
    ({ item, index }) => (
      <Pressable onPress={() => onItemPress?.({ index })}>
        <SecondaryTab label={item.name} index={index} activeIndex={activeIndex} />
      </Pressable>
    ),
    [activeIndex, onItemPress]
  );

  return (
    <FlatList
      ref={animatedRef}
      initialScrollIndex={activeIndex.value}
      data={data}
      contentContainerStyle={styles.tabStyle}
      style={containerStyle}
      horizontal
      showsHorizontalScrollIndicator={false}
      directionalLockEnabled
      bounces={false}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  tabStyle: { height: theme.spacing.s12, paddingHorizontal: theme.spacing.s1, flexGrow: 0 },
});
