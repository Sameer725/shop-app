import { gql } from '@apollo/client';
import { DocumentNode } from 'graphql';

export const ACTIVE_CUSTOMER_QUERY: DocumentNode = gql`
  query ActiveCustomer {
    activeCustomer {
      id
      firstName
      lastName
      emailAddress
      phoneNumber
      customFields {
        isOfLegalAge
        activeChannel {
          id
          token
          code
        }
      }
      user {
        authenticationMethods {
          strategy
        }
      }
    }
  }
`;

export const GET_CUSTOMER_GROUPS: DocumentNode = gql`
  query CustomerGroups {
    customerGroups {
      id
      name
    }
  }
`;

export const UPDATE_CUSTOMER: DocumentNode = gql`
  mutation UpdateCustomer($input: UpdateCustomerInput!) {
    updateCustomer(input: $input) {
      firstName
      lastName
      phoneNumber
      emailAddress
      customFields {
        isOfLegalAge
      }
    }
  }
`;

export const DELETE_CUSTOMER: DocumentNode = gql`
  mutation DeleteCustomer {
    deleteCustomer {
      result
      message
    }
  }
`;

export const CHECK_NEWSLETTER_SUBSCRIPTION: DocumentNode = gql`
  query CheckIsSubscribedToNewsletter {
    checkIsSubscribedToNewsletter
  }
`;

export const SUBSCRIBE_TO_NEWSLETTER: DocumentNode = gql`
  mutation SubscribeToNewsletter {
    subscribeToNewsletter
  }
`;

export const UNSUBSCRIBE_FROM_NEWSLETTER: DocumentNode = gql`
  mutation UnsubscribeFromNewsletter {
    unsubscribeFromNewsletter
  }
`;

export const UPDATE_PASSWORD: DocumentNode = gql`
  mutation UpdateCustomerPassword($currentPassword: String!, $newPassword: String!) {
    updateCustomerPassword(currentPassword: $currentPassword, newPassword: $newPassword) {
      ... on Success {
        success
      }
    }
  }
`;

export const UPDATE_EMAIL: DocumentNode = gql`
  mutation RequestUpdateCustomerEmailAddress($password: String!, $newEmailAddress: String!) {
    requestUpdateCustomerEmailAddress(password: $password, newEmailAddress: $newEmailAddress) {
      ... on Success {
        success
      }
    }
  }
`;
