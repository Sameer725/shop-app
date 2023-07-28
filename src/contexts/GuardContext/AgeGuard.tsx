import { useMutation } from '@apollo/client';
import React, { useCallback, useMemo, useState } from 'react';

import { useOrderAction } from '@contexts/OrderContext';
import { UPDATE_CUSTOMER } from '@graphqlDocuments';
import { Customer, ProductVariant } from '@types';
import { Button, ButtonType } from '../../components/common/Button';
import { ModalPopUp } from '../../components/common/ModalPopUp';
import { useToastNotification } from '../../hooks/useToastNotification';
import { useAuthData } from '../AuthContext';
import { useLocalizedData } from '../LocalizationContext';

export const useAgeGuard = () => {
  const { loginStatus, dispatchUpdateLogin } = useAuthData();
  const { onAdd } = useOrderAction();
  const { strings } = useLocalizedData();
  const { showGeneralErrorToast } = useToastNotification();
  const [showAgeConfirmation, setShowAgeConfirmation] = useState(false);
  const [ineligibleItem, setIneligibleItem] = useState({} as ProductVariant);

  const closeAgeConfirmation = () => {
    setShowAgeConfirmation(false);
  };

  const [updateCustomerLegalAge, { loading: isLoading }] = useMutation<{ updateCustomer: Customer }>(UPDATE_CUSTOMER, {
    variables: {
      input: { customFields: { isOfLegalAge: true } },
    },
    onError: () => {
      showGeneralErrorToast();
      closeAgeConfirmation();
    },
    onCompleted: ({ updateCustomer }) => {
      const isOfLegalAge = updateCustomer?.customFields?.isOfLegalAge ?? false;

      dispatchUpdateLogin({
        ...loginStatus,
        userDetail: {
          ...loginStatus.userDetail,
          id: loginStatus.userDetail?.id ?? '',
          firstName: loginStatus.userDetail?.firstName ?? '',
          isOfLegalAge,
        },
      });

      void onAdd({
        productVariantId: ineligibleItem?.id ?? '',
        quantity: 1,
      }).then(() => {
        closeAgeConfirmation();
      });
    },
  });

  const isOfLegalAge = useCallback(
    (productVariant?: ProductVariant) => {
      const isItemAlcoholic = productVariant?.customFields?.isAlcoholic ?? false;

      if (!loginStatus.userDetail?.isOfLegalAge && isItemAlcoholic) {
        setIneligibleItem(productVariant as ProductVariant);
        setShowAgeConfirmation(true);
        return false;
      }

      return true;
    },
    [loginStatus.userDetail?.isOfLegalAge]
  );

  const AgeConfirmationModal = useCallback(
    () => (
      <ModalPopUp
        isVisible={showAgeConfirmation}
        header={strings.product.alcoholicConfirmationHeader}
        text={strings.product.alcoholicConfirmationMessage}
        onClose={closeAgeConfirmation}
      >
        <Button
          onPress={() => {
            void updateCustomerLegalAge();
          }}
          type={ButtonType.PRIMARY}
          isLoading={isLoading}
        >
          {strings.product.confirmAge}
        </Button>
        <Button onPress={closeAgeConfirmation} type={ButtonType.OUTLINE}>
          {strings.product.cancelAge}
        </Button>
      </ModalPopUp>
    ),
    [showAgeConfirmation]
  );

  return useMemo(() => ({ AgeConfirmationModal, isOfLegalAge }), [isOfLegalAge, AgeConfirmationModal]);
};
