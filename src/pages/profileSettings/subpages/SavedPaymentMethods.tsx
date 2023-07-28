import { useQuery } from '@apollo/client';
import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import theme from '@assets/theme/theme';
import { Box } from '@components';
import { GET_SAVED_PAYMENT_METHODS } from '@graphqlDocuments';
import { PartialStripePaymentMethod, SavedPaymentMethods } from '@types';
import { PaymentMethods } from './components/PaymentMethods';

const renderSkeleton = () => (
  <Box flex={1} marginHorizontal="s3" marginTop="s5">
    <SkeletonPlaceholder>
      {Array(3)
        .fill(null)
        .map((item: null, index: number) => {
          return (
            <SkeletonPlaceholder.Item
              key={index}
              borderRadius={theme.radii.md}
              height={50}
              marginBottom={theme.spacing.s3}
            />
          );
        })}
    </SkeletonPlaceholder>
  </Box>
);

export const SavedPaymentMethodsScreen: React.FC = () => {
  const {
    data,
    loading: isLoading,
    refetch,
  } = useQuery<SavedPaymentMethods.Query, SavedPaymentMethods.Variables>(GET_SAVED_PAYMENT_METHODS, {
    variables: {},
  });

  return (
    <>
      {isLoading ? (
        renderSkeleton()
      ) : (
        <PaymentMethods data={data?.savedPaymentMethods as PartialStripePaymentMethod[]} refetch={refetch} />
      )}
    </>
  );
};
