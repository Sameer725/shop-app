import { useMutation, useQuery } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList, ListRenderItem, Pressable } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import { KS_ICON, KsIcon } from '@assets/icons';
import theme from '@assets/theme/theme';
import { useLocalizedData, useOrderAction, useOrderState } from '@contexts';
import { GET_CUSTOMER_ADDRESSES, UPDATE_ORDER_SHIPPING_ADDRESS } from '@graphqlDocuments';
import { useToastNotification } from '@hooks/useToastNotification';
import { BasketScreens, DashboardScreens } from '@routes/routes';
import { ActiveOrderResult, Address, GetCustomerAddressesQuery, KsNavigation, Order } from '@types';
import { formatAddress } from '@utils';
import { Box } from './Box';
import { Button, ButtonType } from './Button';
import { ModalPopUp } from './ModalPopUp';
import { ShadowBox } from './ShadowBox';
import { Text } from './Text';

const SKELETON_BLOCK_HEIGHTS: number[] = [52, 52];

interface Props {
  showModal: boolean;
  deliveryAddressNewRoute?: DashboardScreens.DELIVERY_ADDRESS_NEW | BasketScreens.ORDER_DELIVERY_ADDRESS_NEW;
  closeModal: () => void;
}

export const DeliveryAddressSelectionModal: React.FC<Props> = (props) => {
  const { showModal, deliveryAddressNewRoute = DashboardScreens.DELIVERY_ADDRESS_NEW, closeModal } = props;

  const { data, loading } = useQuery<GetCustomerAddressesQuery>(GET_CUSTOMER_ADDRESSES, {
    notifyOnNetworkStatusChange: true,
  });

  const { activeOrder } = useOrderState();
  const { setActiveOrder, setEarliestDeliveryTime } = useOrderAction();
  const { showGeneralErrorToast } = useToastNotification();
  const { strings } = useLocalizedData();

  const addressText = activeOrder?.shippingAddress ? formatAddress(activeOrder?.shippingAddress) : '';

  const navigation: KsNavigation = useNavigation();

  const addNewAddress = () => {
    closeModal();
    navigation.navigate(deliveryAddressNewRoute);
  };

  const [updateOrderShippingAddress, { loading: isLoading }] = useMutation<{
    setOrderShippingAddress: ActiveOrderResult;
  }>(UPDATE_ORDER_SHIPPING_ADDRESS, {
    onCompleted: ({ setOrderShippingAddress }) => {
      if (setOrderShippingAddress.__typename === 'Order') {
        const updatedActiveOrder = {
          ...activeOrder,
          shippingAddress: setOrderShippingAddress.shippingAddress,
          customFields: setOrderShippingAddress.customFields,
          shippingLines: setOrderShippingAddress.shippingLines,
        };

        setActiveOrder(updatedActiveOrder as Order);
        void setEarliestDeliveryTime(updatedActiveOrder.customFields?.earliestDeliveryTime as Date);

        closeModal();
      }
    },
    onError: () => showGeneralErrorToast(),
  });

  const updateAddress = (address: Address) => {
    if (formatAddress(address) === addressText) {
      closeModal();
      return;
    }
    void updateOrderShippingAddress({
      variables: {
        input: {
          fullName: address.fullName,
          streetLine1: address.streetLine1,
          city: address.city,
          postalCode: address.postalCode,
          countryCode: address.country.code,
        },
      },
    });
  };

  const renderLoadingState = () => (
    <SkeletonPlaceholder>
      {SKELETON_BLOCK_HEIGHTS.map((height, index) => (
        <SkeletonPlaceholder.Item
          key={index}
          borderRadius={theme.radii.xl}
          height={height}
          width="100%"
          marginBottom={theme.spacing.s2}
        />
      ))}
    </SkeletonPlaceholder>
  );

  const renderAddressItem: ListRenderItem<Address> = ({ item: address }) => (
    <Pressable onPress={() => updateAddress(address)}>
      <ShadowBox
        backgroundColor="white"
        borderRadius={theme.radii.xl}
        padding="s2"
        containerViewStyle={{
          marginBottom: theme.spacing.s2,
        }}
      >
        <Box flex={1} flexDirection="row" alignItems="center">
          <KsIcon
            name={KS_ICON.LOCATION}
            size={theme.spacing.s6}
            color={formatAddress(address) === addressText ? theme.colors.primary500 : theme.colors.gray600}
          />
          <Text variant="text-xs" marginLeft="s3">
            {formatAddress(address)}
          </Text>
        </Box>
      </ShadowBox>
    </Pressable>
  );

  return (
    <ModalPopUp
      isVisible={showModal}
      header={strings.deliveryDate.selectDeliveryAddress}
      isCloseIconVisible={false}
      onClose={closeModal}
    >
      {loading ? (
        renderLoadingState()
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data?.activeCustomer?.addresses as Address[]}
          keyExtractor={(address) => address.id}
          renderItem={renderAddressItem}
        />
      )}

      <Button onPress={addNewAddress} type={ButtonType.PRIMARY} marginTop="s3" isLoading={isLoading}>
        {strings.deliveryDate.newDeliveryAddress}
      </Button>
      <Button onPress={closeModal} type={ButtonType.OUTLINE}>
        {strings.cancel}
      </Button>
    </ModalPopUp>
  );
};
