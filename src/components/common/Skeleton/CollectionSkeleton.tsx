import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import theme from '@assets/theme/theme';
import { Box } from '../Box';
import { ProductsWithHeadingSkeleton } from './DetailsScreenSkeletonComponents';

const subCollections = Array(5)
  .fill(0)
  .map((item, i) => i);

export const CollectionSkeleton = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Box flex={1}>
        <Box flexDirection="row" overflow="hidden" padding="s1">
          {subCollections.map((item) => (
            <Box flex={1} key={item}>
              <SkeletonPlaceholder>
                <SkeletonPlaceholder.Item
                  height={theme.spacing.s8}
                  borderRadius={theme.radii.md}
                  marginHorizontal={theme.spacing.s1}
                  marginTop={theme.spacing.s2}
                />
              </SkeletonPlaceholder>
            </Box>
          ))}
        </Box>

        <ProductsWithHeadingSkeleton />
      </Box>
    </ScrollView>
  );
};
