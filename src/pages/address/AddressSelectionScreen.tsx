import { useQuery } from '@apollo/client';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
} from 'react-native';
import Geocoder from 'react-native-geocoding';
import { Searchbar } from 'react-native-paper';
import { RESULTS } from 'react-native-permissions';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { KS_ICON, KsIcon } from '@assets/icons';
import theme from '@assets/theme/theme';
import { Box, Button, ButtonSize, ButtonType, ModalPopUp, PlaceHolder, ScreenWrapper, Text } from '@components';
import { STREET_NUMBER_REGEX } from '@constants';
import { useLocalizedData } from '@contexts';
import { GOOGLE_MAPS_API_KEY } from '@env';
import { ADDRESS_AUTO_COMPLETE, GET_CUSTOMER_ADDRESSES } from '@graphqlDocuments';
import { useDebounce, useNativePermissions, useToastNotification } from '@hooks';
import { AuthScreens, BasketScreens, CommonScreens, DashboardScreens, ProfileSettingsScreens } from '@routes/routes';
import {
  Address,
  AddressAutoCompletion,
  AutoCompleteQuery,
  AutoCompleteQueryVariables,
  GetCustomerAddressesQuery,
  KsNavigation,
} from '@types';
import { client, getCurrentPosition } from '@utils';
import { AddressSelected } from './components/AddressSelected';
import { AddressSuggestions } from './components/AddressSuggestions';

interface RouteParams {
  emailAddress?: string;
  address?: Address;
}

export const AddressSelectionScreen: React.FC = () => {
  Geocoder.init(GOOGLE_MAPS_API_KEY);

  const route: RouteProp<{ params: RouteParams }, 'params'> = useRoute();
  const navigation: KsNavigation = useNavigation();

  const { showInfoToast, showGeneralErrorToast } = useToastNotification();

  const insets = useSafeAreaInsets();

  const routeName = route.name as
    | ProfileSettingsScreens.ADDRESS_EDIT
    | ProfileSettingsScreens.ADDRESS_NEW
    | AuthScreens.ADDRESS_SELECTION_SCREEN
    | DashboardScreens.DELIVERY_ADDRESS_NEW
    | BasketScreens.ORDER_DELIVERY_ADDRESS_NEW;

  const { data: addressData } = useQuery<GetCustomerAddressesQuery>(GET_CUSTOMER_ADDRESSES);
  const address = route.params?.address;
  const addressId = address?.id;
  const initialAddressValue: string = address
    ? `${address?.streetLine1 ?? ''}, ${address?.postalCode ?? ''} ${address?.city ?? ''}, ${
        address?.country?.name ?? ''
      }`
    : '';

  const permissions = useNativePermissions();
  const { strings } = useLocalizedData();

  const [selectedAddress, setSelectedAddress] = useState<AddressAutoCompletion | null>(null);
  const [searchString, setSearchString] = useState(initialAddressValue ?? '');
  const [showAllowLocationPopup, setShowAllowLocationPopup] = useState(false);

  const [isFetchingDeviceLocation, setIsFetchingDeviceLocation] = useState(false);

  useEffect(() => {
    if (selectedAddress) {
      setSelectedAddress(null);
    }
  }, [searchString]);

  const searchInput = useRef<TextInput>(null);
  const [isSearchActive, setIsSearchActive] = useState(false);

  useEffect(() => {
    if (isSearchActive) {
      searchInput?.current?.focus();
    } else {
      searchInput?.current?.blur();
    }
  }, [isSearchActive]);

  const debounceSearch = useDebounce(searchString, 500);

  const { loading: isAddressSuggestionLoading, data: addressSuggestions } = useQuery<
    AutoCompleteQuery,
    AutoCompleteQueryVariables
  >(ADDRESS_AUTO_COMPLETE, {
    variables: { input: debounceSearch },
    skip: debounceSearch.length < 2,
  });

  const closeAllowLocationPopup = () => setShowAllowLocationPopup(false);

  const openSettings = async () => {
    closeAllowLocationPopup();
    await Linking.openSettings();
  };

  const changeAddress = () => {
    setSearchString('');
    setIsSearchActive(true);
  };

  const cancelSearch = () => {
    setSearchString(initialAddressValue ?? '');
    setIsSearchActive(false);
  };

  const getLocationAndSearch = async () => {
    const customLocation = await getCurrentPosition();
    const exactLocation = await Geocoder.from(customLocation.coords.latitude, customLocation.coords.longitude);
    const formattedAddress = exactLocation.results[0]?.formatted_address;
    if (formattedAddress) {
      setSearchString(formattedAddress);
    }
  };

  const requestAccess = async () => {
    const permissionsRequest = await permissions.locationPermissionRequest();
    if (permissionsRequest === RESULTS.GRANTED) {
      await getLocationAndSearch();
    }
  };

  const selectCurrentLocation = async () => {
    setIsFetchingDeviceLocation(true);
    try {
      const permissionsCheck = await permissions.locationPermissionCheck();
      switch (permissionsCheck) {
        case RESULTS.GRANTED:
          await getLocationAndSearch();
          break;
        case RESULTS.BLOCKED:
          setShowAllowLocationPopup(true);
          break;
        case RESULTS.DENIED:
          await requestAccess();
          break;
        default:
          break;
      }
    } catch (err) {
      showGeneralErrorToast();
    }
    setIsFetchingDeviceLocation(false);
  };

  const selectAddress = (data: AddressAutoCompletion) => {
    const newString: string = `${data.address?.postalCode ?? ''} ${data.address?.city ?? ''} ${
      data.address?.street ?? ''
    } ${data.address?.streetNumber ?? ''}`;

    if (!data.isInArea || (data.isInArea && data.address?.streetNumber)) {
      setIsSearchActive(false);
      setSelectedAddress(data);
      return;
    } else {
      showInfoToast(strings.address.houseNumberNeededNotification);
    }
    setIsSearchActive(true);
    setSearchString(newString);
  };

  const handleAddressSelection = () => {
    void client.refetchQueries({
      include: [GET_CUSTOMER_ADDRESSES],
    });

    switch (routeName) {
      case ProfileSettingsScreens.ADDRESS_EDIT:
      case ProfileSettingsScreens.ADDRESS_NEW:
        navigation.navigate(ProfileSettingsScreens.ADDRESS_LIST);
        break;
      case DashboardScreens.DELIVERY_ADDRESS_NEW:
        navigation.navigate(CommonScreens.DELIVERY_DATE_SELECTION_SCREEN);
        break;
      case BasketScreens.ORDER_DELIVERY_ADDRESS_NEW:
        navigation.navigate(BasketScreens.CHECKOUT);
        break;
      case AuthScreens.ADDRESS_SELECTION_SCREEN:
      default:
        break;
    }
  };

  const renderLoading = () => {
    if (!isFetchingDeviceLocation) {
      return null;
    }

    return (
      <Box justifyContent="center" flex={1}>
        <ActivityIndicator size={theme.spacing.s10} color={theme.colors.gray300} />
      </Box>
    );
  };

  const renderDefaultInfoComponent = () => {
    if (searchString || isFetchingDeviceLocation) {
      return null;
    }
    return (
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
          <PlaceHolder name={KS_ICON.LOCATION} content={[strings.address.deliveryAddressInfoText]} />
        </ScrollView>
      </KeyboardAvoidingView>
    );
  };

  const renderAddressSuggestionListComponent = () => {
    if (selectedAddress || !searchString || isFetchingDeviceLocation) {
      return null;
    }

    // Ensure that all entered street numbers are addes to the suggestions, even they are not returned.
    // This is needed since google has not all street numbers registered
    let additionalSuggestion: AddressAutoCompletion | null = null;
    const streetNumber = searchString.match(STREET_NUMBER_REGEX)?.reduce((a, b) => (a.length <= b.length ? a : b));

    if (streetNumber && streetNumber.length < 5 && addressSuggestions?.autoComplete[0]) {
      const containedStreetNumber = addressSuggestions?.autoComplete.find(
        (autoCompletion) => autoCompletion?.address?.streetNumber === streetNumber
      );

      if (!containedStreetNumber) {
        additionalSuggestion = {
          isInArea: addressSuggestions?.autoComplete[0].isInArea,
          address: { ...addressSuggestions?.autoComplete[0].address, streetNumber },
        };
      }
    }

    return (
      <AddressSuggestions
        addressSuggestions={
          additionalSuggestion
            ? [additionalSuggestion, ...(addressSuggestions?.autoComplete as AddressAutoCompletion[])]
            : (addressSuggestions?.autoComplete as AddressAutoCompletion[])
        }
        selectAddress={selectAddress}
        isLoading={isAddressSuggestionLoading || searchString.length === 1}
      />
    );
  };

  const renderAddressSelectedComponent = () => {
    if (!selectedAddress) {
      return null;
    }
    return (
      <AddressSelected
        changeAddress={changeAddress}
        emailAddress={route.params?.emailAddress}
        selectedAddress={selectedAddress}
        addressId={addressId}
        isDefaultAddress={
          (addressData?.activeCustomer?.addresses ?? []).length === 0 ||
          routeName === DashboardScreens.DELIVERY_ADDRESS_NEW ||
          routeName === BasketScreens.ORDER_DELIVERY_ADDRESS_NEW
        }
        onSubmit={handleAddressSelection}
      />
    );
  };

  const paddingBottom = routeName === AuthScreens.ADDRESS_SELECTION_SCREEN ? insets.bottom : 0;

  const renderContent = () => (
    <Box flex={1} paddingTop="s5" style={{ paddingBottom }} backgroundColor="background">
      <Box flexDirection="row" paddingHorizontal="s3">
        <Searchbar
          ref={searchInput}
          placeholder={strings.address.searchAddressPlaceholder}
          onChangeText={setSearchString}
          onFocus={() => setIsSearchActive(true)}
          onBlur={() => setIsSearchActive(false)}
          value={searchString}
          icon={({ color }) => <KsIcon name={KS_ICON.SEARCH_NORMAL_1} color={color} size={theme.spacing.s5} />}
          clearIcon={({ color }) => <KsIcon name={KS_ICON.CLOSE_CIRCLE} color={color} size={theme.spacing.s5} />}
          style={styles.searchBarStyle}
          inputStyle={styles.searchBarInputStyle}
          numberOfLines={1}
          selectionColor={theme.colors.defaultTextColor}
        />

        {isSearchActive ? (
          <Button
            marginLeft="s5"
            alignSelf="center"
            width="auto"
            size={ButtonSize.XS}
            type={ButtonType.GHOST_INVERTED}
            onPress={cancelSearch}
          >
            <Text color="defaultTextColor">{strings.cancel}</Text>
          </Button>
        ) : (
          <Button
            marginLeft="s5"
            align="center"
            width={theme.spacing.s10}
            size={ButtonSize.MD}
            type={ButtonType.OUTLINE}
            leadingIcon={<KsIcon name={KS_ICON.GPS} color={theme.colors.gray500} size={theme.spacing.s5} />}
            onPress={selectCurrentLocation}
          />
        )}
      </Box>

      {/*
        We need to consider three cases:
        1. The native location is loading
        1. searchTerm and selectedAddress are not given: Default info state
        2. search is started but no address selected yet: Address suggestions
        3. Address is selected and displayed
      */}
      {renderLoading()}
      {renderDefaultInfoComponent()}
      {renderAddressSuggestionListComponent()}
      {renderAddressSelectedComponent()}

      <ModalPopUp
        isVisible={showAllowLocationPopup}
        header={strings.address.cannotDetermineLocationModalTitle}
        text={strings.address.cannotDetermineLocationModalInfo}
        onClose={closeAllowLocationPopup}
      >
        <Button type={ButtonType.PRIMARY} onPress={openSettings}>
          {strings.address.shareLocation}
        </Button>
        <Button type={ButtonType.OUTLINE} onPress={closeAllowLocationPopup}>
          {strings.address.enterAddress}
        </Button>
      </ModalPopUp>
    </Box>
  );

  return routeName === AuthScreens.ADDRESS_SELECTION_SCREEN ? (
    <ScreenWrapper>{renderContent()}</ScreenWrapper>
  ) : (
    renderContent()
  );
};

const styles = StyleSheet.create({
  searchBarStyle: {
    backgroundColor: theme.colors.gray100,
    borderRadius: theme.radii.md,
    height: theme.spacing.s10,
    flex: 1,
    justifyContent: 'center',
    elevation: 0,
  },
  searchBarInputStyle: {
    height: theme.spacing.s10,
    alignSelf: 'center',
    paddingVertical: 0,
    textAlign: 'auto',
  },
});
