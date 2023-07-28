import { BottomTabBarProps } from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import React, { useEffect } from 'react';
import { Dimensions, StyleSheet, ViewStyle } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Shadow, ShadowProps } from 'react-native-shadow-2';

import theme from '@assets/theme/theme';
import { Tabs } from '@routes/routes';
import { Box } from '../Box';
import { BottomTabBarItem } from './BottomTabBarItem';

const AnimatedBox = Animated.createAnimatedComponent(Box);

const PADDING_HORIZONTAL = 's3';
const PADDING_HORIZONTAL_VALUE = theme.spacing[PADDING_HORIZONTAL];
const ITEM_SIZE = 50;

export const BottomTabBar: React.FC<BottomTabBarProps> = (props) => {
  const { state, navigation, descriptors } = props;
  const insets = useSafeAreaInsets();

  const offset = useSharedValue(0);

  const getIndicatorPosition = () => {
    const numberOfItems = state.routes.length;
    const windowWidth = Dimensions.get('window').width;

    return (windowWidth - ITEM_SIZE - 2 * PADDING_HORIZONTAL_VALUE) * (state.index / (numberOfItems - 1));
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value }],
  }));

  useEffect(() => {
    offset.value = withTiming(getIndicatorPosition(), { duration: 300, easing: Easing.elastic(0.9) });
  }, [state.index]);

  const tabBarStyle = descriptors[state.routes[state.index].key].options?.tabBarStyle as ViewStyle;

  if (tabBarStyle?.display === 'none') {
    return null;
  }

  return (
    <Shadow
      viewStyle={{
        alignSelf: 'stretch',
      }}
      getChildRadius={false}
      {...shadow}
    >
      <AnimatedBox
        style={[
          animatedStyle,
          styles.animatedBox,
          {
            paddingBottom: insets.bottom,
          },
        ]}
      >
        <Shadow {...shadow}>
          <Box style={styles.activeTabIndicator} />
        </Shadow>
      </AnimatedBox>

      <Box
        flexDirection="row"
        justifyContent="space-between"
        paddingHorizontal={PADDING_HORIZONTAL}
        backgroundColor="white"
        style={{ paddingBottom: insets.bottom }}
      >
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              // The `merge: true` option makes sure that the params inside the tab screen are preserved
              navigation.navigate(route.name, { merge: true });
            }
          };

          return (
            <BottomTabBarItem
              name={route.name as Tabs}
              key={route.name}
              size={ITEM_SIZE}
              onPress={onPress}
              isFocused={isFocused}
            />
          );
        })}
      </Box>
    </Shadow>
  );
};

const styles = StyleSheet.create({
  animatedBox: {
    position: 'absolute',
    left: PADDING_HORIZONTAL_VALUE,
    bottom: 0,
  },
  activeTabIndicator: {
    width: 50,
    height: 54,
    borderRadius: 27,
    backgroundColor: theme.colors.white,
  },
});

const shadow: ShadowProps = {
  startColor: 'rgba(0, 0, 0, 0.07)',
  distance: 5,
};
