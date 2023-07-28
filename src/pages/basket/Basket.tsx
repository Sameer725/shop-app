import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';

import theme from '@assets/theme/theme';
import { Box, FocusAwareStatusBar, GuestPlaceholder, OverlappingInfoState, ScreenWrapper } from '@components';
import { useAuthData, useLocalizedData, useOrderAction, useOrderLines, useOrderState } from '@contexts';
import { useShakeAnimation } from '@hooks';
import { BasketScreens } from '@routes/routes';
import { KsNavigation } from '@types';
import { formatPrice } from '@utils';
import { EmptyScreen, Footer, OrderList, UpSelling } from './components';

interface ContainerProps {
  children?: React.ReactNode;
}

const data = ['container'];
const Container = forwardRef<FlatList, ContainerProps>(({ children }, ref) => {
  const renderItem = useCallback(() => <>{children}</>, [children]);

  return <FlatList ref={ref} renderItem={renderItem} data={data} showsVerticalScrollIndicator={false} />;
});

Container.displayName = 'Container';

export const BasketScreen: React.FC = () => {
  const { strings } = useLocalizedData();
  const { ShakeContainer, startShakeAnimation } = useShakeAnimation();

  const { activeOrder, runningOrderMutationIds } = useOrderState();
  const { isEmpty } = useOrderLines();
  const { refetchOrder } = useOrderAction();
  const { loginStatus } = useAuthData();
  const navigation: KsNavigation = useNavigation();

  const containerRef = useRef<FlatList>(null);

  const isFocused = useIsFocused();
  const [initiallyReloaded, setInitiallyReloaded] = useState<boolean>(false);

  useEffect(() => {
    if (isFocused && runningOrderMutationIds.length === 0 && !initiallyReloaded) {
      void refetchOrder();
      setInitiallyReloaded(true);
    }
  }, [isFocused, runningOrderMutationIds]);

  useEffect(() => {
    if (!isFocused) {
      setInitiallyReloaded(false);
    }
  }, [isFocused]);

  const onCheckout = () => {
    if (activeOrder?.missingAmountToMOV) {
      containerRef.current?.scrollToOffset({ animated: true, offset: 0 });
      startShakeAnimation();
      return;
    }

    navigation.navigate(BasketScreens.CHECKOUT);
  };

  return loginStatus.isGuestUser ? (
    <ScreenWrapper>
      <GuestPlaceholder />
    </ScreenWrapper>
  ) : (
    <>
      <FocusAwareStatusBar backgroundColor={theme.colors.white} barStyle="dark-content" animated={true} />

      {isEmpty ? (
        <EmptyScreen />
      ) : (
        <Container ref={containerRef}>
          <Box paddingHorizontal="s3" marginBottom="s5">
            <ShakeContainer>
              {!!activeOrder?.missingAmountToFreeShipping &&
              !activeOrder?.missingAmountToMOV &&
              activeOrder?.shippingWithTax > 0 ? (
                <OverlappingInfoState
                  text={strings.basket.missingAmountToFreeShipping.replace(
                    '$Price',
                    formatPrice(activeOrder?.missingAmountToFreeShipping ?? 0) ?? ''
                  )}
                  backgroundColor="primary500"
                  color="white"
                />
              ) : null}

              {activeOrder?.missingAmountToMOV ? (
                <OverlappingInfoState
                  text={strings.basket.missingAmountToMOV.replace(
                    '$Price',
                    formatPrice(activeOrder?.missingAmountToMOV ?? 0) ?? ''
                  )}
                  backgroundColor="gray100"
                  color="defaultTextColor"
                />
              ) : null}
            </ShakeContainer>
            <Box
              marginTop={
                (!!activeOrder?.missingAmountToFreeShipping && activeOrder?.shippingWithTax > 0) ||
                !!activeOrder?.missingAmountToMOV
                  ? 'nil'
                  : 's5'
              }
            >
              <OrderList />
            </Box>
          </Box>
          <UpSelling />
        </Container>
      )}
      <Footer isEmpty={isEmpty} activeOrder={activeOrder} onPress={onCheckout} />
    </>
  );
};
