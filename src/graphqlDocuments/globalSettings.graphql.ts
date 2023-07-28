import { gql } from '@apollo/client';
import { DocumentNode } from 'graphql';

export const GET_FRESH_PRODUCT_RESTOCK_TIME: DocumentNode = gql`
  query FreshProductRestockTime {
    freshProductRestockTime
  }
`;
