import { gql } from '@apollo/client';
import { DocumentNode } from 'graphql';

import {
  BASE_ORDER,
  EXTENDED_ORDER,
  ORDER_CUSTOM_FIELDS,
  ORDER_STATUS,
  PRODUCT_VARIANT_FRAGMENT,
} from '../graphqlFragments';

export const GET_CUSTOMER_ORDERS: DocumentNode = gql`
  ${BASE_ORDER}
  query GetCustomerOrders($options: OrderListOptions!) {
    activeCustomer {
      id
      orders(options: $options) {
        items {
          ...BaseOrder
          customer {
            firstName
            lastName
            phoneNumber
          }
        }
        totalItems
      }
    }
  }
`;

export const GET_ACTIVE_ORDER: DocumentNode = gql`
  ${EXTENDED_ORDER}
  query GetActiveOrder {
    activeOrder {
      ...ExtendedOrder
    }
  }
`;

export const GET_ORDER_SHIPPING_LINES: DocumentNode = gql`
  query GetOrderShippingLines {
    activeOrder {
      shippingLines {
        shippingMethod {
          id
          customFields {
            deliveryDates {
              id
              deliveryWeekday
              earliestDeliveryTime
              latestDeliveryTime
              orderByDay
              orderByTimeDate
              hasCapacity
            }
          }
        }
      }
    }
  }
`;

export const GET_SINGLE_ORDER: DocumentNode = gql`
  ${BASE_ORDER}
  ${PRODUCT_VARIANT_FRAGMENT}
  query GetSingleOrder($id: ID!) {
    order(id: $id) {
      ...BaseOrder
      orderPlacedAt
      subTotalNoDiscounts
      shippingWithTax
      discounts {
        description
        amountWithTax
        initialValue
      }
      surcharges {
        sku
        priceWithTax
      }
      customer {
        firstName
        lastName
        phoneNumber
      }
      # OrderItems
      lines {
        id
        unitPriceWithTax
        pricePerUnit
        quantity
        productVariant {
          ...ProductVariantFragment
        }
      }
    }
  }
`;

export const ADD_ITEM_TO_ORDER: DocumentNode = gql`
  ${ORDER_STATUS}
  mutation AddItemToOrder($productVariantId: ID!, $quantity: Int!) {
    addItemToOrder(productVariantId: $productVariantId, quantity: $quantity) {
      ...OrderStatus
    }
  }
`;

export const ADD_ITEMS_TO_ORDER: DocumentNode = gql`
  ${ORDER_STATUS}
  mutation AddItemsToOrder($items: [AddItemsToOrderInput!]!) {
    addItemsToOrder(items: $items) {
      ...OrderStatus
    }
  }
`;

export const ADJUST_ORDER_LINE: DocumentNode = gql`
  ${ORDER_STATUS}
  mutation AdjustOrderLine($orderLineId: ID!, $quantity: Int!) {
    adjustOrderLine(orderLineId: $orderLineId, quantity: $quantity) {
      ...OrderStatus
    }
  }
`;

export const ADJUST_ORDER_LINES: DocumentNode = gql`
  ${ORDER_STATUS}
  mutation AdjustOrderLines($items: [AdjustOrderLineInput!]!) {
    adjustOrderLines(items: $items) {
      ...OrderStatus
    }
  }
`;

export const ADJUST_PRODUCT_VARIANT_IN_ORDER: DocumentNode = gql`
  ${ORDER_STATUS}
  mutation AdjustProductVariantInOrder($productVariantId: ID!, $quantity: Int!) {
    adjustProductVariantInOrder(productVariantId: $productVariantId, quantity: $quantity) {
      ...OrderStatus
    }
  }
`;

export const REMOVE_ITEM_FROM_ORDER: DocumentNode = gql`
  ${ORDER_STATUS}
  mutation RemoveItemFromOrder($productVariantId: ID!, $quantity: Int!) {
    removeItemFromOrder(productVariantId: $productVariantId, quantity: $quantity) {
      ...OrderStatus
    }
  }
`;

export const REMOVE_ALL_ORDER_LINES: DocumentNode = gql`
  ${EXTENDED_ORDER}
  mutation RemoveAllOrderLines {
    removeAllOrderLines {
      ...ExtendedOrder
    }
  }
`;

export const UPDATE_ORDER_DELIVERY_DATE: DocumentNode = gql`
  ${ORDER_CUSTOM_FIELDS}

  mutation UpdateOrderDeliveryDate($deliveryDateId: ID!) {
    updateOrderDeliveryDate(deliveryDateId: $deliveryDateId) {
      id
      customFields {
        ...OrderCustomFields
      }
    }
  }
`;

export const UPDATE_ORDER_SHIPPING_ADDRESS: DocumentNode = gql`
  ${BASE_ORDER}
  mutation UpdateOrderShippingAddress($input: CreateAddressInput!) {
    setOrderShippingAddress(input: $input) {
      __typename
      ... on Order {
        ...BaseOrder
        shippingLines {
          shippingMethod {
            id
            customFields {
              deliveryDates {
                id
                deliveryWeekday
                earliestDeliveryTime
                latestDeliveryTime
                orderByTimeDate
                hasCapacity
              }
            }
          }
        }
      }
    }
  }
`;

export const SET_ORDER_CUSTOM_FIELD: DocumentNode = gql`
  mutation SetOrderCustomFields($customFields: UpdateOrderCustomFieldsInput) {
    setOrderCustomFields(input: { customFields: $customFields }) {
      ... on Order {
        customFields {
          doNotRing
          canDropOrder
          notes
        }
      }
    }
  }
`;

export const MARK_ORDER_AS_INACTIVE: DocumentNode = gql`
  mutation MarkOrderAsInactive {
    markOrderAsInactive
  }
`;

export const REQUEST_ORDER_COMPLAINT: DocumentNode = gql`
  mutation RequestOrderComplaint($input: RequestOrderComplaintInput!) {
    requestOrderComplaint(input: $input)
  }
`;
