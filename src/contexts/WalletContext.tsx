import React, { createContext, useContext, useMemo, useState } from 'react';

import { Wallet } from '@types';

export const WalletProvider = () => {
  const [walletTotal, setWalletTotal] = useState<number>(0);

  const updateWalletTotal = (wallet: Wallet) => {
    if (!wallet) {
      return;
    }
    setWalletTotal(wallet.nonPayoutTotal + wallet.payoutTotal);
  };

  return useMemo(() => ({ walletTotal, updateWalletTotal }), [walletTotal, updateWalletTotal]);
};

const WalletContext = createContext<ReturnType<typeof WalletProvider> | null>(null);

export const WalletContextProvider: React.FC = ({ children }) => {
  const value = WalletProvider();

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
};

export const useWalletTotal = () => {
  const context = useContext(WalletContext);

  if (!context) {
    throw new Error('use inside provider');
  }

  return context;
};
