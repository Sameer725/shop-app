import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';

import { KS_ICON, KsIcon } from '@assets/icons';
import theme from '@assets/theme/theme';
import { BottomSheetHeader, Box, Button, ButtonSize, ButtonType } from '@components';
import { CardType } from '@constants';
import { useLocalizedData } from '@contexts';
import { usePaymentHooks, useStripePayment } from '@hooks';
import { PaymentScreens } from '@routes/routes';
import { KsNavigation, KsRoute, PartialStripePaymentMethod, SavedPaymentMethods } from '@types';
import { BottomSheetWallet } from './BottomSheetWallet';
import { CardListItem } from './CardListItem';

interface RouteParams {
  data: PartialStripePaymentMethod[];
}

export const CreditCardSelection: React.FC = () => {
  const [selectedCard, setSelectedCard] = useState<PartialStripePaymentMethod>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { handlePaymentIntent } = useStripePayment();

  const { strings } = useLocalizedData();

  const navigation: KsNavigation = useNavigation();

  const { onSuccess, onError, formattedTotalWithTax } = usePaymentHooks();

  const route: KsRoute<RouteParams> = useRoute();
  const [cardData, setCardData] = useState<PartialStripePaymentMethod[]>([]);

  const navigateToAddCard = () => navigation.navigate(PaymentScreens.CREDIT_CARD_CARD_NEW_SCREEN);

  useEffect(() => {
    const cards = route.params.data.filter((card) => card.type === CardType.CARD) ?? [];

    setCardData(cards);
    if (cards[0]) {
      setSelectedCard(cards[0]);
    }
  }, [route]);

  const handlePayment = async () => {
    if (!selectedCard?.id || isLoading) {
      return;
    }
    setIsLoading(true);

    try {
      await handlePaymentIntent(selectedCard?.id ?? '');
      setIsLoading(false);
      onSuccess();
    } catch (error) {
      setIsLoading(false);
      onError((error as Error).message);
    }
  };

  const renderPaymentItem = ({ item }: ListRenderItemInfo<SavedPaymentMethods.SavedPaymentMethods>) => (
    <CardListItem item={item} selectCard={setSelectedCard} isCardSelected={selectedCard?.id === item.id} />
  );

  const keyExtractor = useCallback((item: SavedPaymentMethods.SavedPaymentMethods) => `id-${item.id ?? ''}`, []);

  return (
    <Box marginBottom="s8" marginHorizontal="s3">
      <BottomSheetHeader title={strings.checkout.paymentMethods.card} />

      <BottomSheetWallet>
        <FlatList data={cardData} renderItem={renderPaymentItem} keyExtractor={keyExtractor} />

        <Button
          paddingTop="s5"
          onPress={navigateToAddCard}
          size={ButtonSize.SM}
          type={ButtonType.GHOST}
          leadingIcon={<KsIcon name={KS_ICON.ADD} color={theme.colors.defaultTextColor} size={14} />}
        >
          {strings.checkout.addCard}
        </Button>
        <Button
          isLoading={isLoading}
          paddingTop="s4"
          onPress={handlePayment}
          leadingIcon={<KsIcon name={KS_ICON.LOCK2} bold color={theme.colors.white} size={theme.spacing.s5} />}
        >
          {strings.checkout.payAmount.replace(':totalWithTax', formattedTotalWithTax ?? '')}
        </Button>
      </BottomSheetWallet>
    </Box>
  );
};
