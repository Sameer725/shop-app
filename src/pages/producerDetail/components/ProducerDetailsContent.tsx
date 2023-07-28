import { useRoute } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { FlatList, StyleSheet } from 'react-native';

import theme from '@assets/theme/theme';
import { Box, ImageSlider, StickyCloseIcon, Text, useStickyHeader } from '@components';
import { Address, Asset, KsRoute, ProducerQuery } from '@types';
import { ProducerDescription } from './ProducerDescription';
import { ProducerInfoHeader } from './ProducerInfoHeader';
import { ProducerProducts } from './ProducerProducts';
import { ProducerTab, ProducerTabItem, ProducerTabs } from './ProducerTab';

interface ProducerDetailParam {
  producerId: string;
  activeTab: ProducerTabs;
}

interface Props {
  producerDetail: ProducerQuery;
}

const keyExtractor = (item: string) => item;
const content = ['content'];

export const ProducerDetailsContent: React.FC<Props> = (props) => {
  const route: KsRoute<ProducerDetailParam> = useRoute();
  const { producerDetail } = props;
  const isDetailShown = producerDetail?.producer?.hasDetailsPage;

  const mainInfoRef = React.useRef(null);
  const { StickyHeader, scrollHandler, setReferenceViewLayout } = useStickyHeader({
    alwaysDisplayed: !!producerDetail && !isDetailShown,
  });

  const renderContent = useCallback(() => {
    return (
      <>
        {isDetailShown && producerDetail?.producer?.assets?.length ? (
          <Box
            overflow="hidden"
            borderBottomEndRadius={theme.radii['2xl']}
            borderBottomStartRadius={theme.radii['2xl']}
          >
            <ImageSlider imagesList={producerDetail?.producer?.assets as Asset[]} style={styles.imageSliderStyles} />
          </Box>
        ) : null}
        <Box flex={1} marginTop="s8">
          {isDetailShown ? (
            <>
              <Box
                ref={mainInfoRef}
                onLayout={() => setReferenceViewLayout(mainInfoRef)}
                marginBottom="s8"
                paddingHorizontal="s3"
              >
                <ProducerInfoHeader
                  label={producerDetail?.producer?.name ?? ''}
                  distance={producerDetail?.producer?.distance ?? 0}
                />
              </Box>
              <ProducerTab initialTab={route?.params?.activeTab}>
                <ProducerTabItem name={ProducerTabs.DETAIL}>
                  <Box marginTop="s4" paddingHorizontal="s3">
                    <ProducerDescription
                      description={producerDetail?.producer?.description ?? ''}
                      address={producerDetail?.producer?.address as Address}
                    />
                  </Box>
                </ProducerTabItem>

                <ProducerTabItem name={ProducerTabs.PRODUCT}>
                  <ProducerProducts producerId={route.params?.producerId ?? ''} />
                </ProducerTabItem>
              </ProducerTab>
            </>
          ) : (
            <Box marginTop="s5">
              <ProducerProducts producerId={route.params?.producerId ?? ''} />
            </Box>
          )}
        </Box>
      </>
    );
  }, [isDetailShown, producerDetail?.producer?.id]);

  return (
    <>
      <FlatList
        data={content}
        showsVerticalScrollIndicator={false}
        keyExtractor={keyExtractor}
        style={{ backgroundColor: theme.colors.background }}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        renderItem={renderContent}
      />

      <StickyCloseIcon />
      <StickyHeader>
        <Box height={40} alignItems="center" justifyContent="center" marginBottom="s5">
          <Text variant="heading-sm">{producerDetail?.producer?.name}</Text>
        </Box>
      </StickyHeader>
    </>
  );
};

const styles = StyleSheet.create({
  imageSliderStyles: {
    height: 250,
  },
});
