import React, { useCallback, useMemo, useRef, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { KS_ICON, KsIcon } from '@assets/icons';
import theme from '@assets/theme/theme';
import {
  Box,
  Button,
  ButtonSize,
  ButtonType,
  ImageSlider,
  ProductTileList,
  StickyCloseIcon,
  Text,
  useStickyHeader,
} from '@components';
import { HtmlReader } from '@components/common/HtmlReader';
import { ProductStockStatus } from '@constants';
import { useGuard, useLocalizedData, useOrderAction } from '@contexts';
import { Asset, ProductVariant, RecipeDetailsQuery } from '@types';

type Tags = 'cookLevel' | 'cookTime';

interface Props {
  recipeDetails: RecipeDetailsQuery;
}

export const RecipeDetailsContent: React.FC<Props> = (props) => {
  const { recipeDetails } = props;
  const { strings } = useLocalizedData();

  const mainInfoRef = useRef<View>(null);
  const { StickyHeader, scrollHandler, setReferenceViewLayout } = useStickyHeader();

  const { onAddItems } = useOrderAction();
  const { isEligible } = useGuard();

  const [isLoading, setIsLoading] = useState(false);

  const items = useMemo(
    () =>
      recipeDetails?.recipe?.productVariants
        ?.filter((variant) => variant.stockLevel !== ProductStockStatus.OUT_OF_STOCK)
        ?.map((variant) => ({
          productVariantId: variant.id,
          quantity: 1,
        })),
    [recipeDetails]
  );

  const renderStickyHeader = () => {
    if (!recipeDetails) {
      return null;
    }
    return (
      <StickyHeader>
        <Box alignItems="flex-end" paddingBottom="s5">
          <Button
            isLoading={isLoading}
            onPress={() => void addAllToBasket()}
            width="auto"
            size={ButtonSize.MD}
            type={ButtonType.PRIMARY}
          >
            {strings.recipe.addAllIngredientsInBag}
          </Button>
        </Box>
      </StickyHeader>
    );
  };

  const renderProductVariantTiles = () => {
    if (!recipeDetails?.recipe?.productVariants || recipeDetails.recipe.productVariants?.length === 0) {
      return null;
    }

    return (
      <Box marginTop="s8">
        <Text variant="heading-md" paddingHorizontal="s3">
          {strings.recipe.orAddIndividually}
        </Text>
        <ProductTileList items={recipeDetails.recipe.productVariants as ProductVariant[]} />
      </Box>
    );
  };

  const renderCookLevel = (level: string | null | undefined | number) => {
    if (level === 'low' || level === 'hard' || level === 'mid') {
      return <Text>{strings.recipe?.[level]}</Text>;
    }

    return <Text>{level}</Text>;
  };

  const renderTags = (tag: Tags) => {
    if (!recipeDetails?.recipe?.[tag]) {
      return null;
    }

    return (
      <Box
        flexDirection="row"
        borderRadius={theme.radii.md}
        alignItems="center"
        borderWidth={theme.borderWidth.b1}
        borderColor="gray200"
        paddingHorizontal="s3"
        paddingVertical="s1"
        marginLeft={tag === 'cookTime' ? 's2' : undefined}
      >
        <KsIcon name={tag === 'cookTime' ? 'clock' : 'chart-21'} color={theme.colors.gray700} size={12} />
        <Text paddingLeft="s1">
          {tag === 'cookTime'
            ? `${String(recipeDetails.recipe[tag])} ${strings.recipe.minutes}`
            : renderCookLevel(recipeDetails.recipe[tag])}
        </Text>
      </Box>
    );
  };

  const addAllToBasket = useCallback(async () => {
    const isEligibleForAll =
      recipeDetails?.recipe?.productVariants
        ?.map((item) => isEligible(item as ProductVariant))
        .some((item) => !!item) ?? false;
    if (items && isEligibleForAll) {
      try {
        setIsLoading(true);
        await onAddItems(items);
        setIsLoading(false);
      } catch {
        setIsLoading(false);
      }
    }
  }, [items]);

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={scrollHandler}
        style={{ backgroundColor: theme.colors.background }}
      >
        <Box>
          <ImageSlider imagesList={recipeDetails?.recipe?.assets as Asset[]} style={styles.imageSliderStyles} />
        </Box>

        <Box marginTop="s8" paddingHorizontal="s3">
          <Text variant="heading-md">{recipeDetails?.recipe?.name}</Text>

          <Box flexDirection="row" alignItems="center" paddingRight="s3" marginTop="s3">
            {renderTags('cookLevel')}
            {renderTags('cookTime')}
          </Box>

          {recipeDetails?.recipe ? (
            <View ref={mainInfoRef} onLayout={() => setReferenceViewLayout(mainInfoRef)}>
              <Button
                isLoading={isLoading}
                onPress={() => void addAllToBasket()}
                leadingIcon={<KsIcon name={KS_ICON.BAG_2} color={theme.colors.white} size={18} />}
                type={ButtonType.PRIMARY}
                marginTop="s8"
              >
                {strings.recipe.addAllIngredients}
              </Button>
            </View>
          ) : null}
        </Box>

        {renderProductVariantTiles()}

        {recipeDetails?.recipe?.ingredients ? (
          <Box marginTop="s8" paddingHorizontal="s3">
            <Text variant="heading-md" marginBottom="s5">
              {strings.recipe.ingredients}
            </Text>
            <HtmlReader htmlString={recipeDetails.recipe.ingredients} />
          </Box>
        ) : null}

        {recipeDetails?.recipe?.description ? (
          <Box marginVertical="s8" paddingHorizontal="s3">
            <Text variant="heading-md" marginBottom="s5">
              {strings.recipe.description}
            </Text>
            <HtmlReader htmlString={recipeDetails.recipe.description} />
          </Box>
        ) : null}
      </ScrollView>

      <StickyCloseIcon />
      {renderStickyHeader()}
    </>
  );
};

const styles = StyleSheet.create({
  imageSliderStyles: {
    height: 250,
    borderBottomEndRadius: theme.spacing.s4,
    borderBottomStartRadius: theme.spacing.s4,
  },
});
