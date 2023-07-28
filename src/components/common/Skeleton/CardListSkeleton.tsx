import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import theme from '@assets/theme/theme';
import { Box } from '../Box';

export const CardListSkeleton: React.FC = () => {
  return (
    <>
      {Array(4)
        .fill(null)
        .map((item: null, index: number) => (
          <Box key={index} flexDirection="row" marginTop="s5" alignItems="center">
            <Box flex={1} flexDirection="row" justifyContent="space-between" alignItems="center" marginHorizontal="s2">
              <SkeletonPlaceholder>
                <SkeletonPlaceholder.Item
                  height={theme.spacing.s8}
                  width={150}
                  borderRadius={theme.radii.md}
                  marginTop={theme.spacing.s2}
                />
              </SkeletonPlaceholder>

              <SkeletonPlaceholder>
                <SkeletonPlaceholder.Item
                  height={theme.spacing.s8}
                  width={theme.spacing.s16}
                  borderRadius={theme.radii.md}
                  marginTop={theme.spacing.s2}
                />
              </SkeletonPlaceholder>
            </Box>
          </Box>
        ))}
    </>
  );
};
