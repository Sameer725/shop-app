import { useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';

import { KS_ICON, KsIcon } from '@assets/icons';
import theme from '@assets/theme/theme';
import { Badge, Box, ProductOrderButton, ProductOrderButtonType, Text } from '@components';
import { useGuard } from '@contexts';
import { TOGGLE_FAVORITE_MUTATION } from '@graphqlDocuments';
import { ProductVariant } from '@types';
import { formatPrice } from '@utils';

interface Props {
  productInfo: ProductVariant;
  count: number;
}

export const ProductMainInformation: React.FC<Props> = (props) => {
  const { productInfo, count } = props;
  const [isFavorite, setIsFavoriteState] = useState(false);

  const { isEligible } = useGuard();

  useEffect(() => {
    setIsFavoriteState(productInfo?.isFavorite ?? false);
  }, [productInfo]);

  const rootCollectionId = productInfo.product.collections.find(
    (collection) => collection.parent?.name === '__root_collection__'
  )?.id;

  const [toggleFavoriteMutation] = useMutation(TOGGLE_FAVORITE_MUTATION, {
    onCompleted: () => setIsFavoriteState((prevState) => !prevState),
    update: (cache) => {
      // Remove favoriteCollections query and favorites query of the specific collection
      cache.evict({ fieldName: 'favoriteCollections' });
      cache.evict({ fieldName: `productVariant({"id":"${productInfo.id}"})` });

      if (rootCollectionId) {
        cache.evict({
          fieldName: `favorites({"options":{"filter":{"collectionId":{"eq":"${rootCollectionId}"}}}})`,
        });
      } else {
        cache.evict({
          fieldName: 'favorites',
        });
      }
      cache.gc();
    },
  });

  const toggleFavorite = () => {
    if (isEligible(productInfo)) {
      void toggleFavoriteMutation({ variables: { id: productInfo.id } });
    }
  };

  return (
    <Box marginTop="s8">
      <Box flexDirection="row" justifyContent="space-between" alignItems="center">
        <Text variant="heading-md" paddingRight="s3" paddingVertical="s2" style={styles.textWrap}>
          {productInfo.displayName}
        </Text>
        <Pressable onPress={toggleFavorite} hitSlop={20} style={styles.favIconStyles}>
          <KsIcon
            onPress={toggleFavorite}
            name={KS_ICON.HEART}
            bold={isFavorite}
            color={isFavorite ? theme.colors.error500 : theme.colors.gray700}
            size={theme.spacing.s6}
          />
        </Pressable>
      </Box>

      <Box flexDirection="row" alignItems="center" marginTop="s4">
        <Text variant="heading-lg" color={productInfo.discountPercentage ? 'error500' : 'defaultTextColor'}>
          {formatPrice(productInfo.priceWithTax)}
        </Text>

        {productInfo.discountPercentage ? (
          <Badge color="error500" fontColor="white" marginLeft="s4">
            - {productInfo.discountPercentage} %
          </Badge>
        ) : null}
      </Box>

      {productInfo.displayDeposit ? (
        <Text variant="text-md" marginTop="s1">
          {productInfo.displayDeposit}
        </Text>
      ) : null}

      {productInfo.pricePerUnit ? (
        <Text variant="text-md" marginTop="s1">
          {productInfo.pricePerUnit}
        </Text>
      ) : null}

      <Box marginTop="s8">
        <ProductOrderButton
          item={productInfo}
          type={ProductOrderButtonType.LARGE}
          disabledWidth="100%"
          height={theme.spacing.s12}
          count={count}
        />
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  textWrap: {
    flex: 1,
    flexWrap: 'wrap',
  },
  favIconStyles: {
    padding: theme.spacing.s2,
  },
});
