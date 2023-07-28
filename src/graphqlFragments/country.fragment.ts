import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

export const BASE_COUNTRY: DocumentNode = gql`
  fragment BaseCountry on Country {
    id
    code
    name
  }
`;
