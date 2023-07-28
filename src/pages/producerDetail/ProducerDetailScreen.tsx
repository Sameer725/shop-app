import { useQuery } from '@apollo/client';
import { useRoute } from '@react-navigation/native';
import React from 'react';

import { DetailsScreenSkeleton, DetailsScreenSkeletonType, ScreenWrapper } from '@components';
import { GET_PRODUCER } from '@graphqlDocuments';
import { KsRoute, ProducerQuery, ProducerQueryVariables } from '@types';
import { ProducerTabs } from './components';
import { ProducerDetailsContent } from './components/ProducerDetailsContent';

interface ProducerDetailParam {
  producerId: string;
  activeTab: ProducerTabs;
}

export const ProducerDetailsScreen: React.FC = () => {
  const route: KsRoute<ProducerDetailParam> = useRoute();
  const { data: producerDetail, loading: isLoading } = useQuery<ProducerQuery, ProducerQueryVariables>(GET_PRODUCER, {
    variables: { id: route.params?.producerId },
  });

  return (
    <ScreenWrapper>
      {isLoading ? (
        <DetailsScreenSkeleton type={DetailsScreenSkeletonType.PRODUCER_DETAILS} />
      ) : (
        <ProducerDetailsContent producerDetail={producerDetail as ProducerQuery} />
      )}
    </ScreenWrapper>
  );
};
