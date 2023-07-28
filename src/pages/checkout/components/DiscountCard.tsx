import { FetchResult, useMutation } from '@apollo/client';
import React from 'react';
import { ActivityIndicator, Pressable } from 'react-native';

import { KS_ICON, KsIcon } from '@assets/icons';
import theme from '@assets/theme/theme';
import { Box, ShadowBox, Text } from '@components';
import { REMOVE_GIFT_COUPON_CODE, REMOVE_PROMOTION_CODE } from '@graphqlDocuments';
import {
  RemoveCouponCodeMutation,
  RemoveCouponCodeMutationVariables,
  RemoveGiftCouponCodeMutation,
  RemoveGiftCouponCodeMutationVariables,
} from '@types';
import { GiftCouponResponseAccessor } from './GiftAndPromotion';

interface DiscountCardProps {
  code: string;
  discount: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  setSuccessData: <T extends { [key: string]: any; __typename?: string | undefined }>(
    response: FetchResult<T>,
    accessor: GiftCouponResponseAccessor
  ) => void;
  setFailedData: () => void;
}

export const DiscountCard = (props: DiscountCardProps) => {
  const { code, discount, setSuccessData, setFailedData } = props;

  const [removePromotionCode, { loading: isRemovingPromotionLoading }] = useMutation<
    RemoveCouponCodeMutation,
    RemoveCouponCodeMutationVariables
  >(REMOVE_PROMOTION_CODE);
  const [removeGiftCoupon, { loading: isRemovingCouponLoading }] = useMutation<
    RemoveGiftCouponCodeMutation,
    RemoveGiftCouponCodeMutationVariables
  >(REMOVE_GIFT_COUPON_CODE);

  const onRemovePress = () => {
    if (code.toUpperCase().startsWith('KS-')) {
      void removeGiftCoupon({ variables: { code: code.toUpperCase() } })
        .then((res) => {
          setSuccessData(res, 'removeGiftCouponCode');
        })
        .catch(setFailedData);
    } else {
      void removePromotionCode({ variables: { code } })
        .then((res) => {
          setSuccessData(res, 'removeCouponCode');
        })
        .catch(setFailedData);
    }
  };

  return (
    <ShadowBox
      borderRadius={theme.radii.md}
      backgroundColor="gray100"
      containerViewStyle={{ marginBottom: theme.spacing.s5 }}
    >
      <Box
        justifyContent="space-between"
        alignItems="center"
        paddingVertical="s3"
        paddingHorizontal="s4"
        flexDirection="row"
      >
        <KsIcon name={KS_ICON.TICKET_DISCOUNT} size={20} color={theme.colors.defaultTextColor} />
        <Box flex={1} paddingHorizontal="s3">
          <Text variant="heading-sm">{discount}</Text>
          <Text variant="text-md">{code}</Text>
        </Box>
        {isRemovingCouponLoading || isRemovingPromotionLoading ? (
          <ActivityIndicator color={theme.colors.defaultTextColor} />
        ) : (
          <Pressable onPress={onRemovePress}>
            <KsIcon name={KS_ICON.CLOSE_CIRCLE} size={20} color={theme.colors.defaultTextColor} />
          </Pressable>
        )}
      </Box>
    </ShadowBox>
  );
};
