import React from 'react';
import { ActivityIndicator, FlatList, KeyboardAvoidingView, Platform, Pressable, StyleSheet } from 'react-native';

import { KS_ICON } from '@assets/icons';
import theme from '@assets/theme/theme';
import { Box, PlaceHolder } from '@components';
import { useLocalizedData } from '@contexts';
import { AddressAutoCompletion } from '@types';
import { AddressItem } from './AddressItem';

interface Props {
  addressSuggestions: AddressAutoCompletion[];
  selectAddress: (item: AddressAutoCompletion) => void;
  isLoading: boolean;
}

export const AddressSuggestions: React.FC<Props> = (props) => {
  const { addressSuggestions, selectAddress, isLoading } = props;
  const { strings } = useLocalizedData();

  const renderSuggestionsListItem = ({ item }: { item: AddressAutoCompletion }) => (
    <Pressable onPress={() => selectAddress(item)}>
      <Box flexDirection="row" style={styles.suggestionItemStyle}>
        <AddressItem
          isInArea={item.isInArea ?? false}
          city={item.address?.city}
          country={item.address?.country}
          street={item.address?.street}
          streetNumber={item.address?.streetNumber}
        />
      </Box>
    </Pressable>
  );

  const emptyStateComponent = () => (
    <PlaceHolder name={KS_ICON.SEARCH_NORMAL_1} content={[strings.address.addressNotFound]} />
  );
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
      {isLoading ? (
        <Box flex={1} justifyContent="center">
          <ActivityIndicator size={40} color={theme.colors.gray300} />
        </Box>
      ) : (
        <Box marginVertical="s5" flex={1} paddingHorizontal="s3">
          <FlatList
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ flexGrow: 1 }}
            data={addressSuggestions ?? []}
            keyExtractor={(item, index) => `${String(item?.address?.placeId)}-${String(index)}`}
            renderItem={renderSuggestionsListItem}
            ListEmptyComponent={emptyStateComponent}
            showsVerticalScrollIndicator={false}
          />
        </Box>
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  emptyImage: {
    width: 160,
    height: 160,
  },
  suggestionItemStyle: {
    borderBottomWidth: theme.borderWidth.b1,
    borderBottomColor: theme.colors.gray300,
    paddingVertical: theme.spacing.s4,
  },
});
