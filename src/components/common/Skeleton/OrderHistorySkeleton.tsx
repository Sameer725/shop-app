import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import theme from '@assets/theme/theme';
import { Box } from '../Box';

export const OrderHistorySkeleton = () => {
  return (
    <Box flex={1} paddingTop="s5" paddingHorizontal="s3">
      <SkeletonPlaceholder>
        <SkeletonPlaceholder.Item height={140} marginBottom={theme.spacing.s5} borderRadius={theme.radii['2xl']} />

        <SkeletonPlaceholder.Item height={140} marginBottom={theme.spacing.s5} borderRadius={theme.radii['2xl']} />

        <SkeletonPlaceholder.Item height={400} marginBottom={theme.spacing.s5} borderRadius={theme.radii['2xl']} />
      </SkeletonPlaceholder>
    </Box>
  );
};
