import React from 'react';
import { StyleSheet } from 'react-native';

import { KS_ICON, KsIcon } from '@assets/icons';
import theme from '@assets/theme/theme';
import { Box, HtmlReader, Text } from '@components';
import { Address } from '@types';

interface ProducerDescriptionProps {
  description: string;
  address: Address;
}

export const ProducerDescription = (props: ProducerDescriptionProps) => {
  const { description, address } = props;

  return (
    <Box>
      <HtmlReader htmlString={description} />
      {address ? (
        <Box marginTop="s4" marginBottom="s8" flexDirection="row" alignItems="center">
          <KsIcon name={KS_ICON.GPS} size={theme.spacing.s6} color={theme.colors.defaultTextColor} />
          <Box marginLeft="s2" flex={1}>
            <Text variant="text-md" style={styles.address}>
              {address.fullName}
            </Text>
            <Text variant="text-md" style={styles.address}>
              {address.streetLine1}, {address.postalCode} {address.city}
            </Text>
          </Box>
        </Box>
      ) : null}
    </Box>
  );
};

const styles = StyleSheet.create({
  address: {
    flex: 1,
    flexWrap: 'wrap',
  },
});
