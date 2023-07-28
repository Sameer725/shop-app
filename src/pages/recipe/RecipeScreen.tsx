import { useQuery } from '@apollo/client';
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import theme from '@assets/theme/theme';
import { Box, NextCollectionButton, RecipesSkeleton, TopTabNavigationScreenProps } from '@components';
import { GET_RECIPES } from '@graphqlDocuments';
import { Recipe, RecipesQuery } from '@types';
import { RecipeCard } from './components/RecipeCard';

export const RecipeScreen: React.FC<TopTabNavigationScreenProps<undefined>> = (
  props: TopTabNavigationScreenProps<undefined>
) => {
  const { navigation } = props;

  const { data, loading: isLoading } = useQuery<RecipesQuery>(GET_RECIPES);

  const renderRecipeList = () => {
    return (
      <Box flex={1} flexDirection="row" flexWrap="wrap">
        {data?.recipes?.items?.map((item) => {
          return <RecipeCard key={item.id} item={item as Recipe} />;
        })}
      </Box>
    );
  };

  const renderSkeleton = () => {
    return <RecipesSkeleton />;
  };

  return (
    <Box backgroundColor="background" flex={1}>
      {isLoading ? (
        renderSkeleton()
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          contentContainerStyle={styles.container}
        >
          {renderRecipeList()}
          <NextCollectionButton navigation={navigation} />
        </ScrollView>
      )}
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: theme.spacing.s3,
    paddingTop: theme.spacing.s5,
  },
});
