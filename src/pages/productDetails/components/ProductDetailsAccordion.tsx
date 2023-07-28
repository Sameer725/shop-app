import React from 'react';
import { StyleSheet } from 'react-native';
import { List } from 'react-native-paper';

import theme from '@assets/theme/theme';
import { Box, ShadowBox, Text } from '@components';
import { useLocalizedData } from '@contexts';
import { ProductCustomFields } from '@types';
import { formatNumber } from '@utils';
import { ProductDetailsAccordionItem } from './ProductDetailsAccordionItem';

interface Props {
  customFields: ProductCustomFields;
}

type Ingredients = 'ingredients' | 'additives' | 'allergens';
type Preparation = 'preparation' | 'storage';
type Nutrients = Pick<
  ProductCustomFields,
  'kJ' | 'kcal' | 'fat' | 'carbohydrate' | 'saturatedFat' | 'sugar' | 'protein' | 'salt'
>;

interface NutrientsArr {
  value: keyof Nutrients;
  label: string;
  unit: string;
}

export const ProductDetailsAccordion: React.FC<Props> = (props) => {
  const { customFields } = props;
  const { strings } = useLocalizedData();

  const nutrientsArray: NutrientsArr[] = [
    { value: 'kJ', label: strings.product.kJ, unit: 'kJ' },
    { value: 'kcal', label: strings.product.kcal, unit: 'kcal' },
    { value: 'fat', label: strings.product.fat, unit: 'g' },
    { value: 'saturatedFat', label: strings.product.saturatedFat, unit: 'g' },
    { value: 'carbohydrate', label: strings.product.carbohydrate, unit: 'g' },
    { value: 'sugar', label: strings.product.sugar, unit: 'g' },
    { value: 'protein', label: strings.product.protein, unit: 'g' },
    { value: 'salt', label: strings.product.salt, unit: 'g' },
  ];
  const availableNutrients = nutrientsArray.filter(
    (nutrient) => !!customFields[nutrient.value] || customFields[nutrient.value] === 0
  );

  const showIngredients = !!customFields.additives || !!customFields.allergens || !!customFields.ingredients;

  const showNutrients = availableNutrients.length > 0;
  const showPreparation = !!customFields.preparation || !!customFields.storage;

  const renderNutrientItems = () => {
    return availableNutrients.map((nutrient, index) => (
      <Box
        key={nutrient.value}
        flexDirection="row"
        paddingHorizontal="s2"
        paddingVertical="s1"
        backgroundColor={index % 2 === 0 ? 'gray100' : 'white'}
        borderRadius={theme.radii.md}
        justifyContent="space-between"
      >
        <Text variant="text-xs">{nutrient.label}</Text>
        <Text variant="text-xs" style={styles.nutrientValuesStyle}>
          {formatNumber(customFields[nutrient.value] ?? '')} {nutrient.unit}
        </Text>
      </Box>
    ));
  };

  const renderSingleIngredientItem = (type: Ingredients | Preparation, label: string) => {
    if (!customFields[type]) {
      return null;
    }
    return (
      <>
        <Text variant="heading-2xs" marginTop="s2">
          {label}:
        </Text>
        <Text variant="text-xs" marginTop="s1">
          {customFields[type]}
        </Text>
      </>
    );
  };

  const renderIngredients = () => {
    if (!showIngredients) {
      return null;
    }
    return (
      <Box style={showPreparation || showNutrients ? styles.listStyleBorder : null}>
        <ProductDetailsAccordionItem id={1} title={strings.product.ingredientsAdditivesAllergens}>
          <Box paddingBottom="s5" paddingHorizontal="s2">
            {renderSingleIngredientItem('ingredients', strings.product.ingredients)}
            {renderSingleIngredientItem('additives', strings.product.additives)}
            {renderSingleIngredientItem('allergens', strings.product.allergens)}
          </Box>
        </ProductDetailsAccordionItem>
      </Box>
    );
  };

  const renderNutrients = () => {
    if (!showNutrients) {
      return null;
    }
    return (
      <Box style={showPreparation ? styles.listStyleBorder : null}>
        <ProductDetailsAccordionItem id={2} title={strings.product.nutritionalValues}>
          <Box paddingBottom="s5">
            <Box flexDirection="row" justifyContent="space-between" paddingVertical="s2" paddingHorizontal="s2">
              <Text variant="heading-2xs">{strings.product.nutritionalInformation}</Text>
              <Text variant="heading-2xs" style={styles.nutrientValuesStyle}>
                {strings.product.per} {strings.product.hundredGram}
              </Text>
            </Box>

            {renderNutrientItems()}
          </Box>
        </ProductDetailsAccordionItem>
      </Box>
    );
  };

  const renderPreparation = () => {
    if (!showPreparation) {
      return null;
    }
    return (
      <Box>
        <ProductDetailsAccordionItem id={3} title={strings.product.packagingPreparationStorage}>
          <Box paddingBottom="s5" paddingHorizontal="s2">
            {renderSingleIngredientItem('preparation', strings.product.preparation)}
            {renderSingleIngredientItem('storage', strings.product.storage)}
          </Box>
        </ProductDetailsAccordionItem>
      </Box>
    );
  };

  return (
    <ShadowBox
      backgroundColor="white"
      borderRadius={theme.radii['2xl']}
      paddingHorizontal="s3"
      containerViewStyle={{ marginTop: theme.spacing.s8 }}
    >
      <List.AccordionGroup>
        <List.Section>
          {renderIngredients()}
          {renderNutrients()}
          {renderPreparation()}
        </List.Section>
      </List.AccordionGroup>
    </ShadowBox>
  );
};

const styles = StyleSheet.create({
  nutrientValuesStyle: { width: 85 },
  listStyleBorder: {
    borderBottomColor: theme.colors.gray100,
    borderBottomWidth: theme.spacing.px,
  },
});
