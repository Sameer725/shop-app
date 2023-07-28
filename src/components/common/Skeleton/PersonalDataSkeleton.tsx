import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import theme from '@assets/theme/theme';
import { Box } from '../Box';

export const PersonalDataSkeleton = () => {
  return (
    <Box flex={1} paddingTop="s5" paddingHorizontal="s3" justifyContent="space-between">
      <SkeletonPlaceholder>
        <SkeletonPlaceholder.Item height={152} borderRadius={theme.radii['2xl']} />
        <SkeletonPlaceholder.Item height={52} borderRadius={theme.radii.xl} marginTop={theme.spacing.s3} />
        <SkeletonPlaceholder.Item height={52} borderRadius={theme.radii.xl} marginTop={theme.spacing.s3} />
        <SkeletonPlaceholder.Item height={32} borderRadius={theme.radii.md} marginTop={theme.spacing.s3} />
      </SkeletonPlaceholder>

      <SkeletonPlaceholder>
        <SkeletonPlaceholder.Item
          borderRadius={theme.radii.md}
          height={theme.spacing.s12}
          marginBottom={theme.spacing.s8}
        />
      </SkeletonPlaceholder>
    </Box>
  );
};
