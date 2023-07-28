import { gql } from '@apollo/client';
import { DocumentNode } from 'graphql';

import { BASE_ADDRESS } from '../graphqlFragments';

export const ADDRESS_AUTO_COMPLETE: DocumentNode = gql`
  query AutoComplete($input: String!) {
    autoComplete(input: $input) {
      isInArea
      address {
        countryCode
        name
        country
        city
        province
        postalCode
        street
        streetNumber
        placeId
        latitude
        longitude
      }
    }
  }
`;

export const CREATE_CUSTOMER_ADDRESS_MUTATION: DocumentNode = gql`
  mutation CreateCustomerAddress($input: CreateAddressInput!) {
    createCustomerAddress(input: $input) {
      id
      fullName
      streetLine1
      city
      postalCode
      country {
        code
      }
    }
  }
`;

export const GET_CUSTOMER_ADDRESSES: DocumentNode = gql`
  ${BASE_ADDRESS}
  query GetCustomerAddresses {
    activeCustomer {
      id
      addresses {
        ...BaseAddress
      }
    }
  }
`;

export const UPDATE_CUSTOMER_ADDRESS: DocumentNode = gql`
  ${BASE_ADDRESS}
  mutation UpdateCustomerAddress($input: UpdateAddressInput!) {
    updateCustomerAddress(input: $input) {
      id
      ...BaseAddress
    }
  }
`;

export const DELETE_CUSTOMER_ADDRESS: DocumentNode = gql`
  mutation DeleteCustomerAddress($id: ID!) {
    deleteCustomerAddress(id: $id) {
      success
    }
  }
`;
