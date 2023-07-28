import { gql } from '@apollo/client';
import { DocumentNode } from 'graphql';

import { PRODUCT_VARIANT_FRAGMENT } from '../graphqlFragments';

export const GET_RECIPES: DocumentNode = gql`
  query Recipes {
    recipes {
      items {
        id
        name
        featuredAsset {
          preview
        }
      }
    }
  }
`;

export const GET_RECIPE_DETAILS: DocumentNode = gql`
  query RecipeDetails($id: ID!) {
    recipe(id: $id) {
      id
      name
      description
      ingredients
      cookTime
      cookLevel
      assets {
        id
        source
      }
      productVariants {
        ...ProductVariantFragment
      }
    }
  }
  ${PRODUCT_VARIANT_FRAGMENT}
`;
