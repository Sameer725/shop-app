import { gql } from '@apollo/client';
import { DocumentNode } from 'graphql';

import { EXTENDED_PRODUCT_VARIANT_FRAGMENT, PRODUCT_VARIANT_FRAGMENT } from '../graphqlFragments';

export const GET_PRODUCT_VARIANT: DocumentNode = gql`
  query ProductVariant($id: ID!) {
    productVariant(id: $id) {
      ...ExtendedProductVariantFragment
    }
  }
  ${EXTENDED_PRODUCT_VARIANT_FRAGMENT}
`;

export const SEARCH_PRODUCTS: DocumentNode = gql`
  query SearchProducts($query: String!) {
    searchProducts(query: $query) {
      items {
        id
        displayName
        priceWithTax
        pricePerUnit
        productVariantId
        stockLevel
        discountPercentage
        displayDeposit
        featuredAsset {
          preview
        }
        product {
          facetValues {
            name
            code
            facet {
              code
            }
          }
        }
      }
    }
  }
`;

export const SUGGEST_PRODUCT: DocumentNode = gql`
  mutation createProductSuggestion($productName: String!) {
    createProductSuggestion(productName: $productName)
  }
`;

export const GET_UPSELLING_PRODUCTS: DocumentNode = gql`
  query UpSellingProductVariants($options: ProductVariantListOptions) {
    upSellingProductVariants(options: $options) {
      items {
        ...ProductVariantFragment
      }
    }
  }
  ${PRODUCT_VARIANT_FRAGMENT}
`;

export const GET_RANDOM_COLLECTION_PRODUCT_VARIANTS: DocumentNode = gql`
  query RandomCollectionProductVariants($options: RandomCollectionProductVariantsOptions!) {
    randomCollectionProductVariants(options: $options) {
      ...ProductVariantFragment
    }
  }
  ${PRODUCT_VARIANT_FRAGMENT}
`;
