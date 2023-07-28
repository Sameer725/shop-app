import { useMutation } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { TextInput as TextInputProp } from 'react-native';
import { TextInput } from 'react-native-paper';

import { KS_ICON } from '@assets/icons';
import { Button, ButtonType, ModalPopUp, PlaceHolder } from '@components';
import { useLocalizedData } from '@contexts';
import { useAppContext } from '@contexts/AppContext';
import { SUGGEST_PRODUCT } from '@graphqlDocuments';
import { useToastNotification } from '@hooks';
import { DashboardScreens } from '@routes/routes';
import { KsNavigation, MutationCreateProductSuggestionArgs } from '@types';

interface NoSearchResultProps {
  setSearchString: Dispatch<SetStateAction<string>>;
  searchInputRef: React.RefObject<TextInputProp>;
}

export const NoSearchResult: React.FC<NoSearchResultProps> = (props) => {
  const { setSearchString, searchInputRef } = props;
  const { strings } = useLocalizedData();
  const { appData, dispatchUpdateApp } = useAppContext();
  const navigation: KsNavigation = useNavigation();
  const { showGeneralErrorToast } = useToastNotification();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSuggestionSuccessModalVisible, setIsSuggestionSuccessModalVisible] = useState(false);

  const closeModal = () => {
    setIsSuggestionSuccessModalVisible(false);
    setIsModalVisible(false);
  };

  const openModal = () => {
    setIsSuggestionSuccessModalVisible(false);
    setIsModalVisible(true);
  };

  const handleTextChange = (text: string) => {
    dispatchUpdateApp({ productSuggestions: text });
  };

  const onNewSearch = () => {
    setSearchString('');
    searchInputRef.current?.focus();
  };

  const onNavigateToHome = () => {
    setSearchString('');
    closeModal();

    navigation.navigate(DashboardScreens.DASHBOARD_LANDING_SCREEN);
  };

  const [suggestProduct, { loading: isLoading }] = useMutation<MutationCreateProductSuggestionArgs>(SUGGEST_PRODUCT, {
    notifyOnNetworkStatusChange: true,
    onError: () => {
      showGeneralErrorToast();
    },
    onCompleted: () => {
      dispatchUpdateApp({ productSuggestions: '' });
      setIsSuggestionSuccessModalVisible(true);
    },
  });

  const mutateSuggestions = () => {
    void suggestProduct({
      variables: { productName: appData.productSuggestions },
    });
  };

  return (
    <>
      <PlaceHolder
        name={KS_ICON.SEARCH_NORMAL_1}
        title={strings.search.noProductHeader}
        content={[strings.search.noProductText]}
      >
        <Button onPress={openModal} type={ButtonType.PRIMARY} marginBottom="s4">
          {strings.search.suggestProduct}
        </Button>
        <Button onPress={onNewSearch} type={ButtonType.OUTLINE}>
          {strings.search.newSearch}
        </Button>
      </PlaceHolder>

      <ModalPopUp
        isVisible={isModalVisible}
        header={isSuggestionSuccessModalVisible ? strings.search.thanksForSuggestion : strings.search.suggestProduct}
        onClose={closeModal}
      >
        {isSuggestionSuccessModalVisible ? (
          <Button type={ButtonType.PRIMARY} onPress={onNavigateToHome}>
            {strings.search.continueShopping}
          </Button>
        ) : (
          <>
            <TextInput
              placeholder={strings.search.productSuggestionPlaceholder}
              value={appData.productSuggestions}
              onChangeText={(text) => handleTextChange(text)}
              mode="outlined"
              multiline={true}
              numberOfLines={6}
              outlineColor="transparent"
            />
            <Button type={ButtonType.PRIMARY} onPress={mutateSuggestions} isLoading={isLoading} marginTop="s8">
              {strings.submit}
            </Button>
            <Button type={ButtonType.OUTLINE} onPress={closeModal} marginTop="s4">
              {strings.back}
            </Button>
          </>
        )}
      </ModalPopUp>
    </>
  );
};
