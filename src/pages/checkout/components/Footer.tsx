import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Shadow, ShadowProps } from 'react-native-shadow-2';

import { KS_ICON, KsIcon } from '@assets/icons';
import theme from '@assets/theme/theme';
import { Box, Button, Text } from '@components';
import { useLocalizedData } from '@contexts';
import { formatPrice } from '@utils';

interface FooterProps {
  onPress: () => void;
  isEmpty: boolean;
  totalQuantity: number;
  totalWithTax: number;
}

export const Footer = (props: FooterProps) => {
  const { onPress, isEmpty, totalQuantity, totalWithTax } = props;
  const { strings } = useLocalizedData();

  const insets = useSafeAreaInsets();

  return !isEmpty ? (
    <Shadow
      viewStyle={{
        alignSelf: 'stretch',
        paddingBottom: insets.bottom,
        backgroundColor: theme.colors.white,
      }}
      getChildRadius={false}
      {...shadow}
    >
      <Box
        paddingVertical="s2"
        paddingHorizontal="s4"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box flex={1}>
          <Text variant="text-xs" fontWeight="bold">
            {totalQuantity} {strings.basket.article}
          </Text>
          <Text variant="text-md" fontWeight="bold">
            {formatPrice(totalWithTax ?? 0)}
          </Text>
        </Box>
        <Button
          onPress={onPress}
          trailingIcon={<KsIcon name={KS_ICON.EMPTY_WALLET} color={theme.colors.white} size={20} />}
          justifyContent="center"
          width="auto"
        >
          {strings.checkout.payNow}
        </Button>
      </Box>
    </Shadow>
  ) : null;
};

const shadow: ShadowProps = {
  startColor: 'rgba(0, 0, 0, 0.07)',
  distance: 5,
};
