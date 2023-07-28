import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import theme from '@assets/theme/theme';
import { Box } from './Box';

interface Props {
  cardCount?: number;
  height?: number;
  width?: number | string;
}

export const HorizontalTileSkeleton: React.FC<Props> = (props) => {
  const { cardCount = 6, height = 160, width = '33.33%' } = props;
  return (
    <>
      {Array(cardCount)
        .fill(null)
        .map((item: null, index: number) => (
          <Box key={index} width={width}>
            <SkeletonPlaceholder>
              <SkeletonPlaceholder.Item
                height={height}
                marginRight={theme.spacing.s3}
                marginBottom={theme.spacing.s5}
                borderRadius={theme.radii.xl}
              />
            </SkeletonPlaceholder>
          </Box>
        ))}
    </>
  );
};
