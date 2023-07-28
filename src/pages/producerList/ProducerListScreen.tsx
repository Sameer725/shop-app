import { useQuery } from '@apollo/client';
import React, { useRef } from 'react';
import { FlatList, ViewToken } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';

import {
  Box,
  NextCollectionButton,
  ProducersSkeleton,
  SecondaryTopTabNavigation,
  TopTabNavigationScreenProps,
} from '@components';
import { GET_PRODUCER_LIST } from '@graphqlDocuments';
import { Producer, ProducersQuery } from '@types';
import { ProducerSection } from './components';

const viewabilityConfig = {
  itemVisiblePercentThreshold: 60,
};

export const ProducerListScreen: React.FC<TopTabNavigationScreenProps<undefined>> = (
  props: TopTabNavigationScreenProps<undefined>
) => {
  const { navigation } = props;
  const activeIndex = useSharedValue<number>(0);

  const producersRef = useRef<FlatList<Producer>>(null);

  const { data, loading: isLoading } = useQuery<ProducersQuery>(GET_PRODUCER_LIST);

  const onSubCollectionPress = ({ index }: { index: number }) => {
    producersRef.current?.scrollToIndex({ index });
  };

  const onViewableItemsChanged = React.useCallback(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems[0]) {
      activeIndex.value = viewableItems[0].index as number;
    }
  }, []);

  const viewabilityConfigCallbackPairs = useRef([{ viewabilityConfig, onViewableItemsChanged }]);

  const renderFooter = () => (
    <Box marginLeft="s3">
      <NextCollectionButton navigation={navigation} />
    </Box>
  );

  return (
    <Box flex={1}>
      {isLoading || data?.producers?.items?.length === 0 ? (
        <ProducersSkeleton />
      ) : (
        <>
          <Box>
            <SecondaryTopTabNavigation
              data={(data?.producers?.items as Producer[]) ?? []}
              labelAccessor="name"
              activeIndex={activeIndex}
              onItemPress={onSubCollectionPress}
            />
          </Box>

          <Box flex={1} flexGrow={1}>
            <FlatList
              showsVerticalScrollIndicator={false}
              initialNumToRender={data?.producers?.items.length ?? 10}
              onScrollToIndexFailed={(info) => onSubCollectionPress({ index: info.highestMeasuredFrameIndex })}
              data={(data?.producers?.items as Producer[]) ?? []}
              renderItem={({ item }) => <ProducerSection producer={item} />}
              keyExtractor={(item) => item.id}
              ref={producersRef}
              ListFooterComponent={renderFooter}
              viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
            />
          </Box>
        </>
      )}
    </Box>
  );
};
