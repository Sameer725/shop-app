import { gql } from '@apollo/client';

export const PRODUCT_VARIANT_FRAGMENT = gql`
  fragment ProductVariantFragment on ProductVariant {
    id
    displayName
    priceWithTax
    pricePerUnit
    stockLevel
    discountPercentage
    displayDeposit
    enabled
    deletedAt
    customFields {
      isAlcoholic
    }
    featuredAsset {
      preview
    }
    product {
      id
      enabled
      deletedAt
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
`;

export const EXTENDED_PRODUCT_VARIANT_FRAGMENT = gql`
  fragment ExtendedProductVariantFragment on ProductVariant {
    id
    displayName
    priceWithTax
    pricePerUnit
    stockLevel
    discountPercentage
    displayDeposit
    isFavorite
    customFields {
      isAlcoholic
    }
    assets {
      id
      source
    }
    product {
      id
      description
      assets {
        source
      }
      collections {
        id
        parent {
          name
        }
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
        preparation
        storage
        ingredients
        additives
        allergens
        kJ
        kcal
        fat
        saturatedFat
        carbohydrate
        sugar
        protein
        salt
        producer {
          id
          distance
          hasDetailsPage
          name
          address {
            id
            fullName
            city
            province
            streetLine1
            postalCode
          }
        }
      }
    }
  }
`;
