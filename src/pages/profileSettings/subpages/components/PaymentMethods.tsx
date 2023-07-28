import { useMutation } from '@apollo/client';
import React, { useCallback, useState } from 'react';
import { FlatList, ListRenderItemInfo, StyleSheet } from 'react-native';

import { KS_ICON } from '@assets/icons';
import theme from '@assets/theme/theme';
import { Box, PlaceHolder } from '@components';
import { useLocalizedData } from '@contexts';
import { DELETE_PAYMENT_METHOD } from '@graphqlDocuments';
import { useToastNotification } from '@hooks';
import { DeleteSavedPaymentMethod, PartialStripePaymentMethod, SavedPaymentMethods } from '@types';
import { useDeletePaymentMethodModal } from './DeletePaymentMethodModal';
import { PaymentMethodCard } from './PaymentMethodCard';

const itemSeparator = () => <Box height={theme.spacing.s3} />;

interface PaymentMethodsProps {
  data: PartialStripePaymentMethod[];
  refetch: () => void;
}

export const PaymentMethods: React.FC<PaymentMethodsProps> = (props) => {
  const { data, refetch } = props;
  const { strings } = useLocalizedData();
  const { showGeneralErrorToast } = useToastNotification();

  const [deletePaymentMethodId, setDeletePaymentMethodId] = useState('');

  const [deletePaymentMethod] = useMutation<DeleteSavedPaymentMethod.Mutation, DeleteSavedPaymentMethod.Variables>(
    DELETE_PAYMENT_METHOD,
    {
      onCompleted: () => {
        refetch();
      },
      onError: () => showGeneralErrorToast(),
    }
  );

  const deletePaymentMethodItem = () => {
    void deletePaymentMethod({
      variables: {
        paymentMethodId: deletePaymentMethodId,
      },
    });
  };

  const { DeletePaymentMethodModal, showModal } = useDeletePaymentMethodModal({
    removePaymentMethod: deletePaymentMethodItem,
  });

  const getPaymentMethodId = (id: string) => {
    setDeletePaymentMethodId(id);
    showModal();
  };

  const renderPaymentItem = useCallback(({ item }: ListRenderItemInfo<SavedPaymentMethods.SavedPaymentMethods>) => {
    return <PaymentMethodCard item={item} getPaymentMethodId={getPaymentMethodId} />;
  }, []);

  const keyExtractor = useCallback((item: SavedPaymentMethods.SavedPaymentMethods) => `id-${item.id ?? ''}`, []);
  return (
    <>
      {data?.length > 0 ? (
        <>
          <FlatList
            contentContainerStyle={styles.contentContainerStyle}
            data={data}
            renderItem={renderPaymentItem}
            keyExtractor={keyExtractor}
            ItemSeparatorComponent={itemSeparator}
            showsVerticalScrollIndicator={false}
          />
          <DeletePaymentMethodModal />
        </>
      ) : (
        <PlaceHolder
          name={KS_ICON.EMPTY_WALLET}
          title={strings.profileSettings.paymentMethod.noPaymentTypeHeader}
          content={[strings.profileSettings.paymentMethod.noPaymentTypeText]}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  contentContainerStyle: { paddingHorizontal: theme.spacing.s3, paddingVertical: theme.spacing.s5 },
});
