import { useQuery } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { Platform, Pressable } from 'react-native';

import { paymentLogos } from '@assets/paymentLogos';
import theme from '@assets/theme/theme';
import { BottomSheetHeader, Box, CardListSkeleton, Text } from '@components';
import { CardType, CustomerGroup, PaymentMethodTypes } from '@constants';
import { useLocalizedData } from '@contexts';
import { GET_CUSTOMER_GROUPS, GET_SAVED_PAYMENT_METHODS } from '@graphqlDocuments';
import { usePaymentHooks } from '@hooks';
import { PaymentScreens } from '@routes/routes';
import { CustomerGroupsQuery, KsNavigation, PartialStripePaymentMethod, SavedPaymentMethods } from '@types';
import { GiftCouponPaymentOrWallet } from './components/payment/GiftCouponPaymentOrWallet';

interface PaymentMethod {
  name: string;
  methods: React.ExoticComponent<any>[];
  route: string;
  type: PaymentMethodTypes;
  data?: PartialStripePaymentMethod[];
}

const isIos = Platform.OS === 'ios';

interface PaymentListItemProps {
  method: PaymentMethod;
  index: number;
  methods: PaymentMethod[];
}

const PaymentListItem = (props: PaymentListItemProps) => {
  const { method, index, methods } = props;

  const navigation: KsNavigation = useNavigation();

  const isLast = index === methods.length - 1;

  const goToPage = () =>
    method.data ? navigation.navigate(method.route, { data: method.data }) : navigation.navigate(method.route);

  return (
    <Pressable key={method.type + `${index}`} onPress={goToPage}>
      <Box
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        backgroundColor="white"
        paddingVertical="s4"
        marginHorizontal="s2"
      >
        <Text variant="heading-sm">{method.name}</Text>
        <Box flexDirection="row" alignItems="center">
          {method.methods.map((item, subIndex) => {
            const Item = item;

            return (
              <Box
                key={subIndex}
                marginHorizontal="s1"
                borderWidth={theme.spacing.px}
                paddingHorizontal="s2"
                borderColor="gray100"
                borderRadius={theme.radii.md}
              >
                <Item height={theme.spacing.s8} width={theme.spacing.s9} />
              </Box>
            );
          })}
        </Box>
      </Box>
      {!isLast ? <Box height={theme.spacing.px} borderRadius={theme.radii.lg} backgroundColor="gray100" /> : null}
    </Pressable>
  );
};

const renderMethods = (method: PaymentMethod, index: number, methods: PaymentMethod[]) => {
  return <PaymentListItem method={method} key={method.type} index={index} methods={methods} />;
};

export const PaymentBottomSheet = () => {
  const {
    strings: { checkout },
  } = useLocalizedData();

  const { totalWithTax } = usePaymentHooks();
  const { data, loading: isLoading } = useQuery<SavedPaymentMethods.Query, SavedPaymentMethods.Variables>(
    GET_SAVED_PAYMENT_METHODS
  );
  const { data: customerGroups } = useQuery<CustomerGroupsQuery>(GET_CUSTOMER_GROUPS);

  const cardExists = (cardType: CardType) => data?.savedPaymentMethods.find((card) => card.type === cardType);

  const paymentMethods: PaymentMethod[] = useMemo(() => {
    const iosAndroidMethod = isIos
      ? {
          name: checkout.paymentMethods.applePay,
          route: PaymentScreens.APPLE_PAY,
          methods: [paymentLogos.applePayLogo],
          type: PaymentMethodTypes.APPLE_PAY,
        }
      : {
          name: checkout.paymentMethods.googlePay,
          route: PaymentScreens.GOOGLE_PAY,
          methods: [paymentLogos.googlePayLogo],
          type: PaymentMethodTypes.GOOGLE_PAY,
        };

    const methods = [
      {
        name: checkout.paymentMethods.card,
        route: cardExists(CardType.CARD)
          ? PaymentScreens.CREDIT_CARD_SELECTION_SCREEN
          : PaymentScreens.CREDIT_CARD_CARD_NEW_SCREEN,
        methods: [paymentLogos.visaLogo, paymentLogos.mastercardLogo],
        type: PaymentMethodTypes.CREDIT_CARD_PAY,
        data: data?.savedPaymentMethods,
      },
      {
        name: checkout.paymentMethods.sepa,
        route: cardExists(CardType.SEPA)
          ? PaymentScreens.SEPA_PAY_SELECTION_SCREEN
          : PaymentScreens.SEPA_PAY_NEW_SCREEN,
        methods: [paymentLogos.sepaLogo],
        type: PaymentMethodTypes.SEPA_PAY,
        data: data?.savedPaymentMethods,
      },
      iosAndroidMethod,
      {
        name: checkout.paymentMethods.payPal,
        route: PaymentScreens.PAYPAL,
        methods: [paymentLogos.payPalLogoCompressed],
        type: PaymentMethodTypes.PAYPAL,
      },
    ];

    if (customerGroups?.customerGroups?.find((group) => group.name === CustomerGroup.COMPANY)) {
      methods.push({
        name: checkout.paymentMethods.invoice,
        route: PaymentScreens.INVOICE,
        methods: [],
        type: PaymentMethodTypes.INVOICE,
      });
    }

    return methods;
  }, [data, customerGroups]);

  return (
    <Box marginBottom="s2" marginHorizontal="s3">
      <BottomSheetHeader title={checkout.paymentMethodsHeading} />
      {isLoading ? (
        <CardListSkeleton />
      ) : totalWithTax > 0 ? (
        paymentMethods.map(renderMethods)
      ) : (
        <GiftCouponPaymentOrWallet />
      )}
    </Box>
  );
};
