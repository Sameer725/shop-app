import { useQuery } from '@apollo/client';
import { useRoute } from '@react-navigation/native';
import React from 'react';

import { DetailsScreenSkeleton, DetailsScreenSkeletonType, ScreenWrapper } from '@components';
import { GET_RECIPE_DETAILS } from '@graphqlDocuments';
import { useToastNotification } from '@hooks';
import { KsRoute, RecipeDetailsQuery, RecipeDetailsQueryVariables } from '@types';
import { RecipeDetailsContent } from './components/RecipeDetailsContent';

interface RecipeDetailParam {
  recipeId: string;
}

export const RecipeDetailsScreen: React.FC = () => {
  const { showGeneralErrorToast } = useToastNotification();
  const route: KsRoute<RecipeDetailParam> = useRoute();

  const { data: recipeDetails, loading: isLoading } = useQuery<RecipeDetailsQuery, RecipeDetailsQueryVariables>(
    GET_RECIPE_DETAILS,
    {
      variables: { id: route.params?.recipeId },
      onError: () => {
        showGeneralErrorToast();
      },
    }
  );

  return (
    <ScreenWrapper>
      {isLoading ? (
        <DetailsScreenSkeleton type={DetailsScreenSkeletonType.RECIPE_DETAILS} />
      ) : (
        <RecipeDetailsContent recipeDetails={recipeDetails as RecipeDetailsQuery} />
      )}
    </ScreenWrapper>
  );
};
