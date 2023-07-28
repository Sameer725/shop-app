import React from 'react';

import theme from '@assets/theme/theme';
import { ShadowBox, Text } from '@components';
import { useLocalizedData } from '@contexts';
import { Order } from '@types';
import { DeliverySteps } from './DeliverySteps';

interface Props {
  order?: Order;
}

export const DeliveryStatus: React.FC<Props> = (props) => {
  const { order } = props;

  const { strings } = useLocalizedData();

  return (
    <ShadowBox
      backgroundColor="white"
      borderRadius={theme.radii['2xl']}
      containerViewStyle={{
        paddingVertical: theme.spacing.s2,
        paddingHorizontal: theme.spacing.s3,
      }}
    >
      <Text variant="heading-sm" marginBottom="s1">
        {strings.profileSettings.order.orderInformation}
      </Text>

      <Text variant="text-xs-sb">#{order?.code}</Text>

      <DeliverySteps status={order?.state} />
    </ShadowBox>
  );
};
