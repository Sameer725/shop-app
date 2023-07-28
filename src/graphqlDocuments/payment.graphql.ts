import { gql } from '@apollo/client';
import { DocumentNode } from 'graphql';

export const GET_SAVED_PAYMENT_METHODS: DocumentNode = gql`
  query SavedPaymentMethods($type: String) {
    savedPaymentMethods(type: $type) {
      id
      billing_details {
        name
      }
      card {
        brand
        exp_month
        exp_year
        last4
      }
      sepa_debit {
        country
        last4
      }
      type
    }
  }
`;

export const DELETE_PAYMENT_METHOD: DocumentNode = gql`
  mutation DeleteSavedPaymentMethod($paymentMethodId: String!) {
    deleteSavedPaymentMethod(paymentMethodId: $paymentMethodId)
  }
`;
