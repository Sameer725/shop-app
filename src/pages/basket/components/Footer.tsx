import React, { useEffect, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Shadow, ShadowProps } from 'react-native-shadow-2';

import { KsIcon } from '@assets/icons';
import theme from '@assets/theme/theme';
import { Box, Button, Text } from '@components';
import { useLocalizedData } from '@contexts';
import { Order } from '@types';
import { formatPrice } from '@utils';

interface FooterProps {
  activeOrder?: Order;
  onPress: () => void;
  isEmpty: boolean;
}

export const Footer = (props: FooterProps) => {
  const { activeOrder, onPress, isEmpty } = props;
  const { strings } = useLocalizedData();
  const [deposit, setDeposit] = useState<number>(0);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const tempDeposit = activeOrder?.surcharges?.find((surcharge) => surcharge.sku === 'deposit')?.priceWithTax ?? 0;

    setDeposit(tempDeposit);
  }, [activeOrder]);

  return !isEmpty ? (
    <Shadow
      viewStyle={{
        alignSelf: 'stretch',
        paddingBottom: insets.bottom,
        backgroundColor: theme.colors.white,
      }}
      getChildRadius={false}
      {...shadow}
    >
      <Box
        paddingVertical="s2"
        paddingHorizontal="s4"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box flex={1}>
          <Text variant="text-xs" fontWeight="bold">
            {activeOrder?.totalQuantity} {strings.basket.article}
          </Text>
          <Text variant="text-md" fontWeight="bold">
            {formatPrice(activeOrder?.subTotalNoDiscounts ?? 0)}
          </Text>
          {deposit ? (
            <Text variant="text-xs">{strings.basket.deposit.replace('$Price', formatPrice(deposit) ?? '')}</Text>
          ) : null}
          {activeOrder?.shippingWithTax ? (
            <Text variant="text-xs">
              {strings.basket.deliveryCharges.replace('$Price', formatPrice(activeOrder?.shippingWithTax ?? 0) ?? '0')}
            </Text>
          ) : null}
        </Box>
        <Button
          onPress={onPress}
          trailingIcon={<KsIcon name="arrow-right-3" color={theme.colors.white} size={theme.spacing.s4} />}
          justifyContent="center"
          width="auto"
        >
          {strings.basket.checkOut}
        </Button>
      </Box>
    </Shadow>
  ) : null;
};

const shadow: ShadowProps = {
  startColor: 'rgba(0, 0, 0, 0.07)',
  distance: 5,
};
