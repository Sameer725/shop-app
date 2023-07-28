import React from 'react';

import { ModalPopUp } from '@components';
import { OrderListScreen } from '../subpages/OrderList';

interface ContactModalProps {
  isVisible: boolean;
  onClose?: () => void;
}

export const OrderComplaintModal: React.FC<ContactModalProps> = (props) => {
  const { isVisible, onClose = () => null } = props;

  return (
    <ModalPopUp isVisible={isVisible} isCloseIconVisible={true} onClose={onClose}>
      <OrderListScreen fromComplaintModal onCloseModal={onClose} />
    </ModalPopUp>
  );
};
