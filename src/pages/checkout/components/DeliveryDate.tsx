import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Pressable } from 'react-native';

import { KS_ICON, KsIcon } from '@assets/icons';
import theme from '@assets/theme/theme';
import { Box, Text } from '@components';
import { useLocalizedData, useOrderState } from '@contexts';
import { BasketScreens } from '@routes/routes';
import { KsNavigation } from '@types';
import { formatDeliveryTimeFrame } from '@utils';

export const DeliveryDate = () => {
  const { strings } = useLocalizedData();

  const { activeOrder, timerCountInMinute, displayTimer } = useOrderState();
  const [timeFrame, setTimeFrame] = useState('');

  const navigation: KsNavigation = useNavigation();

  useEffect(() => {
    const frame = formatDeliveryTimeFrame(activeOrder, strings);
    setTimeFrame(frame);
  }, [activeOrder]);

  const navigateToDateSelectionScreen = () => {
    navigation.navigate(BasketScreens.ORDER_DELIVERY_DATE_SELECTION_SCREEN);
  };

  return (
    <Box paddingBottom="s5" marginBottom="s5" borderBottomColor="gray100" borderBottomWidth={theme.spacing.px}>
      <Pressable onPress={navigateToDateSelectionScreen}>
        <Box flexDirection="row" justifyContent="space-between">
          <Box flexDirection="row">
            <Box backgroundColor="gray100" paddingHorizontal="s1" justifyContent="center" borderRadius={theme.radii.md}>
              <KsIcon name={KS_ICON.TRUCK_FAST} color={theme.colors.gray700} size={16} />
            </Box>

            <Box justifyContent="center" paddingHorizontal="s3" flexDirection="column">
              <Text variant="heading-xs">{timeFrame}</Text>
              {displayTimer ? (
                <Box flexDirection="row" alignItems="center" marginTop="s1">
                  <KsIcon
                    name={KS_ICON.CLOCK}
                    color={theme.colors.defaultTextColor}
                    style={{ marginRight: theme.spacing.s1 }}
                  />

                  <Text variant="text-xs">
                    {timerCountInMinute === 1
                      ? strings.dashboard.orderInNextOneMinute
                      : strings.dashboard.orderInNextMinutes.replace(':xMinutes', String(timerCountInMinute))}
                  </Text>
                </Box>
              ) : null}
            </Box>
          </Box>
          <Box padding="s2" justifyContent="center">
            <KsIcon name={KS_ICON.ARROW_RIGHT_3} size={16} color={theme.colors.gray700} />
          </Box>
        </Box>
      </Pressable>
    </Box>
  );
};
