import React, { useCallback, useMemo, useState } from 'react';

import { KS_ICON, KsIcon } from '@assets/icons';
import theme from '@assets/theme/theme';
import { Button, ButtonType, ModalPopUp } from '@components';
import { useLocalizedData } from '@contexts';

interface UseDeletePaymentMethodModalParams {
  removePaymentMethod: () => void;
}

export const useDeletePaymentMethodModal = (params: UseDeletePaymentMethodModalParams) => {
  const { removePaymentMethod } = params;
  const { strings } = useLocalizedData();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const hideModal = () => setIsModalVisible(false);
  const showModal = () => setIsModalVisible(true);

  const onPress = () => {
    removePaymentMethod();
    hideModal();
  };

  const DeletePaymentMethodModal = useCallback(
    () => (
      <ModalPopUp
        isVisible={isModalVisible}
        header={strings.profileSettings.paymentMethod.paymentTypeDeleteHeader}
        text={strings.profileSettings.paymentMethod.paymentTypeDeleteText}
        onClose={hideModal}
      >
        <Button
          type={ButtonType.PRIMARY_ERROR}
          onPress={onPress}
          leadingIcon={<KsIcon name={KS_ICON.TRASH} size={18} color={theme.colors.white} />}
        >
          {strings.profileSettings.paymentMethod.delete}
        </Button>
        <Button type={ButtonType.OUTLINE} onPress={hideModal}>
          {strings.profileSettings.paymentMethod.keep}
        </Button>
      </ModalPopUp>
    ),
    [isModalVisible]
  );

  return useMemo(() => ({ DeletePaymentMethodModal, showModal }), [showModal, DeletePaymentMethodModal]);
};
