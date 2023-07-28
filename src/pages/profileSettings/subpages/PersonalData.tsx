import { useQuery } from '@apollo/client';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect } from 'react';

import { Box, Button, ButtonType, PersonalDataSkeleton } from '@components';
import { useLocalizedData } from '@contexts';
import { ACTIVE_CUSTOMER_QUERY } from '@graphqlDocuments';
import { useToastNotification } from '@hooks';
import { ProfileSettingsScreens } from '@routes/routes';
import { ActiveCustomerQuery, Customer, KsNavigation, KsRoute } from '@types';
import { UpdateCustomer } from './components/UpdateCustomer';

export enum BackFrom {
  UPDATE_EMAIL = 'updateEmail',
  UPDATE_PASSWORD = 'updatePassword',
}

export const PersonalDataScreen: React.FC = () => {
  const navigation: KsNavigation = useNavigation();
  const route = useRoute<KsRoute<{ backFrom: BackFrom }>>();
  const { showSuccessToast } = useToastNotification();
  const backFromScreen = route.params?.backFrom ?? null;

  const { strings } = useLocalizedData();
  const { data: customerData, refetch } = useQuery<ActiveCustomerQuery>(ACTIVE_CUSTOMER_QUERY, {
    fetchPolicy: 'no-cache',
  });

  useEffect(() => {
    if (backFromScreen) {
      void refetch();
      if (backFromScreen === BackFrom.UPDATE_EMAIL) {
        showSuccessToast(strings.profileSettings.personalData.emailUpdateSuccess);
      } else if (backFromScreen === BackFrom.UPDATE_PASSWORD) {
        showSuccessToast(strings.profileSettings.personalData.passwordUpdateSuccess);
      }
    }
  }, [backFromScreen]);

  const deleteAccount = () => {
    navigation.navigate(ProfileSettingsScreens.DELETE_ACCOUNT);
  };

  return (
    <>
      {customerData?.activeCustomer ? (
        <Box flex={1} paddingTop="s5" paddingHorizontal="s3" justifyContent="space-between">
          <UpdateCustomer customer={customerData.activeCustomer as Customer} />

          <Button onPress={deleteAccount} type={ButtonType.GHOST} textColor="error500" marginBottom="s8">
            {strings.profileSettings.personalData.deleteAccount}
          </Button>
        </Box>
      ) : (
        <PersonalDataSkeleton />
      )}
    </>
  );
};
