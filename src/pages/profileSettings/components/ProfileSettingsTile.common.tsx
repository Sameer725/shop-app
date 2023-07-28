import React from 'react';

import theme from '@assets/theme/theme';
import { Box, ShadowBox, Text } from '@components';

interface Props {
  children: React.ReactNode;
  title: string;
}

export const ProfileSettingsTile: React.FC<Props> = (props) => {
  const { children, title } = props;

  return (
    <ShadowBox
      backgroundColor="white"
      borderRadius={theme.radii['2xl']}
      containerViewStyle={{
        marginBottom: theme.spacing.s5,
      }}
    >
      <Box
        style={{
          width: '100%',
          paddingTop: theme.spacing.s4,
          alignItems: 'flex-start',
        }}
      >
        <Text variant="heading-sm" paddingHorizontal="s3" style={{ marginBottom: 10 }}>
          {title}
        </Text>
        {children}
      </Box>
    </ShadowBox>
  );
};
