import React from 'react';

import { Box, Text } from '@components';
import { useAuthData, useLocalizedData } from '@contexts';

export const WelcomeHeader = () => {
  const { strings } = useLocalizedData();
  const { loginStatus } = useAuthData();

  const welcomeMessage = loginStatus.userDetail?.firstName ?? strings.dashboard.welcomeMessage;

  return (
    <Box marginHorizontal="s3">
      <Text variant="heading-2xl">{strings.dashboard.welcome}</Text>
      <Text variant="heading-lg" color="primary500">
        {welcomeMessage}!
      </Text>
    </Box>
  );
};
