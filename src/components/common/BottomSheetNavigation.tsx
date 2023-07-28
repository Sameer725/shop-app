import BottomSheet from '@gorhom/bottom-sheet';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import {
  createNavigatorFactory,
  EventListenerCallback,
  EventMapBase,
  ParamListBase,
  StackActionType,
  StackNavigationState,
  StackRouter,
  useNavigationBuilder,
} from '@react-navigation/native';
import { StackNavigationEventMap, StackNavigationOptions, StackNavigationProp } from '@react-navigation/stack';
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { BackHandler, LayoutChangeEvent, Pressable, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import theme from '@assets/theme/theme';
import { useKeyboard } from '@hooks';
import { Box } from './Box';

interface BottomSheetNavigatorProps {
  initialRouteName?: string;
  screenOptions?: StackNavigationOptions;
  children: React.ReactNode;
}

interface Event {
  preventDefault: () => void;
  data: { action: StackActionType };
}

const defaultScreenProps: BottomSheetNavigatorProps['screenOptions'] = {
  headerShown: false,
  presentation: 'transparentModal',
  animationEnabled: false,
  cardOverlayEnabled: false,
};

interface BottomSheetRendererProps {
  render: () => JSX.Element;
  bottomInset: number;
  sheetRef: React.RefObject<BottomSheetMethods>;
  keyboardHeight: number;
}

const BottomSheetRenderer = (props: BottomSheetRendererProps) => {
  const { bottomInset, keyboardHeight, render, sheetRef } = props;
  const [contentHeight, setContentHeight] = useState(1);

  const onLayout = useCallback(
    (event: LayoutChangeEvent) => setContentHeight(event.nativeEvent.layout.height + theme.spacing.s5),
    []
  );

  return (
    <BottomSheet
      enableContentPanningGesture={false}
      enableHandlePanningGesture={false}
      enablePanDownToClose={false}
      enableOverDrag={false}
      snapPoints={[contentHeight, contentHeight + keyboardHeight]}
      ref={sheetRef}
      handleIndicatorStyle={{ display: 'none' }}
      contentHeight={contentHeight}
    >
      <Box onLayout={onLayout} style={{ paddingBottom: bottomInset }}>
        {render()}
      </Box>
    </BottomSheet>
  );
};

const Renderer = React.memo(BottomSheetRenderer);

export const BottomNavigator = (props: BottomSheetNavigatorProps) => {
  const { initialRouteName, children, screenOptions } = props;
  const { bottom } = useSafeAreaInsets();
  const { isKeyboardOpen, keyboardHeight } = useKeyboard();

  const prevIndex = useRef<number>(0);

  const { NavigationContent, state, descriptors, ...other } = useNavigationBuilder(StackRouter, {
    children,
    screenOptions: { ...screenOptions, ...defaultScreenProps },
    initialRouteName,
  });

  const routes = useMemo(() => {
    return state.routes.map((route) => ({
      ...route,
      ref: React.createRef<BottomSheet>(),
    }));
  }, [state.routes]);

  const navigation = useMemo(
    () => other.navigation,
    [other.navigation]
  ) as unknown as StackNavigationProp<ParamListBase>;

  useEffect(() => {
    const backAction = () => {
      return goBackToParent();
    };

    const backHander = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHander.remove();
  }, [routes]);

  const currentRouteRef = useMemo(() => routes[state.index]?.ref, [routes, state.index]);

  const hideBottomSheet: EventListenerCallback<EventMapBase, keyof EventMapBase> = useCallback(
    (e) => {
      const event = e as unknown as Event;
      event.preventDefault();
      currentRouteRef?.current?.close();
      navigation.dispatch(event.data.action);
    },
    [currentRouteRef, navigation]
  );

  useLayoutEffect(() => {
    if (prevIndex.current !== state.index) {
      routes[prevIndex.current]?.ref?.current?.close();
      currentRouteRef.current?.expand();
      currentRouteRef.current?.snapToIndex(0);
    }

    prevIndex.current = state.index;

    const blur = navigation.addListener('beforeRemove', hideBottomSheet);

    return () => {
      blur();
    };
  }, [state, hideBottomSheet, currentRouteRef, prevIndex]);

  useLayoutEffect(() => {
    if (isKeyboardOpen) {
      currentRouteRef?.current?.snapToIndex(1);
    } else {
      currentRouteRef?.current?.snapToIndex(0);
    }
  }, [currentRouteRef, isKeyboardOpen]);

  const goBackToParent = useCallback(() => {
    const parentState = navigation.getParent()?.getState();

    if (!parentState) {
      return false;
    }

    for (const item of routes) {
      item.ref.current?.close();
    }

    const parentIndex = parentState.routes.length - 2;
    const parentName = parentState.routes[parentIndex].name;

    navigation.navigate(parentName);

    return true;
  }, [routes]);

  return (
    <NavigationContent key={state.key}>
      <Pressable
        style={{ backgroundColor: theme.colors.blackAlpha200, ...StyleSheet.absoluteFillObject }}
        onPress={goBackToParent}
      />

      {routes.map((route) => {
        return (
          <Renderer
            key={route.key}
            bottomInset={bottom}
            sheetRef={route.ref}
            // eslint-disable-next-line @typescript-eslint/unbound-method
            render={descriptors[route.key].render}
            keyboardHeight={keyboardHeight}
          />
        );
      })}
    </NavigationContent>
  );
};

export const createBottomSheetNavigator = createNavigatorFactory<
  StackNavigationState<ParamListBase>,
  StackNavigationOptions,
  StackNavigationEventMap,
  typeof BottomNavigator
>(BottomNavigator);
