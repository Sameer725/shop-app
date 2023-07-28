import React from 'react';

import { Box } from '../Box';
import { HorizontalTileSkeleton } from '../HorizontalTileSkeleton';

export const RecipesSkeleton = () => {
  return (
    <Box flex={1} flexDirection="row" flexWrap="wrap" justifyContent="center" marginLeft="s3" marginTop="s5">
      <HorizontalTileSkeleton height={210} />
    </Box>
  );
};
