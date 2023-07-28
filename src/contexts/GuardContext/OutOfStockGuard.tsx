import React, { useCallback, useMemo, useState } from 'react';

import { Button, ButtonType } from '../../components/common/Button';
import { ModalPopUp } from '../../components/common/ModalPopUp';
import { useLocalizedData } from '../LocalizationContext';

export const useOutOfStockModal = () => {
  const { strings } = useLocalizedData();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const hideModal = () => setIsModalVisible(false);
  const showModal = useCallback(() => setIsModalVisible(true), []);

  const OutOfStockModal = useCallback(
    () => (
      <ModalPopUp
        isVisible={isModalVisible}
        header={strings.product.outOfStockHeader}
        text={strings.product.outOfStockText}
        onClose={hideModal}
      >
        <Button type={ButtonType.PRIMARY} onPress={hideModal}>
          {strings.agree}
        </Button>
      </ModalPopUp>
    ),
    [isModalVisible]
  );

  return useMemo(() => ({ OutOfStockModal, showModal }), [showModal, OutOfStockModal]);
};
