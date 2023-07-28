import { useQuery } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';

import { Button, ButtonType } from '@components';
import { AsyncStorageKeys } from '@constants';
import { ActionType, useAuthData, useLocalizedData } from '@contexts';
import { GET_CHANNELS_QUERY } from '@graphqlDocuments';
import { useToastNotification } from '@hooks';
import { Channel, ChannelsQuery } from '@types';

interface LoginAsGuestProps {
  onButtonPress?: () => void;
  type?: ButtonType;
  isLoggedIn?: boolean;
}

export const LoginAsGuestButton: React.FC<LoginAsGuestProps> = (props) => {
  const { onButtonPress, type = ButtonType.PRIMARY, isLoggedIn = false } = props;
  const { strings } = useLocalizedData();
  const { showGeneralErrorToast } = useToastNotification();

  const { data, loading: isLoading } = useQuery<ChannelsQuery>(GET_CHANNELS_QUERY);

  // The current location is hard coded since we just have one channel for "Aschaffenburg", will be replaced as soon we use multi channels
  const place: string = 'Aschaffenburg';

  const { dispatchUpdateLogin } = useAuthData();

  const loginAsGuest: () => Promise<void> = async () => {
    if (onButtonPress) {
      onButtonPress();
    }
    const selectedChannel: Partial<Channel> | undefined = data?.channels.find((channel) => channel.code === place);

    if (selectedChannel?.token) {
      await AsyncStorage.setItem(AsyncStorageKeys.DEFAULT_CHANNEL_TOKEN, selectedChannel.token);

      // If isLoggedIn is true the user comes from the login screen and user should stay logged in
      // Otherwise the user browse as a guest and is logged out
      dispatchUpdateLogin(
        {
          isLoggedIn,
          isGuestUser: !isLoggedIn,
        },
        ActionType.BROWSE_IN_DEFAULT_CHANNEL
      );
    } else {
      showGeneralErrorToast();
    }
  };

  return (
    <Button onPress={loginAsGuest} type={type} isLoading={isLoading} disabled={isLoading}>
      {strings.auth.browseAsGuestButton}
    </Button>
  );
};
