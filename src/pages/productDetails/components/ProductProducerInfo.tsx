import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';

import { KS_ICON, KsIcon } from '@assets/icons';
import theme from '@assets/theme/theme';
import { Box, ShadowBox, Text } from '@components/common';
import { useLocalizedData } from '@contexts';
import { CommonScreens } from '@routes/routes';
import { KsNavigation, Producer } from '@types';
import { formatAddress, formatNumber } from '@utils';

interface Props {
  producer: Producer;
}

export const ProductProducerInfo: React.FC<Props> = (props) => {
  const { producer } = props;
  const { strings } = useLocalizedData();
  const navigation: KsNavigation = useNavigation();

  const navigateToProducer = () => {
    navigation.navigate(CommonScreens.PRODUCER_DETAILS_SCREEN, { producerId: producer.id });
  };

  return (
    <ShadowBox
      padding="s5"
      backgroundColor="white"
      borderRadius={theme.radii['2xl']}
      containerViewStyle={{ marginTop: theme.spacing.s8 }}
    >
      <Box flexDirection="row" alignItems="center" justifyContent="space-between">
        <Text variant="heading-sm" color="primary500">
          {producer.name}
        </Text>
        <Pressable style={styles.goToButton} onPress={navigateToProducer}>
          <KsIcon name={KS_ICON.ARROW_RIGHT_3} color={theme.colors.gray700} size={theme.spacing.s4} />
        </Pressable>
      </Box>

      {producer.hasDetailsPage && producer.distance ? (
        <Box flexDirection="row" marginTop="s5">
          <KsIcon name={KS_ICON.LOCATION} color={theme.colors.gray700} size={theme.spacing.s6} />
          <Text variant="text-md" paddingHorizontal="s3">
            {formatNumber(producer.distance)} {strings.product.distanceFromYou}
          </Text>
        </Box>
      ) : null}

      {producer.address ? (
        <Box flexDirection="row" alignItems="center" marginTop="s4">
          <KsIcon name={KS_ICON.GPS} color={theme.colors.gray700} size={24} />
          <Box paddingHorizontal="s3" flex={1}>
            <Text variant="text-md">{producer.address.fullName}</Text>
            <Text variant="text-md">{formatAddress(producer.address)} </Text>
          </Box>
        </Box>
      ) : null}
    </ShadowBox>
  );
};

const styles = StyleSheet.create({
  goToButton: {
    backgroundColor: theme.colors.gray100,
    padding: theme.spacing.s2,
    borderRadius: theme.radii.md,
  },
});
