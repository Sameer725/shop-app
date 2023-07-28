import { useMutation } from '@apollo/client';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { ActionSheetOptions } from '@expo/react-native-action-sheet/lib/typescript/types';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Pressable } from 'react-native';

import { KS_ICON, KsIcon } from '@assets/icons';
import theme from '@assets/theme/theme';
import { Badge, Box, Button, ButtonType, ModalPopUp, ShadowBox, ShadowType, Text } from '@components';
import { useLocalizedData, useOrderAction } from '@contexts';
import { DELETE_CUSTOMER_ADDRESS, UPDATE_CUSTOMER_ADDRESS } from '@graphqlDocuments';
import { useToastNotification } from '@hooks';
import { ProfileSettingsScreens } from '@routes/routes';
import { Address, DeleteCustomerAddress, KsNavigation, UpdateCustomerAddress } from '@types';

enum ActionSheetOptionIndex {
  SET_DEFAULT_SHIPPING_ADDRESS,
  SET_DEFAULT_BILLING_ADDRESS,
  EDIT,
  DELETE,
  CANCEL,
}

// Get values (= indices) of the enum values
const ACTION_SHEET_OPTION_INDICES: number[] = Object.values(ActionSheetOptionIndex)
  .map((value) => +value)
  .filter((value) => !isNaN(value));

interface Props {
  address: Address;
  onUpdate: () => void;
}

export const AddressListItem: React.FC<Props> = (props) => {
  const { address, onUpdate } = props;
  const { strings } = useLocalizedData();
  const { showActionSheetWithOptions } = useActionSheet();
  const { showGeneralErrorToast } = useToastNotification();
  const { refetchOrder } = useOrderAction();

  const navigation: KsNavigation = useNavigation();

  if (!address) {
    return null;
  }

  const [isDeleteModalDisplayed, setIsDeleteModalDisplayed] = useState(false);
  const [isDefaultAddress, setIsDefaultAddress] = useState(false);

  const addressText = () => `${address.streetLine1}, ${address.postalCode ?? ''} ${address.city ?? ''}`;

  useEffect(() => {
    setIsDefaultAddress(!!address?.defaultBillingAddress || !!address?.defaultShippingAddress);
  }, [address]);

  const DefaultAddressBadge = (label: string) => (
    <Badge color="gray050" fontColor="gray600" marginRight="s2">
      {label}
    </Badge>
  );

  const [setDefaultShippingAddress] = useMutation<UpdateCustomerAddress.Mutation, UpdateCustomerAddress.Variables>(
    UPDATE_CUSTOMER_ADDRESS,
    {
      variables: {
        input: {
          id: address.id,
          defaultShippingAddress: true,
        },
      },
      onError: () => {
        showGeneralErrorToast();
        onUpdate();
      },
      onCompleted: () => {
        refetchOrder();
        onUpdate();
      },
    }
  );

  const [setDefaultBillingAddress] = useMutation<UpdateCustomerAddress.Mutation, UpdateCustomerAddress.Variables>(
    UPDATE_CUSTOMER_ADDRESS,
    {
      variables: {
        input: {
          id: address.id,
          defaultBillingAddress: true,
        },
      },
      onError: () => {
        showGeneralErrorToast();
        onUpdate();
      },
      onCompleted: () => {
        onUpdate();
      },
    }
  );

  const [deleteAddress] = useMutation<DeleteCustomerAddress.Mutation, DeleteCustomerAddress.Variables>(
    DELETE_CUSTOMER_ADDRESS,
    {
      variables: {
        id: address.id,
      },
      onError: () => {
        showGeneralErrorToast();
        onUpdate();
      },
      onCompleted: () => {
        onUpdate();
      },
    }
  );

  const actionSheetOptions = ACTION_SHEET_OPTION_INDICES.map((index) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/no-unsafe-member-access
    return (strings.profileSettings.addresses.actions as any)[index] as string;
  });

  const getActionSheetOptions = (): ActionSheetOptions => {
    const disabledOptions: number[] = [];

    if (address.defaultShippingAddress) {
      disabledOptions.push(ActionSheetOptionIndex.SET_DEFAULT_SHIPPING_ADDRESS);
    }
    if (address.defaultBillingAddress) {
      disabledOptions.push(ActionSheetOptionIndex.SET_DEFAULT_BILLING_ADDRESS);
    }
    if (isDefaultAddress) {
      disabledOptions.push(ActionSheetOptionIndex.DELETE);
    }

    return {
      options: actionSheetOptions,
      cancelButtonIndex: ActionSheetOptionIndex.CANCEL,
      destructiveButtonIndex: ActionSheetOptionIndex.DELETE,
      showSeparators: true,
      destructiveColor: theme.colors.error500,
      disabledButtonIndices: disabledOptions,
    };
  };

  const showActionSheet = () => {
    showActionSheetWithOptions(getActionSheetOptions(), handleActionSheetPress);
  };

  const handleActionSheetPress = (index?: number) => {
    switch (index) {
      case ActionSheetOptionIndex.SET_DEFAULT_BILLING_ADDRESS:
        void setDefaultBillingAddress();
        break;
      case ActionSheetOptionIndex.SET_DEFAULT_SHIPPING_ADDRESS:
        void setDefaultShippingAddress();
        break;
      case ActionSheetOptionIndex.EDIT:
        navigation.navigate(ProfileSettingsScreens.ADDRESS_EDIT, {
          address,
        });
        break;
      case ActionSheetOptionIndex.DELETE:
        setIsDeleteModalDisplayed(true);
        break;
      default:
        break;
    }
  };

  const closeDeleteModal = () => {
    if (isDeleteModalDisplayed) {
      setIsDeleteModalDisplayed(false);
    }
  };

  return (
    <Box width="100%">
      <ShadowBox
        type={isDefaultAddress ? ShadowType.BASE : ShadowType.NONE}
        backgroundColor="white"
        alignItems="center"
        borderRadius={theme.radii.xl}
        padding="s2"
        overflow="hidden"
        containerViewStyle={{
          marginBottom: theme.spacing.s2,
        }}
      >
        <Box flex={1} flexDirection="row" width="100%" alignItems="center">
          <KsIcon
            name={KS_ICON.LOCATION}
            size={theme.spacing.s6}
            color={
              address.defaultBillingAddress || address.defaultShippingAddress
                ? theme.colors.primary500
                : theme.colors.gray600
            }
            style={{ marginRight: theme.spacing.s3 }}
          />
          <Text variant="text-xs" style={{ width: '100%', flexShrink: 1 }} marginRight="s2">
            {addressText()}
          </Text>
          <Pressable onPress={showActionSheet}>
            <KsIcon name={KS_ICON.MORE_VERTICAL} size={theme.spacing.s8} color={theme.colors.gray700} />
          </Pressable>
        </Box>

        {isDefaultAddress ? (
          <Box flex={1} flexDirection="row" width="100%" alignItems="center" marginTop="s2">
            {address.defaultShippingAddress
              ? DefaultAddressBadge(strings.profileSettings.addresses.shippingAddress)
              : null}

            {address.defaultBillingAddress
              ? DefaultAddressBadge(strings.profileSettings.addresses.billingAddress)
              : null}
          </Box>
        ) : null}
      </ShadowBox>

      <ModalPopUp
        isVisible={isDeleteModalDisplayed}
        header={strings.profileSettings.addresses.delete.deleteAddress}
        text={strings.profileSettings.addresses.delete.question}
        isCloseIconVisible={false}
        onClose={closeDeleteModal}
      >
        <Button
          onPress={() => void deleteAddress()}
          type={ButtonType.PRIMARY_ERROR}
          leadingIcon={<KsIcon name={KS_ICON.TRASH} size={20} color={theme.colors.white} />}
        >
          {strings.profileSettings.addresses.delete.deleteAddress}
        </Button>
        <Button onPress={closeDeleteModal} type={ButtonType.OUTLINE}>
          {strings.profileSettings.addresses.delete.keepAddress}
        </Button>
      </ModalPopUp>
    </Box>
  );
};
