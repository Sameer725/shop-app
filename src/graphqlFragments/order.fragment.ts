import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

import { PRODUCT_VARIANT_FRAGMENT } from './product-variant.fragment';

export const ORDER_CUSTOM_FIELDS: DocumentNode = gql`
  fragment OrderCustomFields on OrderCustomFields {
    deliveryDate {
      id
    }
    usedWalletValue
    orderByTimeDate
    earliestDeliveryTime
    latestDeliveryTime
    doNotRing
    canDropOrder
    notes
  }
`;

export const BASE_ORDER: DocumentNode = gql`
  ${ORDER_CUSTOM_FIELDS}
  fragment BaseOrder on Order {
    id
    code
    state
    totalQuantity
    totalWithTax
    customFields {
      ...OrderCustomFields
    }
    shippingAddress {
      fullName
      streetLine1
      postalCode
      city
    }
  }
`;

export const DISCOUNT: DocumentNode = gql`
  fragment Discount on Discount {
    description
    amountWithTax
    initialValue
  }
`;

export const EXTENDED_ORDER: DocumentNode = gql`
  ${BASE_ORDER}
  ${PRODUCT_VARIANT_FRAGMENT}
  ${DISCOUNT}
  fragment ExtendedOrder on Order {
    ...BaseOrder
    customer {
      firstName
      lastName
      phoneNumber
    }
    discounts {
      ...Discount
    }
    missingAmountToMOV
    missingAmountToFreeShipping
    shippingWithTax
    subTotalNoDiscounts
    surcharges {
      sku
      priceWithTax
    }

    lines {
      id
      quantity
      productVariant {
        stock
        ...ProductVariantFragment
      }
    }
  }
`;

export const ORDER_RETURN_VALUE = gql`
  ${PRODUCT_VARIANT_FRAGMENT}

  fragment OrderReturnValue on Order {
    id
    totalQuantity
    totalWithTax
    discounts {
      description
      amountWithTax
      initialValue
    }
    missingAmountToMOV
    missingAmountToFreeShipping
    shippingWithTax
    subTotalNoDiscounts
    surcharges {
      sku
      priceWithTax
    }

    customFields {
      usedWalletValue
    }

    lines {
      id
      quantity
      productVariant {
        stock
        ...ProductVariantFragment
      }
    }
  }
`;

export const ORDER_STATUS = gql`
  ${PRODUCT_VARIANT_FRAGMENT}
  ${ORDER_RETURN_VALUE}
  fragment OrderStatus on UpdateOrderItemsResult {
    ... on Order {
      ...OrderReturnValue
    }

    ... on InsufficientStockError {
      message
    }
  }
`;
