import React from 'react';

import { KS_ICON, KsIcon } from '@assets/icons';
import MastercardLogo from '@assets/paymentLogos/mastercardLogo.svg';
import SepaLogo from '@assets/paymentLogos/sepaLogo.svg';
import VisaLogo from '@assets/paymentLogos/visaLogo.svg';
import theme from '@assets/theme/theme';
import { CardType, PaymentMethodBrand } from '@constants';
import { PartialStripePaymentMethodCard, PartialStripePaymentMethodSepaDebit, SavedPaymentMethods } from '@types';

export interface SepaCardDetails {
  cardTitle: string;
  cardSubtitle: string;
}

export interface CreditCardDetails extends SepaCardDetails {
  expiryDate: Date;
  expiryMonth: string;
  expiryYear: string;
}

export const getCardDetails = (item: SavedPaymentMethods.SavedPaymentMethods) => {
  if (item.type === CardType.CARD) {
    const { brand, exp_month: expMonth, exp_year: expYear, last4 } = item.card as PartialStripePaymentMethodCard;

    const cardDetails: CreditCardDetails = {
      cardTitle: `${brand}`.charAt(0).toUpperCase() + `${brand} **** ${last4}`.slice(1),
      expiryDate: new Date(`${expYear}-${expMonth}-01`),
      expiryMonth: `0${expMonth}`.slice(-2),
      expiryYear: `${expYear}`.slice(-2),
      cardSubtitle: item.billing_details?.name ?? '',
    };

    return cardDetails;
  } else {
    const { country, last4 } = item.sepa_debit as PartialStripePaymentMethodSepaDebit;

    const cardDetails: SepaCardDetails = {
      cardTitle: `${country ?? ''} **** ${last4 ?? ''}`,
      cardSubtitle: item.billing_details?.name ?? '',
    };

    return cardDetails;
  }
};

export const getCardLogo = (icon: string) => {
  switch (icon) {
    case PaymentMethodBrand.MASTERCARD:
      return <MastercardLogo width={24} height={24} />;
    case PaymentMethodBrand.SEPA:
      return <SepaLogo width={24} height={24} />;
    case PaymentMethodBrand.VISA:
      return <VisaLogo width={24} height={24} />;
    default:
      return <KsIcon name={KS_ICON.CARD} color={theme.colors.defaultTextColor} size={24} />;
  }
};
