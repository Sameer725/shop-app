import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import FastImage, { Source } from 'react-native-fast-image';

import PlaceHolderLogo from '@assets/img/placeHolderLogo.png';
import theme from '@assets/theme/theme';
import { Box, ShadowBox, Text } from '@components';
import { ReservedCollectionSlugs } from '@constants';
import { DashboardScreens, FavoritesScreens, Tabs } from '@routes/routes';
import { Collection, KsNavigation } from '@types';

interface Props {
  item: Collection;
}

export const CollectionCard: React.FC<Props> = (props) => {
  const navigation: KsNavigation = useNavigation();
  const { item } = props;

  const navigateToCollectionScreen = () => {
    if (item.slug === ReservedCollectionSlugs.FAVORITES) {
      navigation.navigate(Tabs.FAVORITES, {
        screen: FavoritesScreens.FAVORITES,
        initial: false,
      });
      return;
    }
    navigation.navigate(DashboardScreens.COLLECTION_OVERVIEW_SCREEN, {
      collectionName: item.name,
    });
  };

  return (
    <Box width={'33.33333%'}>
      <ShadowBox
        backgroundColor="white"
        alignItems="center"
        height={160}
        borderRadius={theme.radii.xl}
        containerViewStyle={{
          marginRight: theme.spacing.s3,
          marginBottom: theme.spacing.s5,
        }}
      >
        <Pressable onPress={navigateToCollectionScreen}>
          <Text
            variant="heading-2xs"
            marginTop="s4"
            textAlign="center"
            paddingHorizontal="s1"
            style={styles.text}
            lineBreakMode="tail"
            numberOfLines={2}
          >
            {item?.name}
          </Text>
          <Box>
            {item?.featuredAsset?.preview ? (
              <FastImage
                resizeMode="contain"
                source={{
                  uri: `${String(item.featuredAsset.preview)}?preset=small`,
                }}
                style={styles.image}
              />
            ) : (
              <FastImage source={PlaceHolderLogo as Source} style={[styles.placeHolderStyles]} resizeMode="contain" />
            )}
          </Box>
        </Pressable>
      </ShadowBox>
    </Box>
  );
};

const styles = StyleSheet.create({
  text: {
    minHeight: 30,
  },
  image: {
    marginTop: theme.spacing.s2,
    aspectRatio: 1,
    width: 100,
    overflow: 'hidden',
    maxWidth: 100,
    borderRadius: theme.radii.lg,
  },
  placeHolderStyles: {
    backgroundColor: theme.colors.gray050,
    marginTop: theme.spacing.s2,
    width: 100,
    height: 100,
    borderRadius: theme.radii.lg,
  },
});
