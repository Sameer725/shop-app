import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import theme from '@assets/theme/theme';

export const DeliveryAddressCardSkeleton = () => {
  return (
    <SkeletonPlaceholder>
      <SkeletonPlaceholder.Item
        borderRadius={theme.radii['2xl']}
        height={71}
        marginHorizontal={theme.spacing.s3}
        marginTop={theme.spacing.s8}
      />
    </SkeletonPlaceholder>
  );
};
