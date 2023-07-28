import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';

import theme from '@assets/theme/theme';
import { Box, ShadowBox, Text } from '@components';
import { DashboardScreens } from '@routes/routes';
import { KsNavigation, Recipe } from '@types';

interface Props {
  item: Recipe;
}

export const RecipeCard: React.FC<Props> = (props) => {
  const navigation: KsNavigation = useNavigation();
  const { item } = props;

  const navigateToRecipeScreen = () => {
    navigation.navigate(DashboardScreens.RECIPE_DETAILS_SCREEN, {
      recipeId: item.id,
    });
  };

  return (
    <Box width={'33.33333%'}>
      <ShadowBox
        backgroundColor="white"
        alignItems="center"
        height={210}
        borderRadius={theme.radii.xl}
        overflow="hidden"
        containerViewStyle={{
          marginRight: theme.spacing.s3,
          marginBottom: theme.spacing.s5,
        }}
      >
        <Pressable style={styles.container} onPress={navigateToRecipeScreen}>
          <Text
            variant="heading-2xs"
            margin="s2"
            textAlign="center"
            textBreakStrategy="balanced"
            lineBreakMode="tail"
            numberOfLines={3}
          >
            {item?.name}
          </Text>

          <FastImage
            resizeMode="cover"
            source={{
              uri: item?.featuredAsset?.preview ? `${String(item?.featuredAsset?.preview)}?preset=small` : undefined,
            }}
            style={styles.image}
          />
        </Pressable>
      </ShadowBox>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    width: '100%',
  },
  image: {
    margin: theme.spacing.s2,
    borderRadius: theme.radii.lg,
    height: 130,
  },
});
