import { gql } from '@apollo/client';
import { DocumentNode } from 'graphql';

export const GET_COLLECTION_LIST: DocumentNode = gql`
  query RootCollections {
    rootCollections {
      items {
        id
        name
        slug
        description
        featuredAsset {
          preview
        }
        children {
          id
          name
        }
      }
    }
  }
`;

export const GET_COLLECTIONS_FULL_DATA: DocumentNode = gql`
  query CollectionsFullData {
    rootCollections {
      items {
        id
        name
        slug
        children {
          id
          name
          productVariants {
            items {
              id
              displayName
              priceWithTax
              pricePerUnit
              stockLevel
              displayDeposit
              customFields {
                isAlcoholic
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_COLLECTION_REMAINING_CONTENTS: DocumentNode = gql`
  query GetCollectionContents($id: ID!, $options: ProductVariantListOptions) {
    collection(id: $id) {
      id
      name
      slug
      productVariants(options: $options) {
        items {
          id
          stockLevel
          displayDeposit
          discountPercentage
          customFields {
            isAlcoholic
          }
          featuredAsset {
            preview
          }
          product {
            id
            featuredAsset {
              preview
            }
            facetValues {
              name
              code
              facet {
                code
              }
            }
            customFields {
              isFreshProduct
            }
          }
        }
      }
    }
  }
`;
