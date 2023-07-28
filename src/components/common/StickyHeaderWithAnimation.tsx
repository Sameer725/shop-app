import React, { useCallback, useMemo, useState } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent, StyleSheet, View } from 'react-native';
import Animated, { FadeInUp, FadeOutUp, Layout } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import theme from '@assets/theme/theme';

interface Props {
  children?: React.ReactNode;
}

export const StickyHeaderWithAnimation = (props: Props) => {
  const { children } = props;
  const insets = useSafeAreaInsets();

  return (
    <Animated.View
      entering={FadeInUp.duration(200)}
      exiting={FadeOutUp.duration(200)}
      layout={Layout.springify()}
      style={[
        styles.containerStyles,
        {
          marginTop: insets.top,
        },
      ]}
    >
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  containerStyles: {
    position: 'absolute',
    backgroundColor: theme.colors.background,
    paddingTop: theme.spacing.s5,
    paddingRight: theme.spacing.s5,
    width: '100%',
  },
});

interface UseStickyHeader {
  alwaysDisplayed: boolean;
}

export const useStickyHeader = (props?: UseStickyHeader) => {
  const { alwaysDisplayed = false } = props ?? {};
  const [measure, setMeasure] = useState<number>(500);
  const [showStickyHeader, setShowStickyHeader] = useState(alwaysDisplayed);

  const setReferenceViewLayout = useCallback((containerRef: React.RefObject<View>) => {
    containerRef.current?.measure((x, y, width, height, pageX, pageY) => {
      setMeasure(height + pageY);
    });
  }, []);

  const scrollHandler = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (event.nativeEvent.contentOffset.y > measure - 20) {
        setShowStickyHeader(true);
      } else {
        setShowStickyHeader(false);
      }
    },
    [measure]
  );

  const StickyHeader = useCallback(
    ({ ...componentProps }) => {
      return showStickyHeader || alwaysDisplayed ? <StickyHeaderWithAnimation {...componentProps} /> : null;
    },
    [showStickyHeader, alwaysDisplayed]
  );

  return useMemo(
    () => ({ setReferenceViewLayout, scrollHandler, StickyHeader }),
    [StickyHeader, scrollHandler, setReferenceViewLayout]
  );
};
