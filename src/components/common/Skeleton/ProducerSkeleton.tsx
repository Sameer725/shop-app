import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import theme from '@assets/theme/theme';
import { Box } from '../Box';
import { HorizontalTileSkeleton } from '../HorizontalTileSkeleton';

const subCollections = Array(5)
  .fill(0)
  .map((item, i) => i);

export const ProducersSkeleton = () => {
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
        <Box>
          <SkeletonPlaceholder>
            <SkeletonPlaceholder.Item
              height={theme.spacing.s8}
              borderRadius={theme.radii.md}
              marginHorizontal={theme.spacing.s3}
              marginVertical={theme.spacing.s5}
              width={200}
            />
          </SkeletonPlaceholder>

          <SkeletonPlaceholder>
            <SkeletonPlaceholder.Item
              height={194}
              borderRadius={theme.radii.md}
              marginHorizontal={theme.spacing.s3}
              marginBottom={theme.spacing.s5}
            />
          </SkeletonPlaceholder>
        </Box>
        <Box flex={1} flexDirection="row" flexWrap="wrap" justifyContent="center" marginLeft="s3">
          <HorizontalTileSkeleton height={210} />
        </Box>
      </Box>
    </ScrollView>
  );
};
