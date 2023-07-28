import { GoogleSignin, NativeModuleError, User } from '@react-native-google-signin/google-signin';
import { useRestyle } from '@shopify/restyle';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable } from 'react-native';

import GoogleLogo from '@assets/icons/googleIcon.svg';
import theme from '@assets/theme/theme';
import { Box } from '@components';
import { GOOGLE_OAUTH_IOS_CLIENT_ID, GOOGLE_OAUTH_WEB_CLIENT_ID } from '@env';
import { SocialButtonType, UserDetails, useSocialLoginMutation, useToastNotification } from '@hooks';
import {
  SocialButtonProps,
  socialButtonRestyleFunctions,
  SocialButtonRestyleProps,
  socialButtonStyles,
} from './socialButton.common';

export const GoogleButton: React.FC<SocialButtonProps> = (props) => {
  const { ...rest } = props;
  const { showGeneralErrorToast } = useToastNotification();

  const themeProps = useRestyle(socialButtonRestyleFunctions, rest as SocialButtonRestyleProps);

  const [userDetail, setUserDetail] = useState<UserDetails>({
    id: '',
    loginType: SocialButtonType.GOOGLE,
  });

  useEffect(() => {
    if (GOOGLE_OAUTH_IOS_CLIENT_ID || GOOGLE_OAUTH_WEB_CLIENT_ID) {
      GoogleSignin.configure({
        iosClientId: GOOGLE_OAUTH_IOS_CLIENT_ID,
        webClientId: GOOGLE_OAUTH_WEB_CLIENT_ID,
      });
    }
  }, []);

  const [socialLogin, { loading: isLoading }] = useSocialLoginMutation(userDetail);

  const loginWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const isSignedIn: boolean = await GoogleSignin.isSignedIn();

      if (!isSignedIn) {
        await GoogleSignin.signIn();
      } else {
        await GoogleSignin.signInSilently();
      }

      const user: User | null = await GoogleSignin.getCurrentUser();

      if (user?.idToken) {
        setUserDetail({
          loginType: SocialButtonType.GOOGLE,
          firstName: user.user.givenName ?? '',
          lastName: user.user.familyName ?? '',
          email: user.user.email,
          id: user.idToken,
        });

        await socialLogin({ variables: { input: { token: user.idToken } } });
      }
    } catch (error) {
      // The error code "-5" is defined as "The user canceled the sign-in flow." and this case no error toast should be displayed
      if ((error as NativeModuleError).code === '-5') {
        return;
      } else {
        showGeneralErrorToast();
      }
    }
  };

  const buttonStyle = ({ pressed }: { pressed: boolean }) => [
    {
      opacity: pressed ? 0.5 : 1,
      backgroundColor: theme.colors.white,
    },
    socialButtonStyles.container,
  ];

  return (
    <Box {...themeProps}>
      <Pressable onPress={loginWithGoogle} disabled={isLoading} style={buttonStyle}>
        {isLoading ? (
          <ActivityIndicator style={socialButtonStyles.loader} color="defaultTextColor" />
        ) : (
          <GoogleLogo width={20} height={20} />
        )}
      </Pressable>
    </Box>
  );
};
