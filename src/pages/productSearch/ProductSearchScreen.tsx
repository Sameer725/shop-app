import { useQuery } from '@apollo/client';
import React, { useRef, useState } from 'react';
import { Keyboard, ScrollView, StyleSheet, TextInput } from 'react-native';
import { Searchbar } from 'react-native-paper';

import { KS_ICON, KsIcon } from '@assets/icons';
import theme from '@assets/theme/theme';
import { Box, ScreenWrapper, ShadowBox, ShadowType, StatusBarType } from '@components';
import { useLocalizedData } from '@contexts';
import { SEARCH_PRODUCTS } from '@graphqlDocuments';
import { useDebounce } from '@hooks';
import { ProductVariantDocument, SearchProductsQuery, SearchProductsQueryVariables } from '@types';
import { PopularSearches } from './components/PopularSearches';
import { SearchLoadingIndicator } from './components/SearchLoadingIndicator';
import { SearchResult } from './components/SearchResult';

const SPACING_FOR_SHADOW = theme.spacing.s2;

const closeKeyboard = () => {
  Keyboard.dismiss();
};

export const ProductSearchScreen: React.FC = () => {
  const { strings } = useLocalizedData();
  const [searchString, setSearchString] = useState('');
  const searchInput = useRef<TextInput>(null);

  const debounceSearch = useDebounce(searchString, 500);

  const { loading: isLoading, data: products } = useQuery<SearchProductsQuery, SearchProductsQueryVariables>(
    SEARCH_PRODUCTS,
    {
      variables: { query: debounceSearch },
      skip: searchString.trim().length <= 2,
      fetchPolicy: 'no-cache',
    }
  );

  return (
    <ScreenWrapper statusBarType={StatusBarType.WHITE_DARK}>
      <Box
        backgroundColor="background"
        // The Box with paddingBottom is needed to display the shadow correctly, otherwise it would be cut-off
        style={{ paddingBottom: SPACING_FOR_SHADOW }}
      >
        <ShadowBox type={ShadowType.BASE} backgroundColor="white">
          <Box flexDirection="row">
            <Searchbar
              placeholder={strings.search.searchForProduct}
              value={searchString}
              onChangeText={setSearchString}
              icon={({ color }) => <KsIcon name={KS_ICON.SEARCH_NORMAL_1} color={color} size={theme.spacing.s5} />}
              clearIcon={({ color }) => (
                <KsIcon name={KS_ICON.CLOSE_CIRCLE} bold color={color} size={theme.spacing.s5} />
              )}
              style={styles.searchBarStyle}
              inputStyle={styles.searchBarInputStyle}
              numberOfLines={1}
              ref={searchInput}
            />
          </Box>
        </ShadowBox>
      </Box>

      <Box backgroundColor="background" flex={1}>
        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
          onScroll={closeKeyboard}
          scrollEventThrottle={16}
        >
          {isLoading ? (
            <SearchLoadingIndicator />
          ) : products || searchString.trim().length > 2 ? (
            <SearchResult
              searchString={debounceSearch}
              items={products?.searchProducts?.items as ProductVariantDocument[]}
              setSearchString={setSearchString}
              searchInputRef={searchInput}
            />
          ) : (
            <PopularSearches setSearchString={setSearchString} />
          )}
        </ScrollView>
      </Box>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: theme.colors.background,
    // Equalize the margin-bottom of the header, that is needed to display the shadow correctly
    marginTop: -SPACING_FOR_SHADOW,
    marginBottom: theme.spacing.s3,
  },
  searchBarStyle: {
    backgroundColor: theme.colors.gray100,
    borderRadius: theme.radii.md,
    elevation: 0,
    flex: 1,
    height: theme.spacing.s10,
    justifyContent: 'center',
    margin: theme.spacing.s3,
  },
  searchBarInputStyle: {
    alignSelf: 'center',
    backgroundColor: theme.colors.gray100,
    height: theme.spacing.s10,
    paddingVertical: 0,
  },
});
