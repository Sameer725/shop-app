import React from 'react';

import { useLocalizedData } from '@contexts';
import { Button } from './Button';
import { ModalPopUp } from './ModalPopUp';

interface GiftAndPromotionErrorModalProps {
  isVisible: boolean;
  closeModal: () => void;
}
export const GiftAndPromotionErrorModal = (props: GiftAndPromotionErrorModalProps) => {
  const { closeModal, isVisible } = props;
  const {
    strings: { checkout },
  } = useLocalizedData();

  return (
    <ModalPopUp
      header={checkout.giftAndPromotion.modalHeader}
      text={checkout.giftAndPromotion.modalText}
      isVisible={isVisible}
      isCloseIconVisible={false}
    >
      <Button onPress={closeModal}>{checkout.giftAndPromotion.modalButtonLabel}</Button>
    </ModalPopUp>
  );
};
