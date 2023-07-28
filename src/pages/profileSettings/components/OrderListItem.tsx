import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { Pressable } from 'react-native';

import { KS_ICON, KsIcon } from '@assets/icons';
import theme from '@assets/theme/theme';
import { Box, ShadowBox, Text } from '@components';
import { useLocalizedData } from '@contexts';
import { ProfileSettingsScreens } from '@routes/routes';
import { KsNavigation, Order, OrderState } from '@types';
import { formatPrice } from '@utils';

export interface OrderListItemProps {
  order: Order;
  showDetails?: boolean;
  fromComplaintModal?: boolean;
  onCloseModal?: () => void;
}

interface OrderStateStyle {
  text: string;
  color: string;
  icon: KS_ICON | undefined;
}

export const OrderListItem: React.FC<OrderListItemProps> = (props) => {
  const { order, showDetails = false, fromComplaintModal = false, onCloseModal } = props;
  const { strings } = useLocalizedData();
  const navigation: KsNavigation = useNavigation();

  const [orderState, setOrderState] = useState<OrderStateStyle>({
    text: '',
    color: theme.colors.defaultTextColor,
    icon: undefined,
  });
  const [deliveryTimeFrame, setDeliveryTimeFrame] = useState<string>('');

  useEffect(() => {
    setOrderState(getStateStyle());

    if (!order?.customFields?.earliestDeliveryTime || !order?.customFields?.latestDeliveryTime) {
      setDeliveryTimeFrame('');
      return;
    }
    const earliestDelivery = dayjs(String(order.customFields.earliestDeliveryTime));
    const latestDelivery = dayjs(String(order.customFields.latestDeliveryTime));

    setDeliveryTimeFrame(
      `${earliestDelivery.format('DD.MM.YYYY')} | ${earliestDelivery.format('HH:mm')} - ${latestDelivery.format(
        'HH:mm'
      )} ${strings.profileSettings.order.clock}`
    );
  }, [order]);

  const getStateStyle = (): OrderStateStyle => {
    switch (order.state) {
      case OrderState.ARRANGING_PAYMENT:
      case OrderState.PAYMENT_AUTHORIZED:
      case OrderState.PAYMENT_SETTLED:
      case OrderState.MODIFYING:
      case OrderState.ARRANGING_ADDITIONAL_PAYMENT:
        return {
          text: strings.profileSettings.order.orderState.confirmed,
          color: theme.colors.defaultTextColor,
          icon: KS_ICON.BAG_TIMER,
        };
      case OrderState.SHIPPED:
      case OrderState.PARTIALLY_SHIPPED:
      case OrderState.PARTIALLY_DELIVERED:
        return {
          text: strings.profileSettings.order.orderState.shipped,
          color: theme.colors.information500,
          icon: KS_ICON.BAG_TIMER,
        };
      case OrderState.DELIVERED:
        return {
          text: strings.profileSettings.order.orderState.delivered,
          color: theme.colors.primary500,
          icon: KS_ICON.BAG_TICK,
        };
      case OrderState.CANCELLED:
        return {
          text: strings.profileSettings.order.orderState.cancelled,
          color: theme.colors.error500,
          icon: KS_ICON.BAG_CROSS,
        };
      default:
        return {
          text: order?.state,
          color: theme.colors.error500,
          icon: undefined,
        };
    }
  };

  const navigateToOrderDetails = () => {
    if (fromComplaintModal) {
      if (onCloseModal) {
        onCloseModal();
      }
      navigation.navigate(ProfileSettingsScreens.COMPLAINT_SCREEN, { orderId: order.id });
    } else {
      navigation.navigate(ProfileSettingsScreens.ORDER_DETAILS, { orderId: order.id });
    }
  };

  const fullName = order?.shippingAddress?.fullName
    ? order?.shippingAddress?.fullName
    : `${order?.customer?.firstName ?? ''}  ${order?.customer?.lastName ?? ''}`;

  return (
    <Pressable onPress={navigateToOrderDetails}>
      <ShadowBox paddingHorizontal="s3" paddingVertical="s4" borderRadius={theme.radii.xl}>
        <Box flex={1} flexDirection="row" alignItems="center" marginBottom="s2">
          {orderState.icon ? <KsIcon name={orderState.icon} size={theme.spacing.s5} color={orderState.color} /> : null}
          <Text variant="heading-xs" marginLeft="s2" style={{ color: orderState.color }}>
            {orderState.text}
          </Text>
        </Box>
        <Text variant="text-sm" fontWeight="500" marginBottom="s1">
          {deliveryTimeFrame}
        </Text>
        <Text variant="text-sm">
          {order.totalQuantity} {strings.profileSettings.order.product[order.totalQuantity === 1 ? 1 : 'other']}
          {' | '}
          {formatPrice(order.totalWithTax)}
        </Text>
        {showDetails ? (
          <>
            <Text variant="text-xs" marginTop="s2">
              {fullName}
            </Text>
            <Text variant="text-xs">
              {order.shippingAddress?.streetLine1}, {order.shippingAddress?.postalCode} {order.shippingAddress?.city}
            </Text>
          </>
        ) : null}
      </ShadowBox>
    </Pressable>
  );
};
