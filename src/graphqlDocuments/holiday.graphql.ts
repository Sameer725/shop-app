import { gql } from '@apollo/client';
import { DocumentNode } from 'graphql';

export const GET_PUBLIC_HOLIDAYS: DocumentNode = gql`
  query PublicHolidays($options: HolidayQueryOptions) {
    publicHolidays(options: $options) {
      id
      startsAt
      endsAt
      isFullDay
    }
  }
`;
