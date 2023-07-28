import { useLazyQuery } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';

import { KS_ICON, KsIcon } from '@assets/icons';
import theme from '@assets/theme/theme';
import { useDisplayTimerAndMinuteCount, useLocalizedData, useOrderState } from '@contexts';
import { ACTIVE_CHANNEL_QUERY } from '@graphqlDocuments';
import { CommonScreens } from '@routes/routes';
import { ActiveChannelQuery, KsNavigation } from '@types';
import { formatAddress, formatDeliveryTimeFrame } from '@utils';
import { Box } from './Box';
import { OverlappingInfoState } from './OverlappingInfoState';
import { ShadowBox } from './ShadowBox';
import { Text } from './Text';

interface DeliveryConditionCardProps {
  infoText?: string;
}

interface NextOrderComponentProps {
  messageForOneMinute: string;
  messageForXminute: string;
}
const NextOrderComponent = (props: NextOrderComponentProps) => {
  const { messageForOneMinute, messageForXminute } = props;

  const { displayTimer, timerCountInMinute } = useDisplayTimerAndMinuteCount();

  return displayTimer ? (
    <Text variant="text-xs" color="primary500" marginBottom="s1">
      {timerCountInMinute === 1
        ? messageForOneMinute
        : messageForXminute.replace(':xMinutes', String(timerCountInMinute))}
    </Text>
  ) : null;
};

export const DeliveryConditionCard: React.FC<DeliveryConditionCardProps> = (props) => {
  const { infoText } = props;
  const { strings } = useLocalizedData();
  const navigation: KsNavigation = useNavigation();

  const { activeOrder } = useOrderState();
  const [addressText, setAddressText] = useState('');

  const timeFrame = formatDeliveryTimeFrame(activeOrder, strings);

  const [getActiveChannel, { data: activeChannel }] = useLazyQuery<ActiveChannelQuery>(ACTIVE_CHANNEL_QUERY);

  useEffect(() => {
    if (activeOrder && !activeOrder.shippingAddress?.postalCode) {
      void getActiveChannel();
    }
  }, [activeOrder]);

  useEffect(() => {
    const address = activeOrder?.shippingAddress?.postalCode
      ? formatAddress(activeOrder?.shippingAddress)
      : strings.dashboard.browseInChannel.replace(':activeChannel', String(activeChannel?.activeChannel.code));

    setAddressText(address ?? '');
  }, [activeOrder, activeChannel]);

  const navigateToDateSelectionScreen = () => {
    navigation.navigate(CommonScreens.DELIVERY_DATE_SELECTION_SCREEN);
  };

  return (
    <Box style={styles.spacing}>
      {infoText ? <OverlappingInfoState text={infoText} backgroundColor="primary500" color="white" /> : null}
      <ShadowBox containerViewStyle={styles.containerViewStyle} paddingHorizontal="s3" paddingVertical="s4">
        <Pressable onPress={navigateToDateSelectionScreen}>
          <Box flexDirection="row" justifyContent="space-between">
            <Box flexDirection="row">
              <Box
                backgroundColor="gray100"
                paddingHorizontal="s1"
                justifyContent="center"
                borderRadius={theme.radii.md}
              >
                <KsIcon name={KS_ICON.TRUCK_FAST} color={theme.colors.gray700} size={16} />
              </Box>
              <Box paddingHorizontal="s3">
                <NextOrderComponent
                  messageForOneMinute={strings.dashboard.orderInNextOneMinute}
                  messageForXminute={strings.dashboard.orderInNextMinutes}
                />
                <Text variant="heading-xs" marginBottom="s1">
                  {timeFrame}
                </Text>

                <Text variant="text-xs">{addressText}</Text>
              </Box>
            </Box>
            <Box padding="s2" justifyContent="center">
              <KsIcon name={KS_ICON.ARROW_RIGHT_3} color={theme.colors.gray700} size={16} />
            </Box>
          </Box>
        </Pressable>
      </ShadowBox>
    </Box>
  );
};

const styles = StyleSheet.create({
  spacing: {
    marginTop: -theme.spacing.s5,
  },
  containerViewStyle: {
    borderRadius: theme.radii['2xl'],
  },
});
