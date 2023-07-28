import React, { useEffect, useState } from 'react';

import { Box, DeliveryConditionCard } from '@components';
import { ProductStockStatus } from '@constants';
import { useGlobalSettings, useLocalizedData } from '@contexts';

interface Props {
  isFreshProduct: boolean;
  stockLevel: string;
}

export const ProductFreshInformation: React.FC<Props> = (props) => {
  const { isFreshProduct, stockLevel } = props;

  const { strings } = useLocalizedData();
  const { isFreshProductStockRelevant } = useGlobalSettings();

  const [displayFreshInformation, setDisplayFreshInformation] = useState<boolean>(false);

  useEffect(() => {
    setDisplayFreshInformation(
      isFreshProduct && isFreshProductStockRelevant ? stockLevel === ProductStockStatus.OUT_OF_STOCK : false
    );
  }, [isFreshProductStockRelevant, isFreshProduct, stockLevel]);

  return displayFreshInformation ? (
    <Box marginTop="s8">
      <DeliveryConditionCard infoText={strings.product.chooseDeliveryDate} />
    </Box>
  ) : null;
};
