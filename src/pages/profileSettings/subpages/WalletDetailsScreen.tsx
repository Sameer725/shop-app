import { useQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import { ScrollView } from 'react-native';

import { Box } from '@components';
import { useWalletTotal } from '@contexts';
import { GET_WALLET_DETAILS } from '@graphqlDocuments/wallet.graphql';
import { GetWalletDetailsQuery, Wallet, WalletItem } from '@types';
import { WalletDetailsBox } from './components/WalletDetailsBox';
import { WalletListItem } from './components/WalletListItem';

export const WalletDetailsScreen: React.FC = () => {
  const { data, refetch } = useQuery<GetWalletDetailsQuery>(GET_WALLET_DETAILS, {
    fetchPolicy: 'no-cache',
  });

  const { updateWalletTotal } = useWalletTotal();

  useEffect(() => {
    updateWalletTotal(data?.wallet as Wallet);
  }, [data]);

  const renderWalletItems = () => {
    return data?.wallet.walletItems?.map((wallet) => <WalletListItem key={wallet.id} wallet={wallet as WalletItem} />);
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {data?.wallet ? <WalletDetailsBox wallet={data.wallet as Wallet} refetch={refetch} /> : null}
      <Box marginBottom="s3">{renderWalletItems()}</Box>
    </ScrollView>
  );
};
