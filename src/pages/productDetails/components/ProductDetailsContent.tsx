import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import theme from '@assets/theme/theme';
import {
  Badge,
  BadgeSize,
  Box,
  HtmlReader,
  ImageSlider,
  ProductOrderButton,
  ProductOrderButtonType,
  StickyCloseIcon,
  Text,
  useStickyHeader,
} from '@components';
import { ProductFacetCode } from '@constants';
import { useOrderLines } from '@contexts';
import { Asset, Producer, ProductCustomFields, ProductVariant, ProductVariantQuery } from '@types';
import { ProductDetailsAccordion } from './ProductDetailsAccordion';
import { ProductFreshInformation } from './ProductFreshInformation';
import { ProductMainInformation } from './ProductMainInformation';
import { ProductProducerInfo } from './ProductProducerInfo';
import { SimilarProducts } from './SimilarProducts';

const accordionValues: (keyof ProductCustomFields)[] = [
  'preparation',
  'ingredients',
  'additives',
  'allergens',
  'kJ',
  'kcal',
  'fat',
  'saturatedFat',
  'carbohydrate',
  'sugar',
  'protein',
  'salt',
];

interface Props {
  productDetails: ProductVariantQuery;
}

export const ProductDetailsContent: React.FC<Props> = (props) => {
  const {
    productDetails: { productVariant },
  } = props;
  const { StickyHeader, scrollHandler, setReferenceViewLayout } = useStickyHeader();
  const { getCount } = useOrderLines();
  const count = getCount(productVariant as ProductVariant);

  const [badgeValue, setBadgeValue] = useState<string>('');
  const [showAccordion, setShowAccordion] = useState<boolean>(false);
  useEffect(() => {
    const tempBadgeValue = productVariant?.product?.facetValues?.find(
      (facetValue) => facetValue.facet.code === ProductFacetCode.PRODUCT_TAG
    )?.name;
    setBadgeValue(tempBadgeValue ?? '');

    const tempShowAccordion =
      productVariant &&
      accordionValues.some(
        (fieldValues) =>
          Boolean((productVariant?.product?.customFields as ProductCustomFields)?.[fieldValues]) ||
          (productVariant?.product?.customFields as ProductCustomFields)?.[fieldValues] === 0
      );

    setShowAccordion(tempShowAccordion ?? false);
  }, [productVariant?.id]);

  const mainInfoRef = useRef<View>(null);
  const renderStickyHeader = () => {
    if (!productVariant) {
      return null;
    }

    return (
      <StickyHeader>
        <Box flexDirection="row" justifyContent="space-between" alignItems="center" paddingBottom="s5">
          <Text variant="heading-sm" paddingLeft="s20" paddingRight="s4" style={{ flexShrink: 1 }}>
            {productVariant?.displayName}
          </Text>
          <ProductOrderButton
            count={count}
            item={productVariant as ProductVariant}
            type={ProductOrderButtonType.MEDIUM}
          />
        </Box>
      </StickyHeader>
    );
  };

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={scrollHandler}
        style={{ backgroundColor: theme.colors.background }}
      >
        <Box>
          <ImageSlider
            imagesList={
              productVariant ? ([...productVariant?.assets, ...productVariant?.product?.assets] as Asset[]) : []
            }
            style={styles.imageSliderStyles}
            resizeMode="contain"
          />
          <Box style={styles.imageBadgeStyles} alignSelf="flex-end">
            {badgeValue ? <Badge size={BadgeSize.LG}>{badgeValue}</Badge> : null}
          </Box>
        </Box>

        <Box marginBottom="s8">
          <Box marginHorizontal="s3">
            {/* Main information */}
            {productVariant ? (
              <View ref={mainInfoRef} onLayout={() => setReferenceViewLayout(mainInfoRef)}>
                <ProductMainInformation count={count} productInfo={productVariant as ProductVariant} />
              </View>
            ) : null}

            {/* Product Fresh Information */}
            <ProductFreshInformation
              isFreshProduct={productVariant?.product?.customFields?.isFreshProduct ?? false}
              stockLevel={productVariant?.stockLevel}
            />

            {/* Product Description */}
            {productVariant?.product?.description ? (
              <Box marginTop="s8">
                <HtmlReader htmlString={productVariant?.product?.description} />
              </Box>
            ) : null}

            {/* Details Accordion */}
            {showAccordion && !!productVariant?.product?.customFields ? (
              <ProductDetailsAccordion customFields={productVariant?.product?.customFields as ProductCustomFields} />
            ) : null}

            {/* Producer information */}
            {productVariant?.product?.customFields?.producer ? (
              <ProductProducerInfo producer={productVariant?.product?.customFields?.producer as Producer} />
            ) : null}
          </Box>

          {/* Similar Products */}
          {productVariant?.product?.collections?.[0]?.id ? (
            <SimilarProducts collectionId={productVariant?.product?.collections?.[0]?.id ?? ''} />
          ) : null}
        </Box>
      </ScrollView>
      <StickyCloseIcon />
      {renderStickyHeader()}
    </>
  );
};

const styles = StyleSheet.create({
  imageSliderStyles: {
    height: 250,
  },
  imageBadgeStyles: {
    position: 'absolute',
    alignSelf: 'center',
    top: theme.spacing.s5,
    right: theme.spacing.s5,
  },
});
