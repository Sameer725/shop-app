import { useMutation } from '@apollo/client';
import { useRoute } from '@react-navigation/native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { KS_ICON } from '@assets/icons';
import theme from '@assets/theme/theme';
import { Box, Button, ButtonType, PlaceHolder, ShadowBox } from '@components';
import { useAuthData, useLocalizedData, useOrderAction, useOrderState } from '@contexts';
import {
  CREATE_CUSTOMER_ADDRESS_MUTATION,
  CREATE_WAITING_LIST_MUTATION,
  UPDATE_CUSTOMER_ADDRESS,
  UPDATE_ORDER_SHIPPING_ADDRESS,
} from '@graphqlDocuments';
import { useToastNotification } from '@hooks';
import { AuthScreens, BasketScreens, DashboardScreens, ProfileSettingsScreens } from '@routes/routes';
import {
  ActiveOrderResult,
  AddressAutoCompletion,
  CreateAddressInput,
  CreateCustomerAddressMutation,
  CreateCustomerAddressMutationVariables,
  CreateWaitingListMutation,
  Order,
  UpdateAddressInput,
  UpdateCustomerAddress,
} from '@types';
import { LoginAsGuestButton } from '../../auth/components/LoginAsGuestButton';
import { AddressItem } from './AddressItem';

interface Props {
  selectedAddress: AddressAutoCompletion;
  addressId?: string;
  changeAddress: () => void;
  onSubmit: () => void;
  emailAddress?: string;
  isDefaultAddress?: boolean;
}

export const AddressSelected: React.FC<Props> = (props) => {
  const { selectedAddress, emailAddress, changeAddress, addressId, onSubmit, isDefaultAddress = false } = props;
  const { strings } = useLocalizedData();
  const { dispatchUpdateLogin, loginStatus } = useAuthData();
  const { showGeneralErrorToast } = useToastNotification();
  const { activeOrder } = useOrderState();
  const { refetchOrder, setActiveOrder, setEarliestDeliveryTime } = useOrderAction();
  const insets = useSafeAreaInsets();

  const route = useRoute();

  const routeName = route.name as
    | ProfileSettingsScreens.ADDRESS_EDIT
    | ProfileSettingsScreens.ADDRESS_NEW
    | AuthScreens.ADDRESS_SELECTION_SCREEN
    | DashboardScreens.DELIVERY_ADDRESS_NEW
    | BasketScreens.ORDER_DELIVERY_ADDRESS_NEW;

  const [createWaitingList] = useMutation<CreateWaitingListMutation>(CREATE_WAITING_LIST_MUTATION);

  const [updateOrderShippingAddress, { loading: isUpdateAdressLoading }] = useMutation<{
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
        onSubmit();
      }
    },
    onError: () => {
      onSubmit();
      showGeneralErrorToast();
    },
  });

  const [createCustomerAddress, { loading: isCreateCustomerAddressLoading }] = useMutation<
    CreateCustomerAddressMutation,
    CreateCustomerAddressMutationVariables
  >(CREATE_CUSTOMER_ADDRESS_MUTATION, {
    onError: () => showGeneralErrorToast(),
    onCompleted: (address) => {
      if (!loginStatus.userDetail) {
        dispatchUpdateLogin({
          isLoggedIn: true,
          isGuestUser: false,
        });
      } else {
        refetchOrder();
      }

      if (routeName === BasketScreens.ORDER_DELIVERY_ADDRESS_NEW) {
        void updateOrderShippingAddress({
          variables: {
            input: {
              fullName: address.createCustomerAddress.fullName,
              streetLine1: address.createCustomerAddress.streetLine1,
              city: address.createCustomerAddress.city,
              postalCode: address.createCustomerAddress.postalCode,
              countryCode: address.createCustomerAddress.country.code,
            },
          },
        });
      } else {
        onSubmit();
      }
    },
  });

  const [updateCustomerAddress] = useMutation<UpdateCustomerAddress.Mutation, UpdateCustomerAddress.Variables>(
    UPDATE_CUSTOMER_ADDRESS,
    {
      onError: () => {
        showGeneralErrorToast();
      },
      onCompleted: () => {
        onSubmit();
      },
    }
  );

  const confirmDeliveryAddress = () => {
    const addressInput: CreateAddressInput | UpdateAddressInput = {
      city: selectedAddress?.address?.city,
      postalCode: selectedAddress?.address?.postalCode,
      province: selectedAddress?.address?.province,
      countryCode: selectedAddress?.address?.countryCode ?? '',
      streetLine1: `${selectedAddress.address?.street ?? ''} ${selectedAddress.address?.streetNumber ?? ''}`,
      customFields: {
        latitude: Number(selectedAddress?.address?.latitude),
        longitude: Number(selectedAddress?.address?.longitude),
        placeId: selectedAddress?.address?.placeId,
      },
    };

    if (isDefaultAddress || !loginStatus.userDetail) {
      addressInput.defaultBillingAddress = true;
      addressInput.defaultShippingAddress = true;
    }

    if (addressId) {
      void updateCustomerAddress({
        variables: {
          input: {
            id: addressId,
            ...addressInput,
          },
        },
      });
      return;
    }

    void createCustomerAddress({
      variables: {
        input: addressInput,
      },
    });
  };

  const createWaitingListAndBrowseAsGuest = () => {
    if (!emailAddress) {
      return;
    }
    void createWaitingList({
      variables: {
        email: emailAddress,
        postalCode: selectedAddress?.address?.postalCode ?? '',
      },
    });
  };

  return (
    <>
      <PlaceHolder
        iconColor={selectedAddress?.isInArea ? theme.colors.primary500 : theme.colors.error500}
        textColor={selectedAddress?.isInArea ? 'primary500' : 'error500'}
        name={selectedAddress?.isInArea ? KS_ICON.LOCATION_TICK : KS_ICON.LOCATION_CROSS}
        title={
          selectedAddress.isInArea
            ? strings.address.validAddressSelectionInfo
            : strings.address.inValidAddressSelectionInfo
        }
      >
        <ShadowBox
          flexDirection="row"
          backgroundColor="white"
          padding="s4"
          borderRadius={theme.radii.md}
          containerViewStyle={{ marginVertical: theme.spacing.s8 }}
        >
          <AddressItem
            isInArea={selectedAddress.isInArea ?? false}
            isAddressSelected
            city={selectedAddress.address?.city}
            country={selectedAddress.address?.country}
            street={selectedAddress.address?.street}
            streetNumber={selectedAddress.address?.streetNumber}
          />
        </ShadowBox>

        <Box style={{ paddingBottom: route.name !== AuthScreens.ADDRESS_SELECTION_SCREEN ? insets.bottom : 0 }}>
          {selectedAddress?.isInArea ? (
            <Button
              onPress={confirmDeliveryAddress}
              isLoading={isCreateCustomerAddressLoading || isUpdateAdressLoading}
              type={ButtonType.PRIMARY}
            >
              {strings.address.confirmDeliveryAddress}
            </Button>
          ) : (
            <>
              <Button
                onPress={changeAddress}
                type={emailAddress ? ButtonType.PRIMARY : ButtonType.OUTLINE}
                marginBottom="s4"
              >
                {strings.address.enterAnotherAddress}
              </Button>

              {emailAddress ? (
                <LoginAsGuestButton
                  onButtonPress={createWaitingListAndBrowseAsGuest}
                  type={ButtonType.OUTLINE}
                  isLoggedIn={true}
                />
              ) : null}
            </>
          )}
        </Box>
      </PlaceHolder>
    </>
  );
};
