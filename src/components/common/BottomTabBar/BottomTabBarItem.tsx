import React, { Key } from 'react';
import { Pressable, StyleSheet } from 'react-native';

import { KS_ICON, KsIcon } from '@assets/icons';
import theme from '@assets/theme/theme';
import { useOrderState } from '@contexts';
import { Tabs } from '@routes/routes';
import { Box } from '../Box';
import { Text } from '../Text';

interface Props {
  name: Tabs;
  isFocused: boolean;
  key: Key;
  onPress: () => void;
  size: number;
}

export const BottomTabBarItem: React.FC<Props> = (props) => {
  const { isFocused, name, size, ...rest } = props;

  const getIcon = (): KS_ICON | string => {
    switch (name) {
      case Tabs.DASHBOARD:
        return KS_ICON.HOME_2;
      case Tabs.PRODUCT_SEARCH:
        return KS_ICON.SEARCH_NORMAL_1;
      case Tabs.BASKET:
        return KS_ICON.BAG_2;
      case Tabs.FAVORITES:
        return KS_ICON.HEART;
      case Tabs.PROFILE_SETTINGS:
        return KS_ICON.PROFILE;
      default:
        return '';
    }
  };

  const { activeOrder } = useOrderState();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={isFocused ? { selected: true } : {}}
      style={{ ...styles.button, width: size, height: size }}
      {...rest}
    >
      {name === Tabs.BASKET && activeOrder && activeOrder?.totalQuantity > 0 ? (
        <Box style={styles.bubbleStyles}>
          <Text color="white" variant="heading-2xs" textAlign="center">
            {activeOrder?.totalQuantity < 100 ? activeOrder?.totalQuantity : ':)'}
          </Text>
        </Box>
      ) : null}
      <KsIcon
        name={getIcon()}
        color={isFocused ? theme.colors.primary500 : theme.colors.gray600}
        bold={isFocused}
        size={25}
      ></KsIcon>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  bubbleStyles: {
    borderRadius: 9999,
    position: 'absolute',
    backgroundColor: theme.colors.primary500,
    top: theme.spacing.s2,
    left: 26,
    justifyContent: 'center',
    alignItems: 'center',
    height: 18,
    width: 18,
    zIndex: 1,
  },
});
