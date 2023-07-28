import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';

import theme from '@assets/theme/theme';
import { Special } from '@types';
import { Box } from './Box';
import { Text } from './Text';

interface SpecialCardProps {
  special: Special;
  contentCentered?: boolean;
}

export const SpecialCard = (props: SpecialCardProps) => {
  const { special, contentCentered } = props;

  return (
    <ImageBackground style={styles.image} resizeMode="cover" source={{ uri: special?.featuredAsset?.source }}>
      <Box style={styles.content} justifyContent={contentCentered ? 'center' : undefined}>
        <Text color="white" margin="s1" variant="heading-2xs">
          {special.category}
        </Text>
        <Text color="white" margin="s1" variant="heading-md" lineBreakMode="tail" textBreakStrategy="balanced">
          {special.title}
        </Text>
      </Box>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    paddingVertical: theme.spacing.s4,
    paddingHorizontal: theme.spacing.s3,
  },
});
