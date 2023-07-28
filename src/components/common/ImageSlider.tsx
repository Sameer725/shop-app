import React, { useCallback } from 'react';
import {
  ImageBackground,
  ImageResizeMode,
  ImageSourcePropType,
  StyleProp,
  StyleSheet,
  useWindowDimensions,
  ViewStyle,
} from 'react-native';
import FastImage, { Source } from 'react-native-fast-image';

import PlaceHolderLogo from '@assets/img/placeHolderLogo.png';
import theme from '@assets/theme/theme';
import { Asset } from '@types';
import { HorizontalSlider } from './HorizontalSlider';

interface Props {
  imagesList: Asset[];
  style: StyleProp<ViewStyle>;
  resizeMode?: ImageResizeMode;
}

interface ItemProps {
  item: Asset;
}

const keyExtractor = (item: ItemProps['item'], index: number) => {
  return `card-${item?.id}-${index}`;
};

const indicatorKeyExtractor = (item: ItemProps['item'], index: number) => {
  return `indicator-${item?.id}-${index}`;
};

const ImageSlider: React.FC<Props> = (props) => {
  const { imagesList, style, resizeMode = 'cover' } = props;

  const { width } = useWindowDimensions();

  const renderItem = useCallback(
    ({ item }: ItemProps) => (
      <ImageBackground
        style={{
          ...styles.imageSliderStyles,
          width,
          backgroundColor: item.source ? theme.colors.white : theme.colors.gray100,
        }}
        resizeMode={resizeMode}
        source={item.source ? { uri: item.source } : (PlaceHolderLogo as ImageSourcePropType)}
      />
    ),
    []
  );

  return imagesList?.length === 0 ? (
    <FastImage
      source={PlaceHolderLogo as Source}
      style={{
        ...styles.placeHolderStyles,
        width,
      }}
      resizeMode="center"
    />
  ) : (
    <HorizontalSlider
      indicatorPosition="inside"
      itemWidth={width}
      skeletonHeight={180}
      data={imagesList ?? []}
      keyExtractor={keyExtractor}
      indicatorKeyExtractor={indicatorKeyExtractor}
      renderItem={renderItem}
      style={style}
    />
  );
};

const memoizedImageSlider = React.memo(ImageSlider);

const styles = StyleSheet.create({
  imageSliderStyles: {
    overflow: 'hidden',
    borderBottomEndRadius: theme.spacing.s4,
    borderBottomStartRadius: theme.spacing.s4,
  },
  placeHolderStyles: {
    backgroundColor: theme.colors.gray100,
    borderBottomLeftRadius: theme.spacing.s4,
    borderBottomRightRadius: theme.spacing.s4,
    height: 250,
  },
});

export { memoizedImageSlider as ImageSlider };
