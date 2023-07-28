import React from 'react';

import theme from '@assets/theme/theme';
import { Box } from './Box';
import { ShadowBox } from './ShadowBox';
import { Text } from './Text';

type Color = keyof typeof theme.colors;
interface InfoStateProps {
  text: string;
  color: Color;
  backgroundColor: Color;
}

export const OverlappingInfoState = (props: InfoStateProps) => {
  const { color, text, backgroundColor } = props;

  return (
    <Box top={theme.spacing.s5}>
      <ShadowBox
        backgroundColor={backgroundColor}
        borderRadius={theme.radii['2xl']}
        paddingHorizontal="s16"
        paddingVertical="s3"
        marginBottom="s4"
      >
        <Text textAlign="center" color={color} variant="text-sm" fontWeight="600" lineBreakMode="middle">
          {text}
        </Text>
      </ShadowBox>
    </Box>
  );
};
