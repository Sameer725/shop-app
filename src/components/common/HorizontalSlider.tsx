import React, { useCallback } from 'react';
import { FlatListProps, ListRenderItemInfo, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import theme from '@assets/theme/theme';
import { Box } from './Box';
import { SliderIndicator } from './SliderIndicator';

type Exclude =
  | 'snapToInterval'
  | 'horizontal'
  | 'renderItem'
  | 'decelerationRate'
  | 'showsHorizontalScrollIndicator'
  | 'scrollEventThrottle'
  | 'centerContent'
  | 'onScroll'
  | 'pagingEnabled';

export interface HorizontalSliderRenderItemProps<T> {
  item: T;
  index: number;
  scrollX: Animated.SharedValue<number>;
  width: number;
}

type RenderItem<T> = (props: HorizontalSliderRenderItemProps<T>) => JSX.Element;

interface HorizontalSliderProps<T> extends Omit<FlatListProps<T>, Exclude> {
  data: T[];
  itemWidth: number;
  skeletonHeight: number;
  renderItem: RenderItem<T>;
  indicatorKeyExtractor?: (item: T, index: number) => string | number;
  indicatorPosition: 'inside' | 'outside';
  loadingStyle?: StyleProp<ViewStyle>;
  isLoading?: boolean;
}

export const HorizontalSlider = <T,>(props: HorizontalSliderProps<T>) => {
  const {
    data,
    renderItem,
    itemWidth,
    indicatorKeyExtractor,
    indicatorPosition,
    isLoading,
    skeletonHeight,
    loadingStyle,
    ...rest
  } = props;

  const AnimatedFlatList = Animated.createAnimatedComponent<FlatListProps<T>>(FlatList);

  const scrollX = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler(
    {
      onScroll: (event) => {
        scrollX.value = event.contentOffset.x;
      },
    },
    []
  );

  const memoizedRenderItem = useCallback(
    ({ item, index }: ListRenderItemInfo<T>) => renderItem({ item, index, scrollX, width: itemWidth }),
    []
  );

  if (isLoading) {
    return (
      <Box alignSelf="center" style={loadingStyle}>
        <SkeletonPlaceholder>
          <SkeletonPlaceholder.Item borderRadius={theme.radii['2xl']} height={skeletonHeight} width={itemWidth} />
          {indicatorPosition === 'outside' ? (
            <SkeletonPlaceholder.Item
              alignSelf="center"
              height={10}
              marginTop={theme.spacing.s3}
              width={74}
              borderRadius={theme.radii.xl}
            />
          ) : (
            <></>
          )}
        </SkeletonPlaceholder>
      </Box>
    );
  }

  return (
    <>
      <AnimatedFlatList
        {...rest}
        data={data}
        horizontal
        pagingEnabled
        decelerationRate="fast"
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        onScroll={scrollHandler}
        renderItem={memoizedRenderItem}
        snapToInterval={itemWidth}
      />

      {indicatorKeyExtractor ? (
        <Box
          flexDirection="row"
          justifyContent="center"
          style={indicatorPosition === 'inside' ? styles.sliderIndicatorStyles : null}
        >
          {data.map((item, index) => {
            return (
              <SliderIndicator
                key={indicatorKeyExtractor(item, index)}
                width={itemWidth}
                scrollX={scrollX}
                index={index}
              />
            );
          })}
        </Box>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  sliderIndicatorStyles: {
    backgroundColor: theme.colors.blackAlpha500,
    borderRadius: theme.radii.xl,
    alignSelf: 'center',
    bottom: theme.spacing.s3,
    padding: theme.spacing.s1,
    position: 'absolute',
  },
});
