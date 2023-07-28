import React from 'react';

import { KS_ICON, KsIcon } from '@assets/icons';
import theme from '@assets/theme/theme';
import { Box, ShadowBox, Text } from '@components';
import { useLocalizedData } from '@contexts';
import { Order } from '@types';
import { formatAddress, formatDeliveryTimeFrame } from '@utils';

interface Props {
  order?: Order;
}

export const DeliveryDetails: React.FC<Props> = (props) => {
  const { order } = props;

  const { strings } = useLocalizedData();

  const timeFrame = formatDeliveryTimeFrame(order, strings);

  const addressText = order?.shippingAddress ? formatAddress(order?.shippingAddress) : '';
  const fullName = order?.shippingAddress?.fullName
    ? order?.shippingAddress?.fullName
    : `${order?.customer?.firstName ?? ''}  ${order?.customer?.lastName ?? ''}`;

  return (
    <ShadowBox
      backgroundColor="white"
      borderRadius={theme.radii['2xl']}
      containerViewStyle={{
        paddingVertical: theme.spacing.s4,
        paddingHorizontal: theme.spacing.s3,
        marginTop: theme.spacing.s5,
      }}
    >
      <Text variant="heading-sm" marginBottom="s5">
        {strings.profileSettings.order.delivery}
      </Text>

      <Box flexDirection="row">
        <Box backgroundColor="gray100" paddingHorizontal="s1" justifyContent="center" borderRadius={theme.radii.md}>
          <KsIcon name={KS_ICON.TRUCK_FAST} color={theme.colors.gray700} size={16} />
        </Box>
        <Box paddingHorizontal="s3">
          <Text variant="heading-xs">{timeFrame}</Text>

          <Text variant="text-xs" marginTop="s1">
            {fullName}
          </Text>

          <Text variant="text-xs" marginTop="s1">
            {addressText}
          </Text>
        </Box>
      </Box>
    </ShadowBox>
  );
};
