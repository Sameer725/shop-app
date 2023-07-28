import { useNavigation } from '@react-navigation/native';
import React from 'react';

import { useLocalizedData } from '@contexts';
import { ProfileSettingsScreens } from '@routes/routes';
import { KsNavigation } from '@types';
import { ArrowIcon, Line } from './ProfileSettings.common';
import { ProfileSettingsTile } from './ProfileSettingsTile.common';
import { RowItem } from './RowItem.common';

export const SettingsTile: React.FC = () => {
  const { strings } = useLocalizedData();

  const navigation: KsNavigation = useNavigation();

  const navigateToAddressList = () => {
    navigation.navigate(ProfileSettingsScreens.ADDRESS_LIST);
  };
  const navigateToPersonalData = () => {
    navigation.navigate(ProfileSettingsScreens.PERSONAL_DATA);
  };
  const navigateToSavedPaymentMethods = () => {
    navigation.navigate(ProfileSettingsScreens.SAVED_PAYMENT_METHODS);
  };

  return (
    <ProfileSettingsTile title={strings.profileSettings.overview.settings}>
      <RowItem label={strings.profileSettings.overview.addresses} icon={ArrowIcon} onPress={navigateToAddressList} />
      {Line}
      <RowItem
        label={strings.profileSettings.overview.personalData}
        icon={ArrowIcon}
        onPress={navigateToPersonalData}
      />
      {Line}
      <RowItem
        label={strings.profileSettings.overview.paymentMethods}
        icon={ArrowIcon}
        onPress={navigateToSavedPaymentMethods}
      />
    </ProfileSettingsTile>
  );
};
