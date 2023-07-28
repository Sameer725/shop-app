import React from 'react';
import { ActivityIndicator } from 'react-native';

import theme from '@assets/theme/theme';
import { Box } from '@components';

export const SearchLoadingIndicator = () => {
  return (
    <Box position="absolute" justifyContent="center" bottom={0} left={0} right={0} top={0}>
      <ActivityIndicator size={theme.spacing.s10} color={theme.colors.gray300} />
    </Box>
  );
};
