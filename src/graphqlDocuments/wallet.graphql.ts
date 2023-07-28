import { gql } from '@apollo/client';
import { DocumentNode } from 'graphql';

import { ORDER_CUSTOM_FIELDS } from '../graphqlFragments';

export const GET_WALLET_TOTAL: DocumentNode = gql`
  query GetWalletTotal {
    wallet {
      id
      payoutTotal
      nonPayoutTotal
    }
  }
`;

export const GET_WALLET_DETAILS: DocumentNode = gql`
  query GetWalletDetails {
    wallet {
      id
      payoutTotal
      nonPayoutTotal
      walletItems {
        id
        createdAt
        description
        activity
        total
        isPayoutPossible
      }
    }
  }
`;

export const ADD_GIFT_COUPON_TO_WALLET: DocumentNode = gql`
  mutation AddGiftCouponToWallet($code: String!) {
    addGiftCouponToWallet(giftCouponCode: $code) {
      __typename
    }
  }
`;

export const REQUEST_PAYOUT: DocumentNode = gql`
  mutation RequestPayout($amount: Int!) {
    requestWalletPayout(amount: $amount)
  }
`;

export const APPLY_WALLET_TOTAL: DocumentNode = gql`
  ${ORDER_CUSTOM_FIELDS}
  mutation ApplyWalletTotal {
    applyWalletTotal {
      id
      customFields {
        ...OrderCustomFields
      }
    }
  }
`;

export const REMOVE_WALLET_TOTAL: DocumentNode = gql`
  ${ORDER_CUSTOM_FIELDS}
  mutation RemoveWalletTotal {
    removeWalletTotal {
      id
      customFields {
        ...OrderCustomFields
      }
    }
  }
`;
