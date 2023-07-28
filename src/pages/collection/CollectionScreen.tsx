import React, { useCallback, useRef } from 'react';
import { FlatList, ListRenderItemInfo, ViewabilityConfigCallbackPairs, ViewToken } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';

import theme from '@assets/theme/theme';
import {
  Box,
  CollectionSkeleton,
  HTMLBaseStyleSize,
  HtmlReader,
  NextCollectionButton,
  SecondaryTopTabNavigation,
  TopTabNavigationScreenProps,
} from '@components';
import { CollectionDataSection, useCollection } from '@contexts';
import { Collection } from '@types';
import { MemoizedCollectionSection } from './components/CollectionSection';

const viewabilityConfig = { viewAreaCoveragePercentThreshold: 80, minimumViewTime: 50 };

const keyExtractor = (item: CollectionDataSection) => item.id;

const CollectionScreen = (props: TopTabNavigationScreenProps<Collection>) => {
  const { navigation, item } = props;

  const sectionListRef = useRef<FlatList>(null);

  const { collectionData } = useCollection();
  const activeIndex = useSharedValue<number>(0);
  const activeIndices = useSharedValue<true[]>([true, true]);

  const collection = collectionData[item.id];

  const onSubCollectionPress = ({ index }: { index: number }) => {
    sectionListRef.current?.scrollToIndex({ index });
  };

  const onViewableItemsChanged = useCallback(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems.length === 0) {
      return;
    }
    const index = viewableItems[viewableItems.length - 1].index ?? 0;

    activeIndex.value = index;
    updateArrays(index);
  }, []);

  const updateArrays = (index: number) => {
    activeIndices.value[index] = true;
    activeIndices.value[index + 1] = true;
    activeIndices.value[index + 2] = true;
    activeIndices.value = [...activeIndices.value];
  };

  const viewabilityConfigCallbackPairs = useRef<ViewabilityConfigCallbackPairs>([
    { viewabilityConfig, onViewableItemsChanged },
  ]);

  const renderSection = useCallback((section: ListRenderItemInfo<CollectionDataSection>) => {
    return (
      <MemoizedCollectionSection index={section.index} activeIndices={activeIndices} collectionSection={section.item} />
    );
  }, []);

  const renderFooter = () => {
    return <NextCollectionButton navigation={navigation} />;
  };

  const renderHeader = () => {
    return item?.description ? (
      <Box
        marginRight="s3"
        marginTop="s4"
        borderRadius={theme.radii['2xl']}
        paddingHorizontal="s4"
        backgroundColor="primary500"
      >
        <HtmlReader color="white" htmlString={item.description} baseStyleSize={HTMLBaseStyleSize.SMALL} />
      </Box>
    ) : null;
  };

  return collection ? (
    <Box flex={1}>
      <Box>
        {item?.children && item?.children?.length > 0 ? (
          <SecondaryTopTabNavigation
            data={item?.children}
            labelAccessor="name"
            activeIndex={activeIndex}
            onItemPress={onSubCollectionPress}
          />
        ) : null}
      </Box>

      <Box flex={1} flexGrow={1} paddingLeft="s3">
        <FlatList
          ref={sectionListRef}
          initialNumToRender={collection?.sections.length ?? 10}
          onScrollToIndexFailed={(info) => onSubCollectionPress({ index: info.highestMeasuredFrameIndex })}
          data={collection?.sections ?? []}
          ListHeaderComponent={renderHeader}
          ListFooterComponent={renderFooter}
          renderItem={renderSection}
          keyExtractor={keyExtractor}
          scrollEventThrottle={16}
          viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
          showsVerticalScrollIndicator={false}
        />
      </Box>
    </Box>
  ) : (
    <CollectionSkeleton />
  );
};

export const MemoizedCollectionScreen = React.memo(
  CollectionScreen,
  (prevValue, nextValue) => prevValue.item === nextValue.item
);
