import { gql } from '@apollo/client';
import { DocumentNode } from 'graphql';

import { PRODUCT_VARIANT_FRAGMENT } from '../graphqlFragments';

export const TOGGLE_FAVORITE_MUTATION: DocumentNode = gql`
  mutation ToggleFavorite($id: String!) {
    toggleFavorite(productVariantId: $id)
  }
`;

export const GET_FAVORITE_COLLECTIONS: DocumentNode = gql`
  query FavoriteCollections {
    favoriteCollections {
      items {
        id
        name
      }
    }
  }
`;

export const GET_FAVORITE_ITEMS: DocumentNode = gql`
  query Favorites($options: FavoriteListOptions) {
    favorites(options: $options) {
      items {
        productVariant {
          ...ProductVariantFragment
        }
      }
    }
  }
  ${PRODUCT_VARIANT_FRAGMENT}
`;
