import React, { createContext, useCallback, useContext, useMemo } from 'react';

import { ProductVariant } from '@types';
import { MessageStatus } from '../OrderContext';
import { useAgeGuard } from './AgeGuard';
import { useAuthGuard } from './AuthGuard';
import { useOutOfStockModal } from './OutOfStockGuard';

interface GuardContextValues {
  isEligible: (productVariant?: ProductVariant) => boolean;
  showOutOfStockModal: (messageStatus: MessageStatus) => boolean;
}

const GuardContext = createContext<GuardContextValues | null>(null);

export const GuardContextProvider: React.FC = ({ children }) => {
  const { AgeConfirmationModal, isOfLegalAge } = useAgeGuard();
  const { OutOfStockModal, showModal } = useOutOfStockModal();
  const { LoginPopUp, isAuthenticated } = useAuthGuard();

  const isEligible = useCallback(
    (productVariant?: ProductVariant) => {
      return isAuthenticated() && isOfLegalAge(productVariant);
    },
    [isAuthenticated, isOfLegalAge]
  );

  const showOutOfStockModal = useCallback(
    (messageStatus: MessageStatus) => {
      if (messageStatus === MessageStatus.OUT_OF_STOCK_ERROR) {
        showModal();
        return true;
      }

      return false;
    },
    [showModal]
  );

  const value = useMemo(() => ({ isEligible, showOutOfStockModal }), [isEligible, showOutOfStockModal]);

  return (
    <>
      <AgeConfirmationModal />
      <OutOfStockModal />
      <LoginPopUp />
      <GuardContext.Provider value={value}>{children}</GuardContext.Provider>
    </>
  );
};

export const useGuard = () => {
  const context = useContext(GuardContext);

  if (!context) {
    throw new Error('use inside Guard Context');
  }

  return context;
};
