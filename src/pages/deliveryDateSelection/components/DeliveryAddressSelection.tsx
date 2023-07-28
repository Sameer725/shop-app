import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';

import { KS_ICON, KsIcon } from '@assets/icons';
import theme from '@assets/theme/theme';
import { Button, ButtonSize, ButtonType, DeliveryAddressSelectionModal, ShadowBox } from '@components';
import { useLocalizedData, useOrderState } from '@contexts';
import { BasketScreens, DashboardScreens } from '@routes/routes';
import { KsNavigation } from '@types';
import { formatAddress } from '@utils';

interface RouteParams {
  isFromBasketNavigation?: boolean;
}

export const DeliveryAddressSelection: React.FC = () => {
  const { activeOrder } = useOrderState();

  const route: RouteProp<{ params: RouteParams }, 'params'> = useRoute();

  const navigation: KsNavigation = useNavigation();
  const { strings } = useLocalizedData();

  const [showAddressListModal, setShowAddressListModal] = useState(false);

  const closeModal = () => setShowAddressListModal(false);
  const openModal = () => setShowAddressListModal(true);

  const onPress = () => {
    if (activeOrder?.shippingAddress?.postalCode) {
      openModal();
    } else {
      navigation.navigate(
        route.params?.isFromBasketNavigation
          ? BasketScreens.ORDER_DELIVERY_ADDRESS_NEW
          : DashboardScreens.DELIVERY_ADDRESS_NEW
      );
    }
  };

  const addressText = activeOrder?.shippingAddress?.postalCode
    ? formatAddress(activeOrder?.shippingAddress)
    : strings.deliveryDate.createAddress;

  return (
    <>
      <DeliveryAddressSelectionModal
        closeModal={closeModal}
        showModal={showAddressListModal}
        deliveryAddressNewRoute={
          route.params?.isFromBasketNavigation
            ? BasketScreens.ORDER_DELIVERY_ADDRESS_NEW
            : DashboardScreens.DELIVERY_ADDRESS_NEW
        }
      />

      <ShadowBox>
        <Button
          marginVertical="s2"
          marginHorizontal="s3"
          onPress={onPress}
          leadingIcon={
            <KsIcon name={KS_ICON.TRUCK_FAST} size={theme.spacing.s4} color={theme.colors.defaultTextColor} />
          }
          type={ButtonType.OUTLINE}
          size={ButtonSize.MD}
          numberOfLines={1}
        >
          {addressText}
        </Button>
      </ShadowBox>
    </>
  );
};
