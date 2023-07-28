import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

import { BASE_COUNTRY } from './country.fragment';

export const BASE_ADDRESS: DocumentNode = gql`
  ${BASE_COUNTRY}
  fragment BaseAddress on Address {
    id
    fullName
    company
    streetLine1
    streetLine2
    city
    province
    postalCode
    country {
      ...BaseCountry
    }
    phoneNumber
    defaultShippingAddress
    defaultBillingAddress
  }
`;
