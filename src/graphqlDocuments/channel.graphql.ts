import { gql } from '@apollo/client';
import { DocumentNode } from 'graphql';

export const GET_CHANNELS_QUERY: DocumentNode = gql`
  query Channels {
    channels {
      id
      code
      token
    }
  }
`;

export const ACTIVE_CHANNEL_QUERY: DocumentNode = gql`
  query ActiveChannel {
    activeChannel {
      id
      code
    }
  }
`;
