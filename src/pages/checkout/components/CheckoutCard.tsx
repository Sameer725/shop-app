import React from 'react';

import theme from '@assets/theme/theme';
import { ShadowBox, Text } from '@components';

interface CardProps {
  title: string;
}

export const CheckoutCard: React.FC<CardProps> = (props) => {
  const { title, children } = props;

  return (
    <ShadowBox
      borderRadius={theme.radii['2xl']}
      paddingVertical="s5"
      paddingHorizontal="s3"
      backgroundColor="white"
      containerViewStyle={{ marginBottom: theme.spacing.s5 }}
    >
      <Text variant="heading-sm" marginBottom="s5">
        {title}
      </Text>
      {children}
    </ShadowBox>
  );
};
