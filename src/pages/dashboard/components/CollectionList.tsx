import { useQuery } from '@apollo/client';
import React from 'react';

import { Box, HorizontalTileSkeleton } from '@components';
import { GET_COLLECTION_LIST } from '@graphqlDocuments/collection.graphql';
import { useToastNotification } from '@hooks';
import { Collection, RootCollectionsQuery } from '@types';
import { CollectionCard } from './CollectionCard';

const renderItem = (item: Collection) => <CollectionCard key={item.id} item={item} />;

export const CollectionList: React.FC = () => {
  const { showGeneralErrorToast } = useToastNotification();

  const { data, loading: isLoading } = useQuery<RootCollectionsQuery>(GET_COLLECTION_LIST, {
    notifyOnNetworkStatusChange: true,
    onError: () => {
      showGeneralErrorToast();
    },
  });

  return (
    <Box flex={1} flexDirection="row" flexWrap="wrap" justifyContent="center" marginLeft="s3" marginTop="s8">
      {isLoading ? (
        <HorizontalTileSkeleton />
      ) : (
        data?.rootCollections.items.map((item) => renderItem(item as Collection))
      )}
    </Box>
  );
};
