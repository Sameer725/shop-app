import React from 'react';
import { StyleSheet } from 'react-native';

import theme from '@assets/theme/theme';
import { Box } from './Box';

interface SpecialCardProps {
  isOptionSelected: boolean;
  isDisabled?: boolean;
}

export const RadioButtonBox = (props: SpecialCardProps) => {
  const { isOptionSelected, isDisabled = false } = props;

  return (
    <Box
      backgroundColor={isOptionSelected ? 'primary500' : 'gray200'}
      height={theme.spacing.s8}
      width={theme.spacing.s8}
      borderRadius={theme.radii['3xl']}
      alignItems="center"
      justifyContent="center"
    >
      {isDisabled ? null : (
        <Box backgroundColor="white" style={isOptionSelected ? styles.selectedRadio : styles.unSelectedRadio}></Box>
      )}
    </Box>
  );
};

const styles = StyleSheet.create({
  selectedRadio: {
    height: theme.spacing.s3,
    width: theme.spacing.s3,
    borderRadius: theme.radii.md,
  },
  unSelectedRadio: {
    height: theme.spacing.s5,
    width: theme.spacing.s5,
    borderRadius: 10,
  },
});
