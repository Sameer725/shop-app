import { ResponsiveValue } from '@shopify/restyle/dist/types';
import React, { ReactNode, useEffect, useState } from 'react';

import theme, { Theme } from '@assets/theme/theme';
import { useLocalizedData } from '@contexts';
import { Order } from '@types';
import { formatPrice } from '@utils';
import { Box } from './Box';
import { Divider } from './Divider';
import { ShadowBox } from './ShadowBox';
import { Text } from './Text';

interface LabelProps {
  children: ReactNode;
  value: number;
  bold?: boolean;
  marginBottom?: ResponsiveValue<keyof Theme['spacing'], Theme> | undefined;
}

const CostSummaryItem: React.FC<LabelProps> = (props) => {
  const { children, value, bold = false, marginBottom = 's2' } = props;

  return (
    <Box flexDirection="row" justifyContent="space-between" marginBottom={marginBottom}>
      <Text variant={bold ? 'heading-xs' : 'text-sm'}>{children}</Text>
      <Text variant={bold ? 'heading-xs' : 'text-sm'}>{formatPrice(value)}</Text>
    </Box>
  );
};

interface Props {
  order: Order;
}

export const OrderCostOverview: React.FC<Props> = (props) => {
  const { order } = props;
  const [deposit, setDeposit] = useState<number>(0);

  const { strings } = useLocalizedData();

  useEffect(() => {
    setDeposit(order?.surcharges?.find((surcharge) => surcharge.sku === 'deposit')?.priceWithTax ?? 0);
  }, [order]);

  return (
    <ShadowBox
      backgroundColor="white"
      borderRadius={theme.radii['2xl']}
      containerViewStyle={{
        paddingVertical: theme.spacing.s2,
        paddingHorizontal: theme.spacing.s3,
      }}
    >
      <CostSummaryItem value={order?.subTotalNoDiscounts ?? 0} bold>
        {strings.profileSettings.order.subTotal}
      </CostSummaryItem>
      {deposit > 0 ? <CostSummaryItem value={deposit}>{strings.profileSettings.order.deposit}</CostSummaryItem> : null}

      <CostSummaryItem value={order?.shippingWithTax}>{strings.profileSettings.order.shippingCosts}</CostSummaryItem>
      {order?.discounts?.length > 0 ? (
        <Text variant="text-xs" color="textColorPlaceholder">
          {strings.profileSettings.order.discounts}
        </Text>
      ) : null}

      {order?.discounts?.map((discount, i, discounts) => (
        // The last element should have no bottom margin.
        // For all other elements the default margin is used (by setting it to `undefined`)
        <CostSummaryItem
          value={discount.amountWithTax}
          key={i}
          marginBottom={i === discounts.length - 1 ? undefined : 'nil'}
        >
          {discount.description}
        </CostSummaryItem>
      ))}

      <Divider style={{ marginTop: theme.spacing.s2, marginBottom: theme.spacing.s4 }} />

      <CostSummaryItem value={order?.totalWithTax} bold>
        {strings.profileSettings.order.total} <Text variant="text-sm">({strings.profileSettings.order.inclVat})</Text>
      </CostSummaryItem>
    </ShadowBox>
  );
};
