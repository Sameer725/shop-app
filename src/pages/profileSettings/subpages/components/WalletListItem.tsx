import dayjs from 'dayjs';
import React from 'react';

import theme from '@assets/theme/theme';
import { Box, ShadowBox, Text } from '@components';
import { useLocalizedData } from '@contexts';
import { WalletItem } from '@types';
import { formatPrice } from '@utils';

interface Props {
  wallet: WalletItem;
}

export enum WalletActivity {
  ORDER_PAYMENT = 'orderPayment',
  SUPPORT_DEBIT = 'supportDebit',
  SUPPORT_CREDIT = 'supportCredit',
  DEPOSIT_REFUND = 'depositRefund',
  ORDER_GOODWILL = 'orderGoodwill',
  GIFT_COUPON_CREDIT = 'giftCouponCredit',
}

export const WalletListItem: React.FC<Props> = (props) => {
  const { wallet } = props;

  const { strings } = useLocalizedData();

  const negative = wallet.activity === WalletActivity.ORDER_PAYMENT || wallet.activity === WalletActivity.SUPPORT_DEBIT;
  return (
    <Box marginBottom="s5" marginHorizontal="s3" key={wallet.id}>
      <ShadowBox borderRadius={theme.radii.xl} padding="s3">
        <Text variant="heading-xs" color={negative ? 'error500' : 'primary500'}>
          {strings.profileSettings.wallet[wallet.activity as WalletActivity]}
        </Text>
        <Text variant="text-sm" marginTop="s1">
          {dayjs(wallet.createdAt as string).format('DD.MM.YYYY')}
        </Text>
        <Text variant="text-sm" marginTop="s1">
          {wallet.description}
        </Text>

        <Text variant="heading-sm" marginTop="s3">
          {negative ? '-' : '+'}
          {formatPrice(wallet.total)}
        </Text>
      </ShadowBox>
    </Box>
  );
};
