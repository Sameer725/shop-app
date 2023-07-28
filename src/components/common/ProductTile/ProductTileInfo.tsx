import React from 'react';

import { formatPrice } from '@utils';
import { Box } from '../Box';
import { Text } from '../Text';

interface NameProps {
  name: string;
}

const Name = (props: NameProps) => {
  const { name } = props;

  return (
    <Text
      numberOfLines={3}
      textBreakStrategy="balanced"
      lineBreakMode="tail"
      variant="text-2xs-sb"
      lineHeight={11}
      marginBottom="s1"
    >
      {name}
    </Text>
  );
};

interface PriceProps {
  price: number;
  hasDiscount?: boolean;
}

const Price = (props: PriceProps) => {
  const { price, hasDiscount } = props;

  return (
    <Text variant="text-md-sb" color={hasDiscount ? 'error500' : 'defaultTextColor'} lineHeight={19}>
      {formatPrice(price)}
    </Text>
  );
};

interface PricePerUnitProps {
  pricePerUnit: string;
}

const PricePerUnit = (props: PricePerUnitProps) => {
  const { pricePerUnit } = props;

  return (
    <Text color="textColorPlaceholder" variant="text-3xs">
      {pricePerUnit}
    </Text>
  );
};

interface DepositProps {
  displayDeposit: string;
}

const Deposit = (props: DepositProps) => {
  const { displayDeposit } = props;

  return (
    <Text color="textColorPlaceholder" variant="text-3xs">
      {displayDeposit}
    </Text>
  );
};

interface ProductTileInfoProps {
  highlightDiscount?: boolean;
  height?: number;
  name: string;
  priceWithTax: number;
  displayDeposit?: string;
  pricePerUnit?: string;
  discountPercentage: number;
}

export const ProductTileInfo = (props: ProductTileInfoProps) => {
  const {
    name,
    priceWithTax,
    displayDeposit,
    discountPercentage,
    pricePerUnit,
    highlightDiscount = true,
    height,
  } = props;
  const hasDiscount = !!discountPercentage ?? false;

  return (
    <Box height={height}>
      <Name name={name} />
      <Price price={priceWithTax ?? 0} hasDiscount={highlightDiscount && hasDiscount} />
      {displayDeposit ? <Deposit displayDeposit={displayDeposit ?? ''} /> : null}
      {pricePerUnit ? <PricePerUnit pricePerUnit={pricePerUnit ?? ''} /> : null}
    </Box>
  );
};
