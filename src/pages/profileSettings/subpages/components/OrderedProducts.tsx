import React, { Dispatch, SetStateAction } from 'react';

import theme from '@assets/theme/theme';
import { Box, Divider, MemoizedProductTileReadonly, ShadowBox, Text } from '@components';
import { useLocalizedData } from '@contexts';
import { Order } from '@types';
import { RequestOrderComplaintInput } from '../ComplaintScreen';
import { ComplaintProductTile } from './ComplaintProductTile';

interface Props {
  order: Order;
  complaintData?: RequestOrderComplaintInput;
  setComplaintData?: Dispatch<SetStateAction<RequestOrderComplaintInput>>;
  setErrorPosition?: Dispatch<SetStateAction<number>>;
}

export const OrderedProducts: React.FC<Props> = (props) => {
  const { order, complaintData, setComplaintData, setErrorPosition } = props;

  const { strings } = useLocalizedData();

  return (
    <ShadowBox
      backgroundColor="white"
      borderRadius={theme.radii['2xl']}
      containerViewStyle={{
        paddingVertical: theme.spacing.s2,
        paddingHorizontal: theme.spacing.s3,
        marginTop: complaintData ? undefined : theme.spacing.s5,
      }}
    >
      <Text variant="heading-sm" marginBottom="s5">
        {strings.profileSettings.order.orderedProducts}
      </Text>

      {order?.lines?.map((item, index) => (
        <Box key={item.id} marginTop="s2">
          {complaintData && setComplaintData && setErrorPosition ? (
            <ComplaintProductTile
              complaintData={complaintData.items[index]}
              setComplaintData={setComplaintData}
              index={index}
              item={item.productVariant}
              orderedQuantity={item.quantity}
              setErrorPosition={setErrorPosition}
            />
          ) : (
            <MemoizedProductTileReadonly
              item={{
                ...item.productVariant,
                priceWithTax: item.unitPriceWithTax,
                pricePerUnit: item.pricePerUnit,
              }}
              orderedQuantity={item.quantity}
            />
          )}

          {index < order.lines.length - 1 ? <Divider color="gray100" style={{ marginTop: theme.spacing.s2 }} /> : null}
        </Box>
      ))}
    </ShadowBox>
  );
};
