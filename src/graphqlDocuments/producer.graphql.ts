import { gql } from '@apollo/client';
import { DocumentNode } from 'graphql';

import { PRODUCT_VARIANT_FRAGMENT } from '../graphqlFragments';

export const GET_PRODUCER: DocumentNode = gql`
  query Producer($id: ID!) {
    producer(id: $id) {
      id
      hasDetailsPage
      description
      name
      featuredAsset {
        source
      }

      assets {
        source
      }

      address {
        fullName
        streetLine1
        streetLine2
        city
        province
        postalCode
      }
      distance
    }
  }
`;

export const GET_PRODUCER_LIST: DocumentNode = gql`
  query Producers {
    producers {
      items {
        id
        name
        featuredAsset {
          source
        }
      }
    }
  }
`;

export const GET_PRODUCER_PRODUCT_VARIANTS: DocumentNode = gql`
  query ProducersProductVariants($id: ID!, $options: ProductVariantListOptions) {
    producersProductVariants(id: $id, options: $options) {
      totalItems
      items {
        ...ProductVariantFragment
      }
    }
  }
  ${PRODUCT_VARIANT_FRAGMENT}
`;
