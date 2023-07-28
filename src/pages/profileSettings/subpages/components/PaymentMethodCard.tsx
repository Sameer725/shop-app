import React from 'react';
import { Pressable, StyleSheet } from 'react-native';

import { KS_ICON, KsIcon } from '@assets/icons';
import theme from '@assets/theme/theme';
import { Box, ShadowBox, Text } from '@components';
import { CardType, PaymentMethodBrand } from '@constants';
import { useLocalizedData } from '@contexts';
import { SavedPaymentMethods } from '@types';
import { CreditCardDetails, getCardDetails, getCardLogo } from '@utils';

interface PaymentMethodCardProps {
  getPaymentMethodId: (id: string) => void;
  item: SavedPaymentMethods.SavedPaymentMethods;
}

export const PaymentMethodCard: React.FC<PaymentMethodCardProps> = (props) => {
  const { item, getPaymentMethodId } = props;
  const { strings } = useLocalizedData();

  const cardDetails = getCardDetails(item);

  const isCardExpired =
    item.type === CardType.CARD && (cardDetails as CreditCardDetails).expiryDate
      ? (cardDetails as CreditCardDetails).expiryDate < new Date()
      : false;

  const expiryMonthYear = () => {
    if (item.type === CardType.SEPA) {
      return null;
    }
    return (
      <Text variant="heading-2xs" color={isCardExpired ? 'error500' : 'defaultTextColor'}>
        {isCardExpired
          ? strings.profileSettings.overview.expired
          : `${(cardDetails as CreditCardDetails).expiryMonth}/${(cardDetails as CreditCardDetails).expiryYear}`}
      </Text>
    );
  };

  const onDeleteClick = () => getPaymentMethodId(item.id ?? '');

  return (
    <Box flexDirection="row">
      <ShadowBox
        backgroundColor="white"
        borderRadius={theme.radii.xl}
        flexDirection="row"
        padding="s3"
        alignItems="center"
        containerViewStyle={styles.contentViewStyle}
      >
        <Box opacity={isCardExpired ? 0.5 : 1}>
          {getCardLogo(item.type === CardType.CARD ? item.card?.brand ?? '' : PaymentMethodBrand.SEPA)}
        </Box>
        <Box flex={1} flexDirection="row" justifyContent="space-between" alignItems="center">
          <Box opacity={isCardExpired ? 0.5 : 1} marginHorizontal="s4" flex={1}>
            <Text variant="heading-2xs">{cardDetails.cardTitle}</Text>

            <Text variant="text-2xs-r" lineBreakMode="tail" numberOfLines={1}>
              {cardDetails.cardSubtitle}
            </Text>
          </Box>
          {expiryMonthYear()}
        </Box>
      </ShadowBox>
      <Pressable onPress={onDeleteClick}>
        <Box padding="s3" marginLeft="s3" justifyContent="center" alignItems="center">
          <KsIcon name={KS_ICON.TRASH} color={theme.colors.defaultTextColor} size={24} />
        </Box>
      </Pressable>
    </Box>
  );
};

const styles = StyleSheet.create({
  contentViewStyle: {
    flex: 1,
  },
});
