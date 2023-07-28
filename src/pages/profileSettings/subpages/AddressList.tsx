import { useQuery } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList, ListRenderItem, StyleSheet } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import { KS_ICON } from '@assets/icons';
import theme from '@assets/theme/theme';
import { Box, Button, PlaceHolder } from '@components';
import { useLocalizedData } from '@contexts';
import { GET_CUSTOMER_ADDRESSES } from '@graphqlDocuments';
import { ProfileSettingsScreens } from '@routes/routes';
import { Address, GetCustomerAddressesQuery, KsNavigation } from '@types';
import { AddressListItem } from './components/AddressListItem';

const SKELETON_BLOCK_HEIGHTS: number[] = [72, 40, 40];

export const AddressListScreen: React.FC = () => {
  const { data, refetch, loading } = useQuery<GetCustomerAddressesQuery>(GET_CUSTOMER_ADDRESSES, {
    notifyOnNetworkStatusChange: true,
  });
  const { strings } = useLocalizedData();
  const navigation: KsNavigation = useNavigation();

  const renderItem: ListRenderItem<Address> = ({ item: address }) => (
    <AddressListItem address={address} onUpdate={refetch} />
  );

  const addNewAddress = () => {
    navigation.navigate(ProfileSettingsScreens.ADDRESS_NEW);
  };

  const LoadingState = () => (
    <SkeletonPlaceholder>
      <Box style={styles.list}>
        {SKELETON_BLOCK_HEIGHTS.map((height, index) => (
          <SkeletonPlaceholder.Item
            key={index}
            borderRadius={theme.radii.xl}
            height={height}
            width="100%"
            marginBottom={theme.spacing.s2}
          />
        ))}
      </Box>
    </SkeletonPlaceholder>
  );

  const EmptyState = () => (
    <PlaceHolder
      name={KS_ICON.LOCATION}
      title={strings.profileSettings.addresses.noAddressHeader}
      content={[strings.profileSettings.addresses.noAddressText]}
    />
  );

  return (
    <>
      <Box flex={1}>
        {!data && loading ? <LoadingState /> : null}

        {!data?.activeCustomer?.addresses && !loading ? (
          <EmptyState />
        ) : (
          <FlatList
            data={data?.activeCustomer?.addresses as Address[]}
            keyExtractor={(address) => address.id}
            renderItem={renderItem}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
          />
        )}
      </Box>

      <Button onPress={addNewAddress} marginHorizontal="s3" marginBottom="s8">
        {strings.profileSettings.addresses.addNewAddress}
      </Button>
    </>
  );
};

const styles = StyleSheet.create({
  list: {
    paddingBottom: theme.spacing.s6,
    paddingHorizontal: theme.spacing.s3,
    paddingTop: theme.spacing.s5,
  },
});
