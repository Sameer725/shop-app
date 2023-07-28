import React, { useCallback, useMemo, useState } from 'react';

import { Button, ButtonType, ModalPopUp } from '@components';
import { useLocalizedData } from '@contexts';

interface ModalParams {
  onPress: () => void;
}

export const useAdjustOrderLineModal = (params: ModalParams) => {
  const { onPress } = params;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const hideModal = () => setIsModalVisible(false);
  const showModal = () => setIsModalVisible(true);
  const { strings } = useLocalizedData();

  const AdjustOrderLineModal = useCallback(
    () => (
      <ModalPopUp
        isVisible={isModalVisible}
        isCloseIconVisible={false}
        header={strings.basket.adjustAllOrderItemsHeader}
        text={strings.basket.adjustAllOrderItemsText}
      >
        <Button
          type={ButtonType.PRIMARY}
          onPress={() => {
            onPress();
            hideModal();
          }}
        >
          {strings.agree}
        </Button>
      </ModalPopUp>
    ),
    [isModalVisible]
  );
  return useMemo(() => ({ AdjustOrderLineModal, showModal }), [AdjustOrderLineModal, showModal]);
};
