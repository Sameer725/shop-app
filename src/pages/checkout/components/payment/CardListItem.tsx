import React, { Dispatch, SetStateAction } from 'react';
import { Pressable, StyleSheet } from 'react-native';

import theme from '@assets/theme/theme';
import { Box, RadioButtonBox, Text } from '@components';
import { CardType, PaymentMethodBrand } from '@constants';
import { useLocalizedData } from '@contexts';
import { PartialStripePaymentMethod, SavedPaymentMethods } from '@types';
import { CreditCardDetails, getCardDetails, getCardLogo } from '@utils';

interface Props {
  selectCard: Dispatch<SetStateAction<PartialStripePaymentMethod | undefined>>;
  isCardSelected: boolean;
  item: SavedPaymentMethods.SavedPaymentMethods;
}

export const CardListItem: React.FC<Props> = (props) => {
  const { selectCard, item, isCardSelected } = props;

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

  const onItemSelect = () => (isCardExpired ? null : selectCard(item));

  return (
    <Pressable onPress={onItemSelect}>
      <Box flexDirection="row" paddingTop="s5">
        <Box backgroundColor="white" borderRadius={theme.radii.xl} flexDirection="row" alignItems="center" flex={1}>
          <RadioButtonBox isOptionSelected={isCardSelected} isDisabled={isCardExpired} />

          <Box paddingLeft="s4" opacity={isCardExpired ? 0.5 : 1}>
            {getCardLogo(item.type === CardType.CARD ? item.card?.brand ?? '' : PaymentMethodBrand.SEPA)}
          </Box>

          <Box flex={1} flexDirection="row" justifyContent="space-between" alignItems="center">
            <Box opacity={isCardExpired ? 0.5 : 1} marginHorizontal="s4" flex={1}>
              <Text variant="heading-2xs">{cardDetails.cardTitle}</Text>
              <Text variant="text-2xs-r" lineBreakMode="tail" numberOfLines={1}>
                {cardDetails.cardSubtitle}
              </Text>
            </Box>
            <Text variant="heading-2xs" color={isCardExpired ? 'error500' : 'defaultTextColor'}>
              {expiryMonthYear()}
            </Text>
          </Box>
        </Box>
      </Box>
    </Pressable>
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
