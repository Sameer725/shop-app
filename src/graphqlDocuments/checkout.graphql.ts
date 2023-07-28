import { gql } from '@apollo/client';
import { DocumentNode } from 'graphql';

import { ORDER_RETURN_VALUE } from '../graphqlFragments';

export const CREATE_PAYPAL_PAYMENT: DocumentNode = gql`
  mutation CreatePaypalPayment {
    createPaypalPayment
  }
`;

export const CREATE_PAYMENT_INTENT: DocumentNode = gql`
  mutation CreatePaymentIntent {
    createStripePaymentIntent
  }
`;

export const CREATE_SETUP_INTENT: DocumentNode = gql`
  mutation CreateSetupIntent {
    createSetupIntent {
      clientSecret
      setupIntentId
    }
  }
`;

export const TRANSITION_ORDER_TO_STATE: DocumentNode = gql`
  mutation TransitionOrderToState($state: String!) {
    transitionOrderToState(state: $state) {
      __typename
      ... on Order {
        id
      }
      ... on ErrorResult {
        errorCode
        message
      }
      ... on OrderStateTransitionError {
        errorCode
        message
        transitionError
      }
    }
  }
`;

export const ADD_PAYMENT_TO_ORDER: DocumentNode = gql`
  mutation AddPaymentToOrder($method: String!) {
    addPaymentToOrder(input: { method: $method, metadata: {} }) {
      ... on Order {
        id
      }
    }
  }
`;

export const APPLY_GIFT_COUPON_CODE: DocumentNode = gql`
  ${ORDER_RETURN_VALUE}
  mutation ApplyGiftCouponCode($code: String!) {
    applyGiftCouponCode(code: $code) {
      ... on Order {
        ...OrderReturnValue
      }
    }
  }
`;

export const REMOVE_GIFT_COUPON_CODE: DocumentNode = gql`
  ${ORDER_RETURN_VALUE}
  mutation RemoveGiftCouponCode($code: String!) {
    removeGiftCouponCode(code: $code) {
      ... on Order {
        ...OrderReturnValue
      }
    }
  }
`;

export const APPLY_PROMOTION_CODE: DocumentNode = gql`
  ${ORDER_RETURN_VALUE}
  mutation ApplyCouponCode($code: String!) {
    applyCouponCode(couponCode: $code) {
      ... on Order {
        ...OrderReturnValue
      }
    }
  }
`;

export const REMOVE_PROMOTION_CODE: DocumentNode = gql`
  ${ORDER_RETURN_VALUE}
  mutation RemoveCouponCode($code: String!) {
    removeCouponCode(couponCode: $code) {
      ... on Order {
        ...OrderReturnValue
      }
    }
  }
`;
