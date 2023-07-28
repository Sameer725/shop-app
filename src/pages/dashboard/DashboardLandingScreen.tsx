import { useQuery } from '@apollo/client';
import { useLinkTo, useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import theme from '@assets/theme/theme';
import { HorizontalSlider, ScreenWrapper } from '@components';
import { GET_SPECIALS_QUERY } from '@graphqlDocuments';
import { DashboardScreens } from '@routes/routes';
import { KsNavigation, Special } from '@types';
import { openLink } from '@utils';
import { CollectionList } from './components/CollectionList';
import { DeliveryAddressCard } from './components/DeliveryAddressCard';
import SpecialSliderCard, { SpecialSliderCardProps } from './components/SpecialSliderCard';
import { WelcomeHeader } from './components/WelcomeHeader';

const ITEM_OFFSET = theme.spacing.s14;

export const DashboardLandingScreen = () => {
  const { data: specials, loading: isLoading } = useQuery<{ specials: { items: Special[] } }>(GET_SPECIALS_QUERY, {
    notifyOnNetworkStatusChange: true,
  });
  const linkTo = useLinkTo();
  const { width } = useWindowDimensions();
  const navigation: KsNavigation = useNavigation();

  // If not defined, the parent would try to adjust the children within itself and the layout will be broken.
  // The 2* ITEM_OFFSET is subtracted from the width in order to make the item symmetric in both  of the screen
  const itemWidth = width - 2 * ITEM_OFFSET;

  const onSpecialItemPress = (item: Special) => {
    if (item?.internalLink?.includes('special')) {
      navigation.navigate(DashboardScreens.SPECIAL_DETAILS_SCREEN, { specialId: item.id });
      return;
    }

    const link = (item.externalLink ? item.externalLink : item.internalLink) ?? '';

    if (item.internalLink) {
      return linkTo(`/${link}`);
    }

    void openLink(link);
  };

  const renderItem = (props: SpecialSliderCardProps) => (
    <SpecialSliderCard {...props} width={itemWidth} onPress={onSpecialItemPress} />
  );

  return (
    <ScreenWrapper>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: theme.spacing.s8, paddingBottom: theme.spacing.s3 }}
      >
        <WelcomeHeader />
        <HorizontalSlider
          itemWidth={itemWidth}
          skeletonHeight={180}
          data={specials?.specials.items ?? []}
          keyExtractor={(item, index) => `card-${item.id}-${index}`}
          indicatorKeyExtractor={(item) => `indicator-${item.id}`}
          renderItem={renderItem}
          contentContainerStyle={styles.contentContainer}
          loadingStyle={styles.sliderLoading}
          style={{ flex: 1 }}
          indicatorPosition="outside"
          isLoading={isLoading}
        />
        <DeliveryAddressCard />
        <CollectionList />
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: ITEM_OFFSET,
    paddingVertical: theme.spacing.s2,
    marginTop: theme.spacing.s8,
  },
  sliderLoading: {
    marginTop: theme.spacing.s10,
  },
});
