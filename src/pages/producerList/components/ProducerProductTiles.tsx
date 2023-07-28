import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Pressable } from 'react-native';

import theme from '@assets/theme/theme';
import { Box, MemoizedProductTileVertical, ShadowBox, Text } from '@components';
import { useLocalizedData, useOrderLines } from '@contexts';
import { CommonScreens } from '@routes/routes';
import { KsNavigation, ProductVariant } from '@types';

interface Props {
  productList: ProductVariant[];
  producerId: string;
}

export const ProducerProductTiles: React.FC<Props> = (props) => {
  const { productList, producerId } = props;
  const { strings } = useLocalizedData();
  const navigation: KsNavigation = useNavigation();
  const { getCount } = useOrderLines();

  const navigateToProducer = () => {
    navigation.navigate(CommonScreens.PRODUCER_DETAILS_SCREEN, {
      producerId,
    });
  };

  return (
    <Box flex={1} flexDirection="row" flexWrap="wrap" marginLeft="s3">
      {productList?.map((product) => (
        <Box key={product.id} paddingRight="s3" width="33.33%" marginTop="s5">
          <MemoizedProductTileVertical item={product} orderedQuantity={getCount(product)} />
        </Box>
      ))}

      <Box paddingRight="s3" width="33.33%" marginTop="s5">
        <Pressable onPress={navigateToProducer} style={{ flex: 1 }}>
          <ShadowBox borderRadius={theme.radii.xl} padding="s2" height="100%">
            <Box flex={1} justifyContent="center" alignContent="center">
              <Text variant="heading-2xs" textAlign="center">
                {strings.producer.showAllProducts}
              </Text>
            </Box>
          </ShadowBox>
        </Pressable>
      </Box>
    </Box>
  );
};
