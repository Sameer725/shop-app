import { gql } from '@apollo/client';
import { DocumentNode } from 'graphql';

import { PRODUCT_VARIANT_FRAGMENT } from '../graphqlFragments';

export const GET_SPECIALS_QUERY: DocumentNode = gql`
  query Specials($options: SpecialListOptions) {
    specials(options: $options) {
      items {
        id
        category
        title
        externalLink
        internalLink
        featuredAsset {
          source
        }
      }
    }
  }
`;

export const GET_SPECIAL_QUERY: DocumentNode = gql`
  query Special($id: ID!) {
    special(id: $id) {
      id
      category
      title
      description
      featuredAsset {
        source
      }
      productVariants {
        ...ProductVariantFragment
      }
    }
  }
  ${PRODUCT_VARIANT_FRAGMENT}
`;
