import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import theme from '@assets/theme/theme';
import { Box } from '../Box';
import { HorizontalTileSkeleton } from '../HorizontalTileSkeleton';

export const AddressCardSkeleton = () => (
  <SkeletonPlaceholder>
    <SkeletonPlaceholder.Item
      borderRadius={theme.radii['2xl']}
      height={120}
      marginHorizontal={theme.spacing.s3}
      marginTop={theme.spacing.s8}
    />
  </SkeletonPlaceholder>
);

export const AddressSkeleton = () => (
  <SkeletonPlaceholder>
    <SkeletonPlaceholder.Item
      width={200}
      height={24}
      borderRadius={theme.radii.md}
      marginHorizontal={theme.spacing.s3}
      marginTop={theme.spacing.s3}
    />
  </SkeletonPlaceholder>
);

export const ButtonSkeleton = () => (
  <SkeletonPlaceholder>
    <SkeletonPlaceholder.Item
      borderRadius={theme.radii.md}
      height={theme.spacing.s12}
      marginHorizontal={theme.spacing.s3}
      marginTop={theme.spacing.s8}
    />
  </SkeletonPlaceholder>
);

export const HeaderImageSkeleton = () => {
  return (
    <SkeletonPlaceholder>
      <SkeletonPlaceholder.Item
        height={250}
        borderBottomLeftRadius={theme.radii['2xl']}
        borderBottomRightRadius={theme.radii['2xl']}
      />
    </SkeletonPlaceholder>
  );
};

export const IngredientsSkeleton = () => (
  <SkeletonPlaceholder>
    <SkeletonPlaceholder.Item marginHorizontal={theme.spacing.s3}>
      <SkeletonPlaceholder.Item
        borderRadius={theme.radii.md}
        height={theme.spacing.s6}
        marginTop={theme.spacing.s8}
        width={240}
      />
      <SkeletonPlaceholder.Item marginTop={theme.spacing.s4}>
        {[30, 40, 64, 50, 36, 42].map((item) => (
          <SkeletonPlaceholder.Item
            key={`item-${item}`}
            borderRadius={theme.radii.md}
            height={18}
            marginTop={theme.spacing.s2}
            width={`${item}%`}
          />
        ))}
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder.Item>
  </SkeletonPlaceholder>
);

export const PreparationSkeleton = () => (
  <SkeletonPlaceholder>
    <SkeletonPlaceholder.Item marginHorizontal={theme.spacing.s3}>
      <SkeletonPlaceholder.Item
        borderRadius={theme.radii.md}
        height={theme.spacing.s6}
        marginTop={theme.spacing.s8}
        width={240}
      />
      <SkeletonPlaceholder.Item>
        {[3, 5, 2].map((item, index) => (
          <SkeletonPlaceholder.Item key={index} marginTop={theme.spacing.s4}>
            {Array(item)
              .fill(null)
              .map((itm: null, i: number, arr: null[]) => {
                if (arr.length - 1 === i) {
                  return (
                    <SkeletonPlaceholder.Item
                      key={i}
                      borderRadius={theme.radii.md}
                      height={18}
                      marginTop={theme.spacing.s2}
                      width="80%"
                    />
                  );
                }
                return (
                  <SkeletonPlaceholder.Item
                    key={i}
                    borderRadius={theme.radii.md}
                    height={18}
                    marginTop={theme.spacing.s2}
                    width="auto"
                  />
                );
              })}
          </SkeletonPlaceholder.Item>
        ))}
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder.Item>
  </SkeletonPlaceholder>
);

export const ProducerDetailsSkeleton = () => (
  <SkeletonPlaceholder>
    <SkeletonPlaceholder.Item marginHorizontal={theme.spacing.s3} marginTop={theme.spacing.s8}>
      {Array(8)
        .fill(null)
        .map((item: null, index: number, arr: null[]) => {
          if (arr.length - 1 === index) {
            return (
              <SkeletonPlaceholder.Item
                key={index}
                borderRadius={theme.radii.md}
                height={18}
                marginTop={theme.spacing.s2}
                width="80%"
              />
            );
          }
          return (
            <SkeletonPlaceholder.Item
              key={`item-${index}`}
              borderRadius={theme.radii.md}
              height={18}
              marginTop={theme.spacing.s2}
              width={'100%'}
            />
          );
        })}
    </SkeletonPlaceholder.Item>
    <SkeletonPlaceholder.Item
      borderRadius={theme.radii.md}
      height={18}
      marginHorizontal={theme.spacing.s3}
      marginTop={theme.spacing.s8}
      width={250}
    />
  </SkeletonPlaceholder>
);

export const ProductDetailsSkeleton = () => (
  <SkeletonPlaceholder>
    <SkeletonPlaceholder.Item
      borderRadius={theme.radii['2xl']}
      height={180}
      marginHorizontal={theme.spacing.s3}
      marginTop={theme.spacing.s8}
    />
  </SkeletonPlaceholder>
);

export const ProductPriceSkeleton = () => (
  <SkeletonPlaceholder>
    <SkeletonPlaceholder.Item marginHorizontal={theme.spacing.s3}>
      <SkeletonPlaceholder.Item borderRadius={theme.radii.md} height={24} marginTop={theme.spacing.s6} width={150} />
      <SkeletonPlaceholder.Item borderRadius={theme.radii.md} height={18} marginTop={theme.spacing.s1} width={210} />
      <SkeletonPlaceholder.Item borderRadius={theme.radii.md} height={18} marginTop={theme.spacing.s1} width={100} />
    </SkeletonPlaceholder.Item>
  </SkeletonPlaceholder>
);

export const ProductsWithHeadingSkeleton = () => (
  <>
    <SkeletonPlaceholder>
      <SkeletonPlaceholder.Item marginHorizontal={theme.spacing.s3}>
        <SkeletonPlaceholder.Item borderRadius={theme.radii.md} height={24} marginTop={theme.spacing.s8} width={240} />
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
    <Box flex={1} flexDirection="row" flexWrap="wrap" marginLeft="s3" marginTop="s4">
      <HorizontalTileSkeleton cardCount={6} height={210} />
    </Box>
  </>
);

export const ProductsSkeleton = () => (
  <Box flexGrow={1} flexDirection="row" flexWrap="wrap" marginLeft="s3" marginTop="s8">
    <HorizontalTileSkeleton cardCount={6} height={210} />
  </Box>
);

export const TagsSkeleton = () => (
  <SkeletonPlaceholder>
    <SkeletonPlaceholder.Item
      flexDirection="row"
      alignItems="center"
      marginHorizontal={theme.spacing.s3}
      marginTop={theme.spacing.s3}
    >
      {Array(2)
        .fill(null)
        .map((item: null, index: number) => {
          return (
            <SkeletonPlaceholder.Item
              key={`index-${index}`}
              borderRadius={theme.radii.md}
              height={32}
              marginRight={theme.spacing.s3}
              width={100}
            />
          );
        })}
    </SkeletonPlaceholder.Item>
  </SkeletonPlaceholder>
);

export const TitleSkeleton = () => (
  <SkeletonPlaceholder>
    <SkeletonPlaceholder.Item
      height={24}
      borderRadius={theme.radii.md}
      marginHorizontal={theme.spacing.s3}
      marginTop={theme.spacing.s8}
    />
  </SkeletonPlaceholder>
);
