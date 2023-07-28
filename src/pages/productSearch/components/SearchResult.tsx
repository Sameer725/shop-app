import React, { Dispatch, SetStateAction } from 'react';
import { TextInput } from 'react-native';

import { ProductTileList } from '@components';
import { ProductVariantDocument } from '@types';
import { NoSearchResult } from './NoSearchResult';

interface SearchResultProps {
  items: ProductVariantDocument[];
  setSearchString: Dispatch<SetStateAction<string>>;
  searchInputRef: React.RefObject<TextInput>;
  searchString: string;
}

export const SearchResult: React.FC<SearchResultProps> = (props) => {
  const { items, setSearchString, searchInputRef, searchString } = props;

  const noResults = (!items || items?.length === 0) && searchString;

  if (noResults) {
    return <NoSearchResult setSearchString={setSearchString} searchInputRef={searchInputRef} />;
  }

  return <ProductTileList items={items} />;
};
