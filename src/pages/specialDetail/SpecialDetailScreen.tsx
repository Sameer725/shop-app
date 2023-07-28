import { useQuery } from '@apollo/client';
import { useRoute } from '@react-navigation/native';
import React from 'react';
import Animated from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import theme from '@assets/theme/theme';
import { Box, FocusAwareStatusBar, HtmlReader, ProductTileList, SpecialCard, StickyCloseIcon } from '@components';
import { GET_SPECIAL_QUERY } from '@graphqlDocuments';
import { KsRoute, ProductVariant, Special, SpecialQuery, SpecialQueryVariables } from '@types';

interface SpecialDetailParam {
  specialId: string;
}

export const SpecialDetailScreen: React.FC = () => {
  const route: KsRoute<SpecialDetailParam> = useRoute();
  const insets = useSafeAreaInsets();

  const { data } = useQuery<SpecialQuery, SpecialQueryVariables>(GET_SPECIAL_QUERY, {
    variables: { id: route.params?.specialId },
  });

  return data?.special ? (
    <>
      <FocusAwareStatusBar barStyle="dark-content" backgroundColor={theme.colors.white} />

      <Box backgroundColor="background" flex={1}>
        <Animated.ScrollView
          showsVerticalScrollIndicator={false}
          style={{ marginTop: insets.top, backgroundColor: theme.colors.background }}
          scrollEventThrottle={16}
        >
          <Box
            flex={1}
            height={250}
            borderBottomEndRadius={theme.spacing.s4}
            borderBottomStartRadius={theme.spacing.s4}
            overflow="hidden"
          >
            <SpecialCard contentCentered special={data?.special as Special} />
          </Box>
          <Box paddingHorizontal="s3">
            <HtmlReader htmlString={data?.special?.description ?? ''} />
          </Box>
          <Box marginBottom="s8">
            <ProductTileList items={data?.special?.productVariants as ProductVariant[]} />
          </Box>
        </Animated.ScrollView>
        <StickyCloseIcon />
      </Box>
    </>
  ) : null;
};
